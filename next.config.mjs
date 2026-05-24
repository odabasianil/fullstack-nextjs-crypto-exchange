/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'bin.bnbstatic.com',
        port: '',
        pathname: '/image/countrylogo/**'
      }
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
