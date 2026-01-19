import { NextRequest, NextResponse } from "next/server";
import { COUNTRY_FLAGS } from "@/json/countries/country-flags";
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
    console.error("Error in /flags API:", error);
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
    const { country, flag, code } = body;

    if (!country || !flag || !code) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing required fields: country, flag, code" },
          { status: 400 }
        )
      );
    }

    // Check if it already exists
    const exists = COUNTRY_FLAGS.some((c) => c.code === code);
    if (exists) {
      return CORS(
        NextResponse.json(
          { success: false, message: `Country flag with code ${code} already exists` },
          { status: 400 }
        )
      );
    }

    const newFlag = { country, flag, code };
    COUNTRY_FLAGS.push(newFlag);

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country flag added successfully",
        data: newFlag,
      })
    );
  } catch (error) {
    console.error("Error in POST /api/countries/flag:", error);
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
    const { country, flag, code } = body;
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

    const index = COUNTRY_FLAGS.findIndex((c) => c.code === countryCode);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country flag not found" },
          { status: 404 }
        )
      );
    }

    if (!country || !flag || !code) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Missing required fields for PUT: country, flag, code" },
          { status: 400 }
        )
      );
    }

    COUNTRY_FLAGS[index] = { country, flag, code };

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country flag updated successfully",
        data: COUNTRY_FLAGS[index],
      })
    );
  } catch (error) {
    console.error("Error in PUT /api/countries/flag:", error);
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

    const index = COUNTRY_FLAGS.findIndex((c) => c.code === countryCode);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country flag not found" },
          { status: 404 }
        )
      );
    }

    COUNTRY_FLAGS[index] = { ...COUNTRY_FLAGS[index], ...body };

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country flag updated successfully",
        data: COUNTRY_FLAGS[index],
      })
    );
  } catch (error) {
    console.error("Error in PATCH /api/countries/flag:", error);
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

    const index = COUNTRY_FLAGS.findIndex((c) => c.code === code);
    if (index === -1) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Country flag not found" },
          { status: 404 }
        )
      );
    }

    const deleted = COUNTRY_FLAGS.splice(index, 1);

    return CORS(
      NextResponse.json({
        success: true,
        message: "Country flag deleted successfully",
        data: deleted[0],
      })
    );
  } catch (error) {
    console.error("Error in DELETE /api/countries/flag:", error);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}
