import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            // {
            //     protocol: "http",
            //     hostname: "192.168.1.2",
            //     port: "1337",
            // },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "http",
                hostname:
                    "petstation-strapi-kibd53-d2e992-206-189-18-184.traefik.me",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
