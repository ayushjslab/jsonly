import { INDIAN_CITIES } from "@/json/cities/india";
import { NextRequest, NextResponse } from "next/server";
import {CORS} from "@/lib/cors"

type StateName = keyof typeof INDIAN_CITIES;
export async function OPTIONS() {
  return CORS(NextResponse.json({}, { status: 200 }));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const state = searchParams.get("state");
    const limitParam = Number(searchParams.get("limit"));
    const offsetParam = Number(searchParams.get("offset")) || 0;

    if (!state) {
      return NextResponse.json(
        { error: "State query parameter is required" },
        { status: 400 }
      );
    }

    const formattedState = toTitleCase(state) as StateName;

    if (!INDIAN_CITIES[formattedState]) {
      return CORS(
        NextResponse.json({ error: "Invalid state name" }, { status: 404 })
      );
    }

    const cities = INDIAN_CITIES[formattedState];
    const total = cities.length;

    const limit =
      limitParam && !isNaN(Number(limitParam))
        ? Math.min(Number(limitParam), total)
        : total;

    const start = Math.max(offsetParam, 0);
    const end = Math.min(start + limit, total);

    const paginatedCities = cities.slice(start, end);

     return CORS(
       NextResponse.json(
         {
           success: true,
           state: formattedState,
           total,
           limit,
           offset: start,
           count: paginatedCities.length,
           cities: paginatedCities,
           hasMore: end < total,
         },
         { status: 200 }
       )
     );
  } catch (error) {
    console.log(error);
    return CORS(
      NextResponse.json(
        { error: "Internal Server Error", success: false },
        { status: 500 }
      )
    );
  }
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
