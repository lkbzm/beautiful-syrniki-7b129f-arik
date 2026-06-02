import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title:
          'Re:Bumi Recycled Sandals | Sustainable Footwear Exporter from Indonesia',
      },
      {
        name: 'description',
        content:
          'Premium recycled sandals made from 95% recycled materials. Trusted by sustainable retailers and distributors worldwide. Export-ready wholesale program for Germany and Netherlands.',
      },
      {
        name: 'keywords',
        content:
          'sustainable sandals, recycled footwear, eco footwear supplier, sustainable footwear exporter, wholesale sustainable sandals, Germany sustainable footwear supplier, Netherlands eco footwear supplier, Indonesian footwear exporter',
      },
      { property: 'og:title', content: 'Re:Bumi Recycled Sandals | Sustainable Footwear Exporter' },
      {
        property: 'og:description',
        content:
          'Premium recycled sandals from 95% post-consumer materials. Closed-loop circular economy. Lifetime repair warranty. Export wholesale program.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#1F4D3A' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
