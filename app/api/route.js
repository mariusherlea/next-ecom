import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json(
    {
      time: new Date().toLocaleString(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
