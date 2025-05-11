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
        ],
    },
};

export default nextConfig;
