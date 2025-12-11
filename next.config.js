/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Matikan tulisan "X-Powered-By: Next.js" biar hacker gak tau versi kita
  poweredByHeader: false,

  // 2. Pasang Header Keamanan (Tambal Celah PDF)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Memperbaiki "Missing security header: X-Content-Type-Options"
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Memperbaiki "Missing security header: Referrer-Policy"
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Memperbaiki "Missing security header: Content-Security-Policy"
            // Kita izinkan script dari Google & Firebase agar app tetap jalan
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://apis.google.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
