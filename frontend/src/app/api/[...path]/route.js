// app/api/[...path]/route.js
import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8000";

async function proxyRequest(request, method) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace("/api", "/api");
    const apiUrl = `${API_BASE_URL}${path}${url.search}`;

    const headers = new Headers();

    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const options = { method, headers };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      const body = await request.text();
      if (body) options.body = body;
    }

    const response = await fetch(apiUrl, options);

    const setCookieHeader = response.headers.get("set-cookie");
    const responseHeaders = new Headers(response.headers);

    if (setCookieHeader) {
      responseHeaders.set("Set-Cookie", setCookieHeader);
    }

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Proxy request failed" },
      { status: 500 }
    );
  }
}

// 🔥 Бүх HTTP method export хийх
export async function GET(request) {
  return proxyRequest(request, "GET");
}

export async function POST(request) {
  return proxyRequest(request, "POST");
}

export async function PUT(request) {
  return proxyRequest(request, "PUT");
}

export async function PATCH(request) {
  return proxyRequest(request, "PATCH");
}

export async function DELETE(request) {
  return proxyRequest(request, "DELETE");
}
