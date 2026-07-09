export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/image-generator/:path*",
    "/resume-builder/:path*",
    "/code-reviewer/:path*",
  ],
};
