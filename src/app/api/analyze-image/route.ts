import { NextRequest, NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import { Client } from '@googlemaps/google-maps-services-js';

// Move client initialization inside the POST handler
export async function POST(req: NextRequest) {
  try {
    // Initialize the Vision client with credentials from env
    const visionClient = new vision.ImageAnnotatorClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID,
      }
    });
    console.log('Vision client initialized successfully');

    // Initialize Google Maps client
    const mapsClient = new Client({});

    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_PROJECT_ID) {
      throw new Error('Missing required Google Cloud credentials');
    }

    const formData = await req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Add file type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Please upload a JPEG, PNG, or WebP image.' },
        { status: 400 }
      );
    }

    // Add file size validation (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Perform detection
    const [result] = await visionClient.annotateImage({
      image: {
        content: buffer
      },
      features: [
        { type: 'LANDMARK_DETECTION' },
        { type: 'LABEL_DETECTION' },
        { type: 'TEXT_DETECTION' }
      ]
    });

    // Extract location information
    let locationInfo = null;
    if (result.landmarkAnnotations?.[0]) {
      const landmark = result.landmarkAnnotations[0];
      const latLng = landmark.locations?.[0]?.latLng;
      
      if (latLng) {
        // Check if API key exists
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('Google Maps API key is not configured');
        }

        // Get additional location details from Google Maps
        const placeResponse = await mapsClient.reverseGeocode({
          params: {
            latlng: { lat: latLng.latitude || 0, lng: latLng.longitude || 0 },
            key: apiKey
          }
        });

        const placeDetails = placeResponse.data.results[0];
        
        locationInfo = {
          name: landmark.description || 'Unknown Location',
          location: {
            latitude: latLng.latitude || 0,
            longitude: latLng.longitude || 0,
            address: placeDetails?.formatted_address,
            placeId: placeDetails?.place_id,
          },
          confidence: landmark.score || 0
        };
      }
    }

    // Handle case where no landmarks were detected
    if (!locationInfo) {
      return NextResponse.json({
        success: true,
        locationInfo: null,
        labels: result.labelAnnotations,
        text: result.textAnnotations,
        message: 'No landmarks detected in the image'
      });
    }

    return NextResponse.json({
      success: true,
      locationInfo,
      labels: result.labelAnnotations,
      text: result.textAnnotations
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Add rate limiting configuration (optional)
export const config = {
  api: {
    bodyParser: false, // Disables body parser as we're using formData
  },
};