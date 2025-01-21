import { NextResponse } from "next/server";
import { createTeams } from "~/server/queries";
import { z } from "zod";

// Define schema for validation
const teamSchema = z.object({
  names: z.string().min(1, "Team name cannot be empty"),
});

export async function POST(req: Request) {
  try {
    const body = teamSchema.parse(await req.json());
    const { names } = body;

    if (!names) {
      return NextResponse.json(
        { error: "No team names provided" },
        { status: 400 },
      );
    }

    const teamNames = names
      .split("\n")
      .map((name: string) => name.trim())
      .filter(Boolean);

    for (const name of teamNames) {
      await createTeams(name);
    }

    return NextResponse.json({
      success: true,
      message: "Teams added successfully!",
    });
  } catch (error) {
    console.error("Error adding teams:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
