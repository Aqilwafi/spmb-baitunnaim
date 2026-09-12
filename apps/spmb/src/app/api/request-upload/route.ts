// app/api/request-upload/route.ts
import { NextResponse } from "next/server";
import { isValidationError } from "@bn/utils";
import { requestUpload } from "@/features/upload/request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await requestUpload(body);

    // ✅ Mengembalikan JSON SignedUrlResponse (HTTP 200)
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // ✅ Mengembalikan NextResponse.json untuk Validation Error (HTTP 400)
    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // ✅ Response Error Server (HTTP 500)
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}