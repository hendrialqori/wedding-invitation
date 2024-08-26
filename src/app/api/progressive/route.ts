import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('src')


    const buffer = await fs.readFile(`./public/${query}`);
    const { base64 } = await getPlaiceholder(buffer);


    return NextResponse.json({ source: base64 })
}