
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json({ error: "Request body is null" }, { status: 400 });
    }

    const response = await axios.post("https://api.imagga.com/v2/uploads", 
        {
            {
                username: 
            }
        }