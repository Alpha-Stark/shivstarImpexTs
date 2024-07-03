import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/products/:id",
        "/api/webhook/clerk",
        "/api/uploadthing",
    ],
    ignoredRoutes: [
        "/api/webhook/clerk",
        "/api/uploadthing",
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};