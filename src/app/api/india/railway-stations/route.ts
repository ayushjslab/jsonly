import { NextRequest, NextResponse } from "next/server";
import { INDIAN_RAILWAY_STATIONS } from "@/json/india/railway-statons";
import { CORS } from "@/lib/cors"

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

// Note: These mutations are in-memory and will not persist after server restart.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stnCode, stnName, stnCity } = body;

    if (!stnCode || !stnName || !stnCity) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing required fields: stnCode, stnName, stnCity" },
          { status: 400 }
        )
      );
    }

    const exists = INDIAN_RAILWAY_STATIONS.some((s) => s.stnCode === stnCode);
    if (exists) {
      return CORS(
        NextResponse.json(
          { success: false, message: `Station with code ${stnCode} already exists` },
          { status: 400 }
        )
      );
    }

    const newStation = { stnCode, stnName, stnCity };
    INDIAN_RAILWAY_STATIONS.push(newStation);

    return CORS(
      NextResponse.json({
        success: true,
        message: "Railway station added successfully",
        data: newStation,
      })
    );
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { stnCode, stnName, stnCity } = body;
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || stnCode;

    if (!code) {
      return CORS(NextResponse.json({ success: false, message: "Station code is required" }, { status: 400 }));
    }

    const index = INDIAN_RAILWAY_STATIONS.findIndex((s) => s.stnCode === code);
    if (index === -1) {
      return CORS(NextResponse.json({ success: false, message: "Station not found" }, { status: 404 }));
    }

    if (!stnCode || !stnName || !stnCity) {
      return CORS(NextResponse.json({ success: false, message: "Missing required fields for PUT" }, { status: 400 }));
    }

    INDIAN_RAILWAY_STATIONS[index] = { stnCode, stnName, stnCity };

    return CORS(NextResponse.json({ success: true, message: "Station updated successfully", data: INDIAN_RAILWAY_STATIONS[index] }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || body.stnCode;

    if (!code) {
      return CORS(NextResponse.json({ success: false, message: "Station code is required" }, { status: 400 }));
    }

    const index = INDIAN_RAILWAY_STATIONS.findIndex((s) => s.stnCode === code);
    if (index === -1) {
      return CORS(NextResponse.json({ success: false, message: "Station not found" }, { status: 404 }));
    }

    INDIAN_RAILWAY_STATIONS[index] = { ...INDIAN_RAILWAY_STATIONS[index], ...body };

    return CORS(NextResponse.json({ success: true, message: "Station partially updated", data: INDIAN_RAILWAY_STATIONS[index] }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return CORS(NextResponse.json({ success: false, message: "Station code is required" }, { status: 400 }));
    }

    const index = INDIAN_RAILWAY_STATIONS.findIndex((s) => s.stnCode === code);
    if (index === -1) {
      return CORS(NextResponse.json({ success: false, message: "Station not found" }, { status: 404 }));
    }

    const deleted = INDIAN_RAILWAY_STATIONS.splice(index, 1);

    return CORS(NextResponse.json({ success: true, message: "Station deleted successfully", data: deleted[0] }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}
