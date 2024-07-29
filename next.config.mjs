/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "scentsnstories.pk"
        
            }, 
            {
                hostname: "cdn.shopify.com",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
