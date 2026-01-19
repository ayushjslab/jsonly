import { INDIAN_CITIES } from "@/json/cities/india";
import { NextRequest, NextResponse } from "next/server";
import { CORS } from "@/lib/cors"

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

// Note: These mutations are in-memory and will not persist after server restart.
// Since this API shares data with india/cities, updates here affect both.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, cities } = body;

    if (!state || !cities || !Array.isArray(cities)) {
      return CORS(NextResponse.json({ success: false, message: "State name and cities array are required" }, { status: 400 }));
    }

    const formattedState = state; // Keep original or title case? Let's use as is for now or use toTitleCase if imported
    const typedCities = INDIAN_CITIES as any;

    if (typedCities[formattedState]) {
      return CORS(NextResponse.json({ success: false, message: `State ${formattedState} already exists` }, { status: 400 }));
    }

    typedCities[formattedState] = cities;

    return CORS(NextResponse.json({ success: true, message: `State ${formattedState} added successfully` }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, cities } = body;
    const { searchParams } = new URL(req.url);
    const stateName = searchParams.get("state") || state;

    if (!stateName || !cities || !Array.isArray(cities)) {
      return CORS(NextResponse.json({ success: false, message: "State name and cities array are required" }, { status: 400 }));
    }

    const typedCities = INDIAN_CITIES as any;
    if (!typedCities[stateName]) {
      return CORS(NextResponse.json({ success: false, message: "State not found" }, { status: 404 }));
    }

    typedCities[stateName] = cities;

    return CORS(NextResponse.json({ success: true, message: `State ${stateName} updated successfully` }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { oldState, newState } = body;

    if (!oldState || !newState) {
      return CORS(NextResponse.json({ success: false, message: "oldState and newState are required" }, { status: 400 }));
    }

    const typedCities = INDIAN_CITIES as any;
    if (!typedCities[oldState]) {
      return CORS(NextResponse.json({ success: false, message: "State not found" }, { status: 404 }));
    }

    typedCities[newState] = typedCities[oldState];
    delete typedCities[oldState];

    return CORS(NextResponse.json({ success: true, message: `State ${oldState} renamed to ${newState}` }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");

    if (!state) {
      return CORS(NextResponse.json({ success: false, message: "State name is required" }, { status: 400 }));
    }

    const typedCities = INDIAN_CITIES as any;
    if (!typedCities[state]) {
      return CORS(NextResponse.json({ success: false, message: "State not found" }, { status: 404 }));
    }

    delete typedCities[state];

    return CORS(NextResponse.json({ success: true, message: `State ${state} deleted successfully` }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }));
  }
}
