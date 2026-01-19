import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES_DIAL } from "@/json/countries/country-dial";
import { CORS } from "@/lib/cors"

export async function OPTIONS() {
  return CORS(NextResponse.json({}, { status: 200 }));
}

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
    console.error("Error in /dialcodes API:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}

// Note: These mutations are in-memory and will not persist after server restart
// unless the underlying JSON/TS file is updated.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dial_code, code } = body;

    if (!name || !dial_code || !code) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing required fields: name, dial_code, code" },
          { status: 400 }
        )
      );
    }

    // Check if it already exists
    const exists = COUNTRIES_DIAL.some((c) => c.code === code);
    if (exists) {
      return CORS(
        NextResponse.json(
          { success: false, message: `Country with code ${code} already exists` },
          { status: 400 }
        )
      );
    }

    const newCountry = { name, dial_code, code };
    COUNTRIES_DIAL.push(newCountry);

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country added successfully",
        data: newCountry,
      })
    );
  } catch (error) {
    console.error("Error in POST /api/countries/dial:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dial_code, code } = body;
    const { searchParams } = new URL(req.url);
    const countryCode = searchParams.get("code") || code;

    if (!countryCode) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing country code in params or body" },
          { status: 400 }
        )
      );
    }

    const index = COUNTRIES_DIAL.findIndex((c) => c.code === countryCode);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country not found" },
          { status: 404 }
        )
      );
    }

    if (!name || !dial_code || !code) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing required fields for PUT: name, dial_code, code" },
          { status: 400 }
        )
      );
    }

    COUNTRIES_DIAL[index] = { name, dial_code, code };

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country updated successfully",
        data: COUNTRIES_DIAL[index],
      })
    );
  } catch (error) {
    console.error("Error in PUT /api/countries/dial:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const countryCode = searchParams.get("code") || body.code;

    if (!countryCode) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing country code" },
          { status: 400 }
        )
      );
    }

    const index = COUNTRIES_DIAL.findIndex((c) => c.code === countryCode);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country not found" },
          { status: 404 }
        )
      );
    }

    COUNTRIES_DIAL[index] = { ...COUNTRIES_DIAL[index], ...body };

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country updated successfully",
        data: COUNTRIES_DIAL[index],
      })
    );
  } catch (error) {
    console.error("Error in PATCH /api/countries/dial:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing country code in search params" },
          { status: 400 }
        )
      );
    }

    const index = COUNTRIES_DIAL.findIndex((c) => c.code === code);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country not found" },
          { status: 404 }
        )
      );
    }

    const deleted = COUNTRIES_DIAL.splice(index, 1);

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country deleted successfully",
        data: deleted[0],
      })
    );
  } catch (error) {
    console.error("Error in DELETE /api/countries/dial:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}
