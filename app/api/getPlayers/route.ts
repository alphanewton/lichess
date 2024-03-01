import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`https://lichess.org/api/player`);
    if (!response.ok) {
      throw new Error("Failed to fetch player data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching player data: " + error);
    return null;
  }
}
