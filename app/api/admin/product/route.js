import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  try {
    const product = await Product.create({
      ...body,
      slug: slugify(body.title),
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
