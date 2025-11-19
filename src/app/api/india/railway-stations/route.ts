import { NextRequest, NextResponse } from "next/server";
import { INDIAN_RAILWAY_STATIONS } from "@/json/india/railway-statons";
import {CORS} from "@/lib/cors"

export async function OPTIONS() {
  return CORS(NextResponse.json({}, { status: 200 }));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stationQuery = searchParams.get("station")?.toLowerCase() || "";
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const filtered = stationQuery
      ? INDIAN_RAILWAY_STATIONS.filter(
          (s) =>
            s.stnName.toLowerCase().includes(stationQuery) ||
            s.stnCity.toLowerCase().includes(stationQuery) ||
            s.stnCode.toLowerCase().includes(stationQuery)
        )
      : INDIAN_RAILWAY_STATIONS.slice(0, 10);

    const paginated = filtered.slice(offset, offset + limit);

    const hasMore = offset + limit < filtered.length;

    return CORS(
      NextResponse.json({
        success: true,
        total: filtered.length,
        limit,
        offset,
        hasMore,
        data: paginated,
      })
    );
  } catch (error) {
    console.log(error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}
