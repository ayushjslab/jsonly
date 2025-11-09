import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES_DIAL } from "@/json/countries/country-dial";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("country")?.toLowerCase() || "";
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const countries = COUNTRIES_DIAL || [];

    const filtered = query
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.code.toLowerCase().includes(query) ||
            c.dial_code.includes(query)
        )
      : countries;

    const paginated = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < filtered.length;

    return NextResponse.json({
      success: true,
      total: filtered.length,
      limit,
      offset,
      hasMore,
      data: paginated,
    });
  } catch (error) {
    console.error("Error in /dialcodes API:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
