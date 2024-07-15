import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import product from "@/models/product";

export async function GET(request, context) {
  await dbConnect();
  try {
    const product = await product.findOne({ slug: context.params.slug });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
