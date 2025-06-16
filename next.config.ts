import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // コンテナ化に最適化された設定
  output: 'standalone',
  
  // Dockerfileでのファイルトレースを最適化
  outputFileTracingRoot: process.cwd(),
  
  // middleware.tsが正常動作することを保証
  async rewrites() {
    return []
  }
};

export default nextConfig;
