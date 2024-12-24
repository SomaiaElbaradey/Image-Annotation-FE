import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["firebasestorage.googleapis", "imgs.search.brave.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
