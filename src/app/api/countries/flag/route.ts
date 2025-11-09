import { NextRequest, NextResponse } from "next/server";
import { COUNTRY_FLAGS } from "@/json/countries/country-flags";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("country")?.toLowerCase() || "";
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const countries = COUNTRY_FLAGS || [];

    const filtered = query
      ? countries.filter(
          (c) =>
            c.country.toLowerCase().includes(query) ||
            c.code?.toLowerCase().includes(query)
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
    console.error("Error in /flags API:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
