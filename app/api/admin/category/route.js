import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name } = body;
  try {
    const category = await Category.create({ name, slug: slugify(name) });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
