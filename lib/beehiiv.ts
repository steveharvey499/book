/**
 * Beehiiv API Integration
 * 
 * This module provides functions to interact with the Beehiiv API v2
 * for newsletter subscription management.
 */

export interface SubscribeResult {
  success: boolean;
  message?: string;
  data?: any;
}

export interface SubscriptionCustomFields {
  name?: string;
  role?: string;
  company_focus?: string;
  biggest_challenge?: string;
  team_size?: string;
  referral_source?: string;
}

/**
 * Subscribe an email to the Beehiiv newsletter publication
 * 
 * @param email - The email address to subscribe
 * @param reactivateExisting - Whether to reactivate if already unsubscribed (default: true)
 * @param customFields - Optional custom fields to store with the subscription
 * @returns Promise with subscription result
 */
export async function subscribeToNewsletter(
  email: string,
  reactivateExisting: boolean = true,
  customFields?: SubscriptionCustomFields
): Promise<SubscribeResult> {
  try {
    // Get and trim environment variables to remove any accidental whitespace
    const apiKey = process.env.BEEHIV_API_KEY?.trim();
    const publicationId = process.env.BEEHIV_PUBLICATION_ID?.trim();

    if (!apiKey) {
      throw new Error("BEEHIV_API_KEY is not configured");
    }

    if (!publicationId) {
      throw new Error("BEEHIV_PUBLICATION_ID is not configured");
    }

    // Log partial key for debugging (first 10 chars + last 4 chars for security)
    const maskedKey = apiKey.length > 14 
      ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`
      : "***";
    
    // Check if API key looks valid (Beehiiv keys usually start with "sk_" or are long strings)
    const looksLikeApiKey = apiKey.startsWith('sk_') || apiKey.length > 30;
    if (!looksLikeApiKey) {
      console.warn("⚠️ API key format warning: Beehiiv API keys typically start with 'sk_live_' or 'sk_test_' and are 40+ characters long.");
      console.warn("⚠️ The current value looks like it might be a Publication ID instead. Please verify in your Beehiiv dashboard.");
    }
    
    console.log("Beehiiv configuration check:", {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey.length,
      apiKeyPreview: maskedKey,
      apiKeyStartsWith: apiKey.substring(0, 7),
      looksLikeApiKey: looksLikeApiKey,
      hasPublicationId: !!publicationId,
      publicationIdLength: publicationId.length,
    });

    // Ensure Publication ID is in V2 format (starts with 'pub_')
    const formattedPublicationId = publicationId.startsWith('pub_') 
      ? publicationId 
      : `pub_${publicationId}`;

    // Beehiiv API v2 endpoint for subscribing to a publication
    const apiUrl = `https://api.beehiiv.com/v2/publications/${formattedPublicationId}/subscriptions`;

    console.log("Beehiiv API call:", {
      url: apiUrl,
      email: email,
      originalPublicationId: publicationId,
      formattedPublicationId: formattedPublicationId,
      hasApiKey: !!apiKey,
    });

    // Build request body with custom fields if provided
    const requestBody: any = {
      email: email,
      reactivate_existing: reactivateExisting,
    };

    // Add custom fields if provided - Beehiiv expects an array format
    if (customFields && Object.keys(customFields).length > 0) {
      // Convert custom fields object to array format: [{name: "field", value: "value"}, ...]
      requestBody.custom_fields = Object.entries(customFields)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([name, value]) => ({
          name: name,
          value: String(value)
        }));
      
      console.log("Custom fields converted to array format:", requestBody.custom_fields);
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json().catch(async (err) => {
      const text = await response.text().catch(() => "Could not read response");
      console.error("Failed to parse JSON response:", text);
      return { rawResponse: text };
    });

    console.log("Beehiiv API response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data: responseData,
    });

    if (!response.ok) {
      // Handle API errors
      const errorMessage =
        responseData?.errors?.[0]?.message ||
        responseData?.message ||
        responseData?.error ||
        `Beehiiv API error: ${response.status} ${response.statusText}`;

      console.error("Beehiiv API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        fullResponse: responseData,
        url: apiUrl,
        apiKeyPreview: apiKey.length > 14 
          ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`
          : "***",
        publicationId: formattedPublicationId,
      });

      // Provide more helpful error messages for common issues
      if (errorMessage.toLowerCase().includes("api key") || 
          errorMessage.toLowerCase().includes("not valid") ||
          errorMessage.toLowerCase().includes("unauthorized") ||
          response.status === 401) {
        throw new Error(
          `API key authentication failed. Please verify:\n` +
          `1. Your BEEHIV_API_KEY in .env.local is correct\n` +
          `2. The API key has no leading/trailing spaces\n` +
          `3. The API key has permission to create subscriptions\n` +
          `4. You've restarted your development server after adding the key\n` +
          `Original error: ${errorMessage}`
        );
      }

      throw new Error(errorMessage);
    }

    // Success response
    console.log("Beehiiv subscription successful:", responseData);
    return {
      success: true,
      message: "Successfully subscribed to newsletter",
      data: responseData,
    };
  } catch (error) {
    console.error("Error subscribing to Beehiiv newsletter:", error);

    // Re-throw with more context if it's already an Error
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      `Failed to subscribe to newsletter: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
