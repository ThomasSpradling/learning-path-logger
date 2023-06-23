/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});

const nextConfig = {
  publicRuntimeConfig: {
    cloudName: process.env.CLOUDINARY_NAME,
    cloudPresetName: process.env.CLOUDINARY_PRESET_NAME,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
