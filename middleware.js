import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("hexschoolTodo")?.value;
  const { pathname } = request.nextUrl;

  // 如果已經登入（有 Token），則不允許進入 /login 或 /register，並導向 /todos
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/todos", request.url));
  }

  // 如果未登入（無 Token），且試圖進入 /todos，則重導向至 /login
  if (!token && pathname === "/todos") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 設定 Middleware 匹配的路徑
export const config = {
  matcher: ["/todos", "/login", "/register"],
};
