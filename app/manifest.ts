import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rasheed Iskilu - Frontend Engineer',
    short_name: 'Rasheed Portfolio',
    description: 'Frontend Engineer building production web and mobile products with React, Next.js, TypeScript, and React Native.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f1e9',
    theme_color: '#3155df',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['business', 'productivity', 'developer'],
    lang: 'en-US',
  }
}
