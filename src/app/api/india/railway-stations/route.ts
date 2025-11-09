import { NextRequest, NextResponse } from "next/server"
import {INDIAN_RAILWAY_STATIONS} from "@/json/india/railway-statons"
export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const stationQuery = searchParams.get("station")?.toLowerCase() || "";
        const limit = Number(searchParams.get("limit")) || 10
        const offset = Number(searchParams.get("offset")) || 0;

        const filtered = stationQuery ? INDIAN_RAILWAY_STATIONS.filter((s) => s.stnName.toLowerCase().includes(stationQuery) ||  s.stnCity.toLowerCase().includes(stationQuery)) : [];

            const paginated = filtered.slice(offset, offset + limit);

             return NextResponse.json({
               success: true,
               total: filtered.length,
               limit,
               offset,
               data: paginated,
             });


    } catch (error) {
        console.log(error)
         return NextResponse.json(
           { success: false, message: "Internal Server Error" },
           { status: 500 }
         );
    }
}