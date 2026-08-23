export const metadata = {
  title: 'Musaddik Jewellery Studio',
  description: 'Sanity Studio CMS for Musaddik Jewellery Store',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 overflow-auto bg-[#0A0B0E]">{children}</div>
}
