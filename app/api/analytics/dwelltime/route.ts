import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, pageNumber, dwellTime, timestamp } = body;

    // Validate required fields
    if (!pageId || !pageNumber || !dwellTime || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you can store the data in Supabase, a database, or log it
    // For now, we'll just log it (you can extend this to store in Supabase)
    console.log("Dwell Time:", {
      pageId,
      pageNumber,
      dwellTime,
      timestamp,
    });

    // TODO: Store in Supabase or your preferred database
    // Example:
    // const { data, error } = await supabase
    //   .from('dwell_times')
    //   .insert([{ page_id: pageId, page_number: pageNumber, dwell_time: dwellTime, timestamp }]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking dwell time:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
