/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          use: [{loader: '@svgr/webpack', options: {icon: true}}],
        })
    
        return config
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.graphassets.com',
            port: '',
          },
        ],
      },
}
