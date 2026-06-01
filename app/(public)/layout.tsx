import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ background: '#0B0F2E', minHeight: '100vh' }}>
      <Header />
      <main className="pt-[52px]">{children}</main>
      <Footer />
    </div>
  )
}
