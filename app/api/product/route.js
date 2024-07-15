import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import product from "@/models/product";
import queryString from "query-string";

export async function GET(request) {
  await dbConnect();
  const searchParams = queryString.parseUrl(request.url).query;
  const { page } = searchParams || {};
  const pageSize = 6;
  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalProducts = await product.countDocuments({});
    const products = await product.find({}).skip(skip).limit(pageSize).sort({
      createdAt: -1,
    });
    return NextResponse.json({
      products,
      currentPage,
      totalPage: Math.ceil(totalProducts / pageSize),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
