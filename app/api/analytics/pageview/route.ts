import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, pageNumber, pageTitle, timestamp } = body;

    // Validate required fields
    if (!pageId || !pageNumber || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you can store the data in Supabase, a database, or log it
    // For now, we'll just log it (you can extend this to store in Supabase)
    console.log("Page View:", {
      pageId,
      pageNumber,
      pageTitle,
      timestamp,
    });

    // TODO: Store in Supabase or your preferred database
    // Example:
    // const { data, error } = await supabase
    //   .from('page_views')
    //   .insert([{ page_id: pageId, page_number: pageNumber, page_title: pageTitle, timestamp }]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
