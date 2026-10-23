import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rashdev Solution | Rasheed Iskilu',
    short_name: 'Rashdev Solution',
    description: 'Rashdev Solution is the portfolio of Rasheed Iskilu, a full-stack developer with a frontend focus, building production web and mobile products.',
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
