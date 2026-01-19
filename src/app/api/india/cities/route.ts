import { INDIAN_CITIES } from "@/json/cities/india";
import { NextRequest, NextResponse } from "next/server";
import { CORS } from "@/lib/cors"

type IndianCitiesType = typeof INDIAN_CITIES;
type StateName = keyof IndianCitiesType;
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

// Note: These mutations are in-memory and will not persist after server restart.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, city, cities } = body;

    if (!state) {
      return CORS(NextResponse.json({ error: "State name is required" }, { status: 400 }));
    }

    const formattedState = toTitleCase(state);
    const typedCities = INDIAN_CITIES as any;

    if (city) {
      // Add a single city to a state
      if (!typedCities[formattedState]) {
        typedCities[formattedState] = [toTitleCase(city)];
      } else {
        if (!typedCities[formattedState].includes(toTitleCase(city))) {
          typedCities[formattedState].push(toTitleCase(city));
        }
      }
      return CORS(NextResponse.json({ success: true, message: `City ${city} added to ${formattedState}` }));
    }

    if (cities && Array.isArray(cities)) {
      // Add/Create a state with multiple cities
      const formattedCities = cities.map((c: string) => toTitleCase(c));
      if (!typedCities[formattedState]) {
        typedCities[formattedState] = formattedCities;
      } else {
        typedCities[formattedState] = [...new Set([...typedCities[formattedState], ...formattedCities])];
      }
      return CORS(NextResponse.json({ success: true, message: `State ${formattedState} updated with cities` }));
    }

    return CORS(NextResponse.json({ error: "Missing city or cities in body" }, { status: 400 }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, cities } = body;

    if (!state || !cities || !Array.isArray(cities)) {
      return CORS(NextResponse.json({ error: "State and cities array are required" }, { status: 400 }));
    }

    const formattedState = toTitleCase(state);
    const typedCities = INDIAN_CITIES as any;

    typedCities[formattedState] = cities.map((c: string) => toTitleCase(c));

    return CORS(NextResponse.json({ success: true, message: `State ${formattedState} replaced with new cities list` }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, oldState, newState, oldCity, newCity } = body;
    const typedCities = INDIAN_CITIES as any;

    if (oldState && newState) {
      const fOld = toTitleCase(oldState);
      const fNew = toTitleCase(newState);
      if (!typedCities[fOld]) return CORS(NextResponse.json({ error: "Old state not found" }, { status: 404 }));
      typedCities[fNew] = typedCities[fOld];
      delete typedCities[fOld];
      return CORS(NextResponse.json({ success: true, message: `State ${fOld} renamed to ${fNew}` }));
    }

    if (state && oldCity && newCity) {
      const fState = toTitleCase(state);
      if (!typedCities[fState]) return CORS(NextResponse.json({ error: "State not found" }, { status: 404 }));

      const index = typedCities[fState].indexOf(toTitleCase(oldCity));
      if (index === -1) return CORS(NextResponse.json({ error: "City not found" }, { status: 404 }));

      typedCities[fState][index] = toTitleCase(newCity);
      return CORS(NextResponse.json({ success: true, message: `City ${oldCity} renamed to ${newCity} in ${fState}` }));
    }

    return CORS(NextResponse.json({ error: "Invalid patch parameters" }, { status: 400 }));
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const typedCities = INDIAN_CITIES as any;

    if (!state) return CORS(NextResponse.json({ error: "State is required" }, { status: 400 }));

    const fState = toTitleCase(state);
    if (!typedCities[fState]) return CORS(NextResponse.json({ error: "State not found" }, { status: 404 }));

    if (city) {
      const fCity = toTitleCase(city);
      const index = typedCities[fState].indexOf(fCity);
      if (index === -1) return CORS(NextResponse.json({ error: "City not found" }, { status: 404 }));
      typedCities[fState].splice(index, 1);
      return CORS(NextResponse.json({ success: true, message: `City ${fCity} removed from ${fState}` }));
    } else {
      delete typedCities[fState];
      return CORS(NextResponse.json({ success: true, message: `State ${fState} deleted` }));
    }
  } catch (error) {
    console.error(error);
    return CORS(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
