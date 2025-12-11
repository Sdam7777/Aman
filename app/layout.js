export const metadata = {
  title: 'Web Berita Modern',
  description: 'Portal Berita',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
