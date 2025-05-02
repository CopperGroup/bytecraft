import { Store } from "@/constants/store";
import { MetadataRoute } from "next";

export default function functionName(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/myOrders", "/order", "/liked", "/api", "/cart", "/warranty", "/shipping", "/new-pass", "/resetPass", "/verifyemail", "/signup"]
            }
        ],
        sitemap: `${Store.domain}/sitemap.xml`
    }
}