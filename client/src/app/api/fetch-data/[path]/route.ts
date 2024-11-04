import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { path: string } }
) {
  const { path } = params;

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseURL) {
      return NextResponse.json(
        { error: "API base URL is not configured" },
        { status: 500 }
      );
    }

    const response = await axios.get(`${baseURL}/${path}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
