import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import product from "@/models/product";

export async function PUT(request, context) {
  await dbConnect();

  const body = await request.json();

  try {
    const updatedProduct = await product.findByIdAndUpdate(
      context.params.id,
      {
        ...body,
      },
      { new: true }
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  await dbConnect();
  try {
    const deletedProduct = await product.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
