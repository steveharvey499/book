import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/beehiiv";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      firstName,
      lastName,
      role, 
      companyFocus, 
      biggestChallenge, 
      teamSize,
      referralSource
    } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log subscription data with questions for analytics
    console.log("Subscription data received:", {
      email,
      firstName,
      lastName,
      role,
      companyFocus,
      biggestChallenge,
      teamSize,
      referralSource,
    });

    // Subscribe to Beehiiv newsletter
    try {
      console.log("Attempting to subscribe email to Beehiiv:", email);
      
      // Prepare custom fields for Beehiiv
      const customFields: any = {};
      if (firstName || lastName) {
        customFields.name = `${firstName || ''} ${lastName || ''}`.trim();
      }
      if (role) customFields.role = role;
      if (companyFocus) customFields.company_focus = companyFocus;
      if (biggestChallenge) customFields.biggest_challenge = biggestChallenge;
      if (teamSize) customFields.team_size = teamSize;
      if (referralSource) customFields.referral_source = referralSource;

      const result = await subscribeToNewsletter(email, true, customFields);
      console.log("Subscription result:", result);
    } catch (subscriptionError) {
      console.error("Error subscribing to Beehiiv newsletter:", subscriptionError);
      
      // Provide user-friendly error message
      const errorMessage = subscriptionError instanceof Error 
        ? subscriptionError.message 
        : "Failed to subscribe to newsletter";
      
      // Check if it's a duplicate subscription error (non-fatal)
      if (errorMessage.toLowerCase().includes("already subscribed") || 
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("duplicate")) {
        console.info("Email already subscribed or duplicate, continuing");
      } else {
        // Log full error for debugging
        console.error("Subscription failed with error:", {
          message: errorMessage,
          error: subscriptionError,
        });
        // For other errors, return error response
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    }

    // Log successful subscription with all data for your records
    console.log("Subscription completed successfully:", {
      email,
      firstName,
      lastName,
      role,
      companyFocus,
      biggestChallenge,
      teamSize,
      referralSource,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    
    // Provide more detailed error information for debugging
    let errorMessage = "Failed to process subscription";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
