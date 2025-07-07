import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Contact from "@/models/Contact";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();

  try {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing contact ID for deletion" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findOneAndDelete({ _id: id });

    if (!deleted) {
      return NextResponse.json(
        { error: "Contact not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /contact error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
