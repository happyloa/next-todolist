/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // 永久重新導向使用 308；false 則使用 307。
      },
    ];
  },
};

export default nextConfig;
