/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // 設為 true 表示永久重定向 (301)，設為 false 表示臨時重定向 (307)
      },
    ];
  },
};

export default nextConfig;
