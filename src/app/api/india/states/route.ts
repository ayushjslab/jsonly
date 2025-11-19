import { INDIAN_CITIES } from "@/json/cities/india";
import { NextRequest, NextResponse } from "next/server";
import {CORS} from "@/lib/cors"

export async function OPTIONS() {
  return CORS(NextResponse.json({}, { status: 200 }));
}
const ALL_STATES = Object.keys(INDIAN_CITIES);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stateQuery = searchParams.get("state")?.toLowerCase() || "";
    const limit = Number(searchParams.get("limit")) || ALL_STATES.length;
    const offset = Number(searchParams.get("offset")) || 0;

    const filteredStates = ALL_STATES.filter((s) =>
      s.toLowerCase().includes(stateQuery)
    );

    const total = filteredStates.length;
    if (total === 0) {
      return CORS(
        NextResponse.json(
          { success: false, error: "No states found", query: stateQuery },
          { status: 404 }
        )
      );
    }
    const start = Math.max(offset, 0);
    const end = Math.min(start + limit, total);
    const paginated = filteredStates.slice(start, end);

    return CORS(
      NextResponse.json(
        {
          success: true,
          query: stateQuery,
          total,
          limit,
          offset,
          count: paginated.length,
          hasMore: end < total,
          states: paginated,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.error(error);
    return CORS(
      NextResponse.json(
        {
          message: "Internal Server Error",
          success: false,
        },
        { status: 500 }
      )
    );
  }
}
