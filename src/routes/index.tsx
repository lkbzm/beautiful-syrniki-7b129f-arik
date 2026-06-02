import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FadeInWhenVisible, AnimatedCounter, staggerContainer, fadeUp } from '@/components/animations'

export const Route = createFileRoute('/')({
  component: ReBumiLanding,
})

// ─── Utility ────────────────────────────────────────────────────────────────

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

// ─── Icons ──────────────────────────────────────────────────────────────────

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  )
}

function MenuIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

// ─── Announcement Bar ────────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 bg-[#1F4D3A] text-white text-sm py-2.5 px-4 text-center font-inter">
      <span className="opacity-90">Exporting Sustainable Footwear to 20+ Countries Worldwide</span>
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="ml-4 underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
      >
        Request Wholesale Catalog →
      </button>
    </div>
  )
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function Navigation() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Product', href: '#product' },
    { label: 'Sustainability', href: '#sustainability' },
    { label: 'Wholesale', href: '#wholesale' },
    { label: 'Export', href: '#export' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="sticky top-[42px] z-40 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#e2ddd5]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-playfair text-2xl font-bold text-[#1F4D3A] tracking-tight">
          RE:BUMI
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-inter text-[#5a5a5a] hover:text-[#1F4D3A] transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('#contact')}
          className="hidden md:flex items-center gap-2 bg-[#1F4D3A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#163629] transition-colors btn-ripple"
        >
          Request Catalog
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1F4D3A]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#F8F7F4] border-b border-[#e2ddd5]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-base font-medium text-[#1A1A1A] hover:text-[#1F4D3A] transition-colors py-1"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 bg-[#1F4D3A] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#163629] transition-colors text-center"
              >
                Request Catalog
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToProduct = () =>
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#1F4D3A]">
      {/* Parallax background pattern */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 60% 40%, rgba(217,199,162,0.15) 0%, transparent 60%),
              radial-gradient(ellipse 40% 80% at 20% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)
            `,
          }}
        />
        {/* Leaf-like organic shapes */}
        <svg className="absolute top-20 right-10 opacity-10" width="400" height="400" viewBox="0 0 400 400">
          <ellipse cx="200" cy="200" rx="160" ry="80" fill="none" stroke="#D9C7A2" strokeWidth="1" transform="rotate(-30 200 200)" />
          <ellipse cx="200" cy="200" rx="130" ry="60" fill="none" stroke="#D9C7A2" strokeWidth="0.5" transform="rotate(-30 200 200)" />
          <ellipse cx="200" cy="200" rx="100" ry="40" fill="none" stroke="#D9C7A2" strokeWidth="0.5" transform="rotate(-30 200 200)" />
        </svg>
        <svg className="absolute bottom-20 left-10 opacity-5" width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#D9C7A2" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="#D9C7A2" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full"
        style={{ opacity }}
      >
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-inter font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9C7A2] animate-pulse" />
            Made in Bandung, Indonesia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            The World's{' '}
            <em className="not-italic text-[#D9C7A2]">Most Honest</em>{' '}
            Sustainable Sandal
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-white/70 font-inter text-xl font-light leading-relaxed">
              95% Recycled.{' '}
              <span className="text-[#D9C7A2]">Built To Last A Lifetime.</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/60 font-inter text-base leading-relaxed mb-10 max-w-lg"
          >
            Re:Bumi transforms post-consumer waste into premium footwear designed for conscious consumers and sustainable retailers worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={scrollToContact}
              className="bg-[#D9C7A2] text-[#1F4D3A] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors btn-ripple flex items-center gap-2"
            >
              Request Wholesale Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToContact}
              className="bg-white/10 text-white border border-white/30 font-medium px-6 py-3.5 rounded-full hover:bg-white/20 transition-colors"
            >
              Order Sample
            </button>
            <button
              onClick={scrollToProduct}
              className="text-white/70 font-medium px-4 py-3.5 hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
            >
              Download Product Sheet
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {[
              '95% Recycled Materials',
              'Lifetime Repair Warranty',
              'Closed-Loop Recycling',
              'Exported to 20+ Countries',
              'Made in Indonesia',
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs font-inter text-white/80 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full"
              >
                <CheckIcon className="w-3 h-3 text-[#D9C7A2] flex-shrink-0" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:grid grid-cols-2 gap-4"
        >
          {[
            { value: 20, suffix: '+', label: 'Countries Exported', sublabel: 'Global reach' },
            { value: 95, suffix: '%', label: 'Recycled Materials', sublabel: 'Post-consumer' },
            { value: 100, suffix: '%', label: 'Repair Commitment', sublabel: 'Lifetime warranty' },
            { value: 2020, suffix: '', label: 'MICAM Milano', sublabel: 'International trade fair' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors"
            >
              <div className="font-playfair text-4xl font-bold text-[#D9C7A2] mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold font-inter text-sm mb-0.5">{stat.label}</div>
              <div className="text-white/50 font-inter text-xs">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/40 text-xs font-inter uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

// ─── Trust Section ───────────────────────────────────────────────────────────

function TrustSection() {
  const partners = [
    { name: 'Accelerate2030', abbr: 'A2030' },
    { name: 'United Nations', abbr: 'UN' },
    { name: 'MICAM Milano', abbr: 'MICAM' },
    { name: 'BPIPI', abbr: 'BPIPI' },
    { name: 'Kementerian Perindustrian', abbr: 'KEMENPERIN' },
  ]

  return (
    <section className="py-16 bg-white border-b border-[#e2ddd5]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInWhenVisible>
          <p className="text-center text-[#5a5a5a] font-inter text-sm uppercase tracking-widest mb-10">
            Trusted By Sustainability Leaders
          </p>
        </FadeInWhenVisible>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
        >
          {partners.map((p) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              className="opacity-40 hover:opacity-70 transition-opacity cursor-default"
            >
              <div className="font-playfair font-bold text-lg text-[#1A1A1A] tracking-tight">
                {p.abbr}
              </div>
              <div className="font-inter text-xs text-[#5a5a5a] text-center mt-0.5">
                {p.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── About Section ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeInWhenVisible direction="left">
            {/* Image placeholder with layered design */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#1F4D3A] relative">
                <div
                  <img
                  src="/images.jpg"
                  alt="Re:Bumi sandal"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 30% 70%, rgba(217,199,162,0.3) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
                    `,
                  }}
                />
                {/* Decorative sandal illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 380" className="w-64 h-80 opacity-20" fill="none">
                    <ellipse cx="150" cy="300" rx="100" ry="30" fill="#D9C7A2" />
                    <path d="M80 300 Q150 100 220 300" stroke="#D9C7A2" strokeWidth="12" strokeLinecap="round" fill="none" />
                    <path d="M100 240 Q150 160 200 240" stroke="#D9C7A2" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M110 200 Q150 140 190 200" stroke="#D9C7A2" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <circle cx="150" cy="120" r="20" fill="#D9C7A2" opacity="0.5" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15">
                    <div className="text-[#D9C7A2] font-playfair font-bold text-2xl mb-1">Since 2018</div>
                    <div className="text-white/80 font-inter text-sm">Circular footwear from Bandung, Indonesia</div>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D9C7A2] rounded-2xl flex items-center justify-center">
                <div className="text-[#1F4D3A] font-playfair font-bold text-3xl">♻</div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right">
            <div>
              <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3 mb-6 leading-tight">
                A Circular Footwear{' '}
                <em className="not-italic text-[#1F4D3A]">Brand From Indonesia</em>
              </h2>
              <div className="space-y-5 text-[#5a5a5a] font-inter text-base leading-relaxed">
                <p>
                  Re:Bumi was created to prove that waste can become something valuable. Born in Bandung — Indonesia's creative capital — we saw mountains of plastic waste and asked a different question: what if this became tomorrow's footwear?
                </p>
                <p>
                  Each sandal transforms post-consumer materials into durable, beautiful footwear while dramatically reducing environmental impact. We work with local artisans who have spent generations mastering the craft of footwear.
                </p>
                <p>
                  Rather than creating more waste, Re:Bumi is designed around a closed-loop system where products can be repaired, reused, and recycled again. When your sandal reaches the end of its first life, we bring it back for a second.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { label: 'MOQ', value: '50–100 pairs' },
                  { label: 'Lead Time', value: '4–6 weeks' },
                  { label: 'HS Code', value: '6404' },
                  { label: 'Price', value: 'USD 40–80' },
                ].map(item => (
                  <div key={item.label} className="border-l-2 border-[#D9C7A2] pl-4">
                    <div className="text-xs font-inter text-[#5a5a5a] uppercase tracking-wider">{item.label}</div>
                    <div className="text-[#1A1A1A] font-semibold font-inter mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

// ─── Sustainability Section ──────────────────────────────────────────────────

function SustainabilitySection() {
  const flow = [
    { step: '01', icon: '🧴', label: 'Used Plastic Bottles', sub: 'Post-consumer waste' },
    { step: '02', icon: '🔄', label: 'Recycled Fiber', sub: 'Processing & refining' },
    { step: '03', icon: '👟', label: 'Footwear Production', sub: 'Artisan crafted in Bandung' },
    { step: '04', icon: '🌍', label: 'Consumer Use', sub: 'Global distribution' },
    { step: '05', icon: '🔧', label: 'Repair Program', sub: 'Lifetime commitment' },
    { step: '06', icon: '↩', label: 'Take-Back Program', sub: 'Return your sandal' },
    { step: '07', icon: '♻', label: 'Recycling Again', sub: 'Closed-loop complete' },
  ]

  const impactCards = [
    { value: '95%', label: 'Recycled Materials', desc: 'Post-consumer plastic transformed' },
    { value: 'Lifetime', label: 'Repair Warranty', desc: 'We fix it, no questions asked' },
    { value: 'Closed Loop', label: 'Recycling Program', desc: 'Product returned and remade' },
    { value: 'Reduced', label: 'Virgin Material Usage', desc: '95% less new plastic needed' },
  ]

  return (
    <section id="sustainability" className="section-padding bg-[#1F4D3A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-[#D9C7A2]/70 font-inter text-sm font-semibold uppercase tracking-widest">
              Verified Impact
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
              Not Greenwashing.{' '}
              <em className="not-italic text-[#D9C7A2]">Verified Impact.</em>
            </h2>
            <p className="text-white/60 font-inter max-w-2xl mx-auto leading-relaxed">
              Re:Bumi follows a circular economy model that minimizes waste and extends product life across every stage of its journey.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Flow diagram */}
        <div className="relative mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {flow.map((item, i) => (
              <FadeInWhenVisible key={item.step} delay={i * 0.08}>
                <div className="relative flex flex-col items-center text-center group">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-3 group-hover:bg-[#D9C7A2]/20 transition-colors"
                  >
                    <span>{item.icon}</span>
                  </motion.div>
                  <div className="text-[#D9C7A2] font-inter text-xs font-semibold mb-1">{item.step}</div>
                  <div className="text-white font-inter text-xs font-semibold leading-tight mb-1">{item.label}</div>
                  <div className="text-white/40 font-inter text-xs leading-tight">{item.sub}</div>
                  {/* Connector arrow */}
                  {i < flow.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-3 text-white/20">›</div>
                  )}
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        {/* Impact cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {impactCards.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/8 border border-white/15 rounded-2xl p-6 text-center hover:bg-white/12 transition-all cursor-default"
            >
              <div className="font-playfair text-3xl font-bold text-[#D9C7A2] mb-2">{card.value}</div>
              <div className="text-white font-semibold font-inter text-sm mb-2">{card.label}</div>
              <div className="text-white/50 font-inter text-xs leading-relaxed">{card.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Product Section ─────────────────────────────────────────────────────────

function ProductSection() {
  const [activeVariant, setActiveVariant] = useState(0)

  const variants = [
    {
      name: 'Black Matcha',
      color: '#2a2a2a',
      accent: '#4a6741',
      hex: '#2a2a2a',
    },
    {
      name: 'White Matcha',
      color: '#f5f0e8',
      accent: '#8fad6b',
      hex: '#ede8dd',
    },
  ]

  const specs = [
    { label: 'Product Name', value: 'Re:Bumi Recycled Sandals' },
    { label: 'Material', value: '95% Recycled Materials' },
    { label: 'Upper', value: 'Recycled PET Fiber' },
    { label: 'Outsole', value: 'Recycled Rubber' },
    { label: 'Category', value: 'Unisex Casual Sandals' },
    { label: 'Packaging', value: 'Eco Recycled Packaging' },
    { label: 'MOQ', value: '50–100 Pairs' },
    { label: 'Lead Time', value: '4–6 Weeks' },
    { label: 'HS Code', value: '6404' },
    { label: 'Price', value: 'USD 40–80' },
    { label: 'Origin', value: 'Bandung, Indonesia' },
  ]

  return (
    <section id="product" className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              The Product
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              Meet Re:Bumi{' '}
              <em className="not-italic text-[#1F4D3A]">Recycled Sandals</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product visual */}
          <FadeInWhenVisible direction="left">
            <div className="space-y-4">
              {/* Main product display */}
              <motion.div
                key={activeVariant}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-square rounded-3xl overflow-hidden relative"
                style={{ backgroundColor: variants[activeVariant].color }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at 30% 40%, ${variants[activeVariant].accent}40 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-72 h-54" fill="none">
                    {/* Sandal sole */}
                    <ellipse cx="200" cy="220" rx="160" ry="50" fill={activeVariant === 0 ? '#3a3a3a' : '#d4cdbf'} />
                    <ellipse cx="200" cy="215" rx="155" ry="44" fill={activeVariant === 0 ? '#2a2a2a' : '#c8c0b0'} />
                    {/* Straps */}
                    <path d="M80 215 Q160 120 200 100 Q240 120 320 215" stroke={activeVariant === 0 ? '#4a6741' : '#8fad6b'} strokeWidth="16" strokeLinecap="round" fill="none" />
                    <path d="M110 190 Q200 130 290 190" stroke={activeVariant === 0 ? '#4a6741' : '#8fad6b'} strokeWidth="12" strokeLinecap="round" fill="none" />
                    {/* Logo text */}
                    <text x="200" y="225" textAnchor="middle" fill={activeVariant === 0 ? '#666' : '#a09080'} fontSize="14" fontFamily="serif" fontStyle="italic">re:bumi</text>
                  </svg>
                </div>
                {/* Hover zoom effect */}
                <motion.div
                  className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors cursor-zoom-in"
                  whileHover={{ scale: 1.02 }}
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#1F4D3A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  95% Recycled
                </div>
              </motion.div>

              {/* Variant selector */}
              <div className="flex gap-3">
                {variants.map((v, i) => (
                  <button
                    key={v.name}
                    onClick={() => setActiveVariant(i)}
                    className={`flex-1 py-3 rounded-xl border-2 font-inter text-sm font-medium transition-all ${
                      activeVariant === i
                        ? 'border-[#1F4D3A] bg-[#1F4D3A] text-white'
                        : 'border-[#e2ddd5] text-[#5a5a5a] hover:border-[#1F4D3A]'
                    }`}
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: v.hex }}
                    />
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Specs table */}
          <FadeInWhenVisible direction="right">
            <div className="bg-white rounded-3xl border border-[#e2ddd5] overflow-hidden">
              <div className="p-6 border-b border-[#e2ddd5] bg-[#1F4D3A]">
                <h3 className="font-playfair text-xl font-bold text-white">Product Specifications</h3>
                <p className="text-white/60 text-sm font-inter mt-1">Export & wholesale details</p>
              </div>
              <div className="divide-y divide-[#e2ddd5]">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center px-6 py-3.5 hover:bg-[#F8F7F4] transition-colors group">
                    <div className="w-1/2 font-inter text-sm text-[#5a5a5a] group-hover:text-[#1F4D3A] transition-colors">
                      {spec.label}
                    </div>
                    <div className="w-1/2 font-inter text-sm font-semibold text-[#1A1A1A]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#F8F7F4] border-t border-[#e2ddd5]">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-[#1F4D3A] text-white font-semibold py-3 rounded-xl hover:bg-[#163629] transition-colors btn-ripple flex items-center justify-center gap-2"
                >
                  Request Pricing Sheet
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

// ─── Why Re:Bumi ─────────────────────────────────────────────────────────────

function WhySection() {
  const reasons = [
    {
      icon: '♻',
      title: '95% Recycled Materials',
      desc: 'Every component traced back to post-consumer waste — PET bottles, recycled rubber, and more.',
    },
    {
      icon: '◎',
      title: 'Closed Loop System',
      desc: 'Take-back program ensures products never end up in landfill. We close the loop completely.',
    },
    {
      icon: '✦',
      title: 'Lifetime Repair Warranty',
      desc: 'Every pair comes with our commitment: we repair it for life, no questions asked.',
    },
    {
      icon: '◈',
      title: 'Competitive Premium Pricing',
      desc: 'USD 40–80 wholesale. Strong margins for retailers. Premium quality at accessible price points.',
    },
    {
      icon: '✈',
      title: 'Export Ready',
      desc: 'HS Code 6404 certified. Customs documentation, international shipping, B2B packaging all handled.',
    },
    {
      icon: '⬡',
      title: 'Authentic Indonesian Craftsmanship',
      desc: 'Handcrafted in Bandung by skilled artisans with decades of footwear expertise.',
    },
  ]

  return (
    <section id="wholesale" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Partner Benefits
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              Why Retailers{' '}
              <em className="not-italic text-[#1F4D3A]">Choose Re:Bumi</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(31,77,58,0.1)' }}
              className="group bg-[#F8F7F4] rounded-2xl p-7 border border-[#e2ddd5] hover:border-[#1F4D3A]/30 transition-all cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1F4D3A]/10 flex items-center justify-center text-[#1F4D3A] text-xl mb-5 group-hover:bg-[#1F4D3A] group-hover:text-[#D9C7A2] transition-all">
                {r.icon}
              </div>
              <h3 className="font-playfair font-bold text-[#1A1A1A] text-xl mb-3">{r.title}</h3>
              <p className="font-inter text-[#5a5a5a] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Comparison Table ────────────────────────────────────────────────────────

function ComparisonSection() {
  const rows = [
    { feature: 'Recycled Content', rebumi: '95%', allbirds: '~60%', veja: '~50%' },
    { feature: 'Closed Loop Program', rebumi: true, allbirds: false, veja: false },
    { feature: 'Repair Warranty', rebumi: 'Lifetime', allbirds: '1 year', veja: 'Limited' },
    { feature: 'Export Readiness', rebumi: '20+ countries', allbirds: 'Limited B2B', veja: 'Select only' },
    { feature: 'Wholesale Availability', rebumi: true, allbirds: false, veja: false },
    { feature: 'Price Range (USD)', rebumi: '$40–80', allbirds: '$100–145', veja: '$120–170' },
  ]

  const renderCell = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <CheckIcon className="w-5 h-5 text-[#4CAF50] mx-auto" />
      ) : (
        <span className="text-[#ccc] font-inter text-lg mx-auto block text-center">—</span>
      )
    }
    return <span className="font-inter text-sm font-medium">{val}</span>
  }

  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-5xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Market Position
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              How Re:Bumi{' '}
              <em className="not-italic text-[#1F4D3A]">Compares</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="bg-white rounded-3xl border border-[#e2ddd5] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-[#e2ddd5]">
              <div className="p-5" />
              {['Re:Bumi', 'Allbirds', 'Veja'].map((brand, i) => (
                <div
                  key={brand}
                  className={`p-5 text-center border-l border-[#e2ddd5] ${i === 0 ? 'bg-[#1F4D3A]' : ''}`}
                >
                  <div className={`font-playfair font-bold text-lg ${i === 0 ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    {brand}
                  </div>
                  {i === 0 && (
                    <div className="text-[#D9C7A2] text-xs font-inter mt-0.5">Best choice</div>
                  )}
                </div>
              ))}
            </div>
            {/* Rows */}
            {rows.map((row, ri) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ri * 0.07 }}
                className="grid grid-cols-4 border-b border-[#e2ddd5] last:border-0 hover:bg-[#F8F7F4]/50 transition-colors"
              >
                <div className="p-4 pl-6 font-inter text-sm text-[#5a5a5a] flex items-center">
                  {row.feature}
                </div>
                {/* Re:Bumi */}
                <div className="p-4 bg-[#1F4D3A]/5 border-l border-[#1F4D3A]/20 flex items-center justify-center">
                  <span className="font-inter text-sm font-semibold text-[#1F4D3A]">
                    {typeof row.rebumi === 'boolean' ? (
                      <CheckIcon className="w-5 h-5 text-[#4CAF50]" />
                    ) : row.rebumi}
                  </span>
                </div>
                <div className="p-4 border-l border-[#e2ddd5] flex items-center justify-center text-[#5a5a5a]">
                  {renderCell(row.allbirds)}
                </div>
                <div className="p-4 border-l border-[#e2ddd5] flex items-center justify-center text-[#5a5a5a]">
                  {renderCell(row.veja)}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

// ─── Wholesale Process ───────────────────────────────────────────────────────

function ProcessSection() {
  const steps = [
    { num: '01', title: 'Request Catalog', desc: 'Download our wholesale catalog with full product range and pricing.' },
    { num: '02', title: 'Review Pricing', desc: 'Our export team sends a customized pricing sheet within 24 hours.' },
    { num: '03', title: 'Order Samples', desc: 'Receive physical samples to evaluate quality firsthand.' },
    { num: '04', title: 'Confirm Purchase Order', desc: 'Sign our wholesale agreement and place your first order.' },
    { num: '05', title: 'Production', desc: '4–6 week lead time with regular updates and quality reports.' },
    { num: '06', title: 'International Shipping', desc: 'Door-to-door delivery with full customs documentation.' },
  ]

  return (
    <section className="section-padding bg-[#1F4D3A]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-[#D9C7A2]/70 font-inter text-sm font-semibold uppercase tracking-widest">
              Simple Partnership
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
              How To Work{' '}
              <em className="not-italic text-[#D9C7A2]">With Us</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-white/10 z-0">
            <motion.div
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="h-full bg-[#D9C7A2]/40"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-[#D9C7A2] text-[#1F4D3A] font-playfair font-bold text-lg flex items-center justify-center mb-4 shadow-lg relative z-10"
                >
                  {step.num}
                </motion.div>
                <h3 className="font-playfair font-semibold text-white text-sm mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 font-inter text-xs leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <FadeInWhenVisible>
          <div className="mt-14 text-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#D9C7A2] text-[#1F4D3A] font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors btn-ripple inline-flex items-center gap-2"
            >
              Start Your Wholesale Partnership
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

// ─── Export Experience ───────────────────────────────────────────────────────

function ExportSection() {
  const regions = [
    { name: 'Germany', x: '51%', y: '28%', flag: '🇩🇪' },
    { name: 'Netherlands', x: '50%', y: '26%', flag: '🇳🇱' },
    { name: 'Switzerland', x: '51%', y: '31%', flag: '🇨🇭' },
    { name: 'Japan', x: '82%', y: '33%', flag: '🇯🇵' },
    { name: 'Australia', x: '80%', y: '68%', flag: '🇦🇺' },
    { name: 'USA', x: '18%', y: '38%', flag: '🇺🇸' },
    { name: 'Singapore', x: '76%', y: '55%', flag: '🇸🇬' },
    { name: 'Indonesia', x: '78%', y: '57%', flag: '🇮🇩' },
  ]

  return (
    <section id="export" className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Worldwide Reach
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              Global Export{' '}
              <em className="not-italic text-[#1F4D3A]">Experience</em>
            </h2>
            <p className="text-[#5a5a5a] font-inter max-w-xl mx-auto mt-4 leading-relaxed">
              Re:Bumi products have reached customers in more than 20 countries, with growing demand from European sustainable retailers.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="relative bg-[#1F4D3A] rounded-3xl overflow-hidden" style={{ paddingBottom: '48%' }}>
            {/* World map SVG - simplified */}
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full opacity-20"
              fill="none"
            >
              {/* Very simplified world land masses */}
              <ellipse cx="200" cy="220" rx="140" ry="100" fill="#D9C7A2" />
              <ellipse cx="510" cy="200" rx="160" ry="110" fill="#D9C7A2" />
              <ellipse cx="510" cy="340" rx="120" ry="90" fill="#D9C7A2" />
              <ellipse cx="780" cy="200" rx="100" ry="90" fill="#D9C7A2" />
              <ellipse cx="790" cy="350" rx="80" ry="60" fill="#D9C7A2" />
              <ellipse cx="820" cy="290" rx="30" ry="20" fill="#D9C7A2" />
            </svg>

            {/* Dot markers */}
            {regions.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                className="absolute group"
                style={{ left: r.x, top: r.y, transform: 'translate(-50%,-50%)' }}
              >
                <div className="relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#D9C7A2] shadow-lg shadow-[#D9C7A2]/40 relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-[#D9C7A2]/40 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-lg text-center whitespace-nowrap">
                      <div className="text-base">{r.flag}</div>
                      <div className="text-xs font-semibold text-[#1A1A1A]">{r.name}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center stat */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-playfair text-7xl font-bold text-[#D9C7A2]">
                  <AnimatedCounter end={20} suffix="+" />
                </div>
                <div className="text-white/70 font-inter text-sm uppercase tracking-widest mt-1">
                  Countries Reached
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Region highlights */}
        <FadeInWhenVisible>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { region: 'Europe', markets: 'Germany, Netherlands, Switzerland, France', icon: '🇪🇺' },
              { region: 'East Asia', markets: 'Japan, South Korea, Taiwan', icon: '🌏' },
              { region: 'Southeast Asia', markets: 'Singapore, Malaysia, Thailand', icon: '🌴' },
              { region: 'Pacific', markets: 'Australia, New Zealand', icon: '🌊' },
            ].map(r => (
              <div key={r.region} className="bg-white border border-[#e2ddd5] rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-playfair font-bold text-[#1F4D3A] text-sm mb-1">{r.region}</div>
                <div className="text-[#5a5a5a] font-inter text-xs leading-relaxed">{r.markets}</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0)

  const testimonials = [
    {
      quote: "Re:Bumi has become our best-selling sustainable footwear line. The story resonates deeply with our customers — they ask about the sandals before they even see the price tag.",
      name: 'Marten de Vries',
      role: 'Buyer, Groene Stap Retail',
      location: 'Amsterdam, Netherlands',
      initial: 'M',
    },
    {
      quote: "Working with Re:Bumi has differentiated our store in ways I didn't expect. The 95% recycled claim is verified, and that credibility drives real purchasing decisions from eco-conscious shoppers.",
      name: 'Julia Hartmann',
      role: 'Owner, NaturSchritt',
      location: 'Munich, Germany',
      initial: 'J',
    },
    {
      quote: "The supply chain transparency is remarkable. We visited the Bandung facility and saw firsthand how post-consumer materials become premium footwear. Our corporate gifting clients love the narrative.",
      name: 'Thomas Verhoeven',
      role: 'Sustainability Director, GreenCorp EU',
      location: 'Rotterdam, Netherlands',
      initial: 'T',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Partner Voices
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              What Our Buyers{' '}
              <em className="not-italic text-[#1F4D3A]">Say</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F8F7F4] rounded-3xl p-10 md:p-14 border border-[#e2ddd5]"
              >
                <div className="text-[#D9C7A2] font-playfair text-7xl leading-none mb-6">"</div>
                <blockquote className="font-playfair text-xl md:text-2xl text-[#1A1A1A] leading-relaxed font-medium mb-8">
                  {testimonials[active].quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1F4D3A] flex items-center justify-center text-white font-playfair font-bold text-lg">
                    {testimonials[active].initial}
                  </div>
                  <div>
                    <div className="font-inter font-semibold text-[#1A1A1A]">{testimonials[active].name}</div>
                    <div className="font-inter text-sm text-[#5a5a5a]">{testimonials[active].role}</div>
                    <div className="font-inter text-xs text-[#1F4D3A] mt-0.5">{testimonials[active].location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    active === i ? 'w-8 h-2.5 bg-[#1F4D3A]' : 'w-2.5 h-2.5 bg-[#e2ddd5] hover:bg-[#D9C7A2]'
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What is your Minimum Order Quantity (MOQ)?',
      a: '50–100 pairs per variant. We offer flexibility for first-time orders — contact our export team to discuss your specific requirements.',
    },
    {
      q: 'Do you provide samples before bulk orders?',
      a: 'Yes. We send physical samples within 7–10 business days of request. Sample costs are credited toward your first wholesale order.',
    },
    {
      q: 'What is the production lead time?',
      a: '4–6 weeks from confirmed purchase order. We provide weekly production updates with photos and quality control reports.',
    },
    {
      q: 'Can products be customized or white-labeled?',
      a: 'Customization options (colors, strap variants, co-branding) are available for orders of 200+ pairs per variant. Discuss your requirements with our export team.',
    },
    {
      q: 'Do you export internationally to Europe?',
      a: 'Yes. We have active wholesale partners in Germany, Netherlands, Switzerland, and across the EU. We handle customs documentation, HS Code 6404 classification, and DDP shipping options.',
    },
    {
      q: 'How do you verify the 95% recycled claim?',
      a: 'Our materials are third-party certified. We provide full material traceability documentation with every order, including supplier chain documentation that satisfies EU due diligence requirements.',
    },
    {
      q: 'What is GDPR compliance for European partners?',
      a: 'All data shared with Re:Bumi is processed under our Privacy Policy compliant with GDPR. We never share partner data with third parties.',
    },
  ]

  return (
    <section id="faq" className="section-padding bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              Frequently Asked{' '}
              <em className="not-italic text-[#1F4D3A]">Questions</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.05}>
              <div className={`bg-white rounded-2xl border transition-all ${open === i ? 'border-[#1F4D3A]/30 shadow-sm' : 'border-[#e2ddd5]'}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-inter font-semibold text-[#1A1A1A] pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-[#1F4D3A]"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#5a5a5a] font-inter text-sm leading-relaxed border-t border-[#e2ddd5] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact / Form ──────────────────────────────────────────────────────────

function ContactSection() {
  const [fields, setFields] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
    requestType: 'catalog',
    'bot-field': '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await fetch('/wholesale-inquiry.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'wholesale-inquiry',
          ...fields,
          requestType: type,
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-[#1F4D3A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <FadeInWhenVisible direction="left">
            <div>
              <span className="text-[#D9C7A2]/70 font-inter text-sm font-semibold uppercase tracking-widest">
                Start Your Partnership
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
                Let's Build A More{' '}
                <em className="not-italic text-[#D9C7A2]">Sustainable Future Together</em>
              </h2>
              <p className="text-white/60 font-inter leading-relaxed mb-10">
                Our export team responds within 24–48 hours. We serve wholesale buyers, distributors, importers, and corporate sustainability programs across Europe and beyond.
              </p>

              <div className="space-y-5">
                {[
                  { icon: '✉', label: 'Email', value: 'export@rebumi.id' },
                  { icon: '📞', label: 'WhatsApp', value: '+62 xxx-xxxx-xxxx' },
                  { icon: '📍', label: 'Factory', value: 'Bandung, West Java, Indonesia' },
                  { icon: '🕐', label: 'Response Time', value: '24–48 hours' },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-base flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-white/50 font-inter text-xs uppercase tracking-wider">{c.label}</div>
                      <div className="text-white font-inter text-sm font-medium mt-0.5">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-white/8 border border-white/15 rounded-2xl">
                <div className="text-[#D9C7A2] font-inter text-xs font-semibold uppercase tracking-wider mb-3">
                  GDPR Compliance
                </div>
                <p className="text-white/50 font-inter text-xs leading-relaxed">
                  All submitted data is processed in accordance with GDPR. Your information is used only for processing your wholesale inquiry and will never be sold or shared with third parties.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right form */}
          <FadeInWhenVisible direction="right">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-3">
                  Inquiry Received!
                </h3>
                <p className="font-inter text-[#5a5a5a] leading-relaxed">
                  Thank you for your interest in Re:Bumi. Our export team will contact you within 24–48 hours with a personalized wholesale proposal.
                </p>
                <div className="mt-6 p-4 bg-[#F8F7F4] rounded-xl">
                  <div className="text-xs font-inter text-[#5a5a5a]">Your inquiry has been sent to</div>
                  <div className="text-sm font-semibold text-[#1F4D3A] mt-1">Re:Bumi Export Team</div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e, fields.requestType)}
                className="bg-white rounded-3xl p-8 space-y-4"
              >
                <input type="hidden" name="form-name" value="wholesale-inquiry" />
                <input type="hidden" name="bot-field" onChange={handleChange} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      required
                      placeholder="Jan de Vries"
                      className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={fields.company}
                      onChange={handleChange}
                      required
                      placeholder="Your Company"
                      className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={fields.country}
                      onChange={handleChange}
                      required
                      placeholder="Germany"
                      className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      placeholder="+49 xxx xxxx"
                      className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    placeholder="buyer@company.de"
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={fields.businessType}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] bg-white transition-colors"
                  >
                    <option value="" disabled>Select business type</option>
                    <option value="retailer">Sustainable Retailer</option>
                    <option value="distributor">Distributor</option>
                    <option value="importer">Importer</option>
                    <option value="marketplace">Marketplace Seller</option>
                    <option value="corporate">Corporate Buyer / ESG</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-inter font-semibold text-[#5a5a5a] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your business and what you're looking for..."
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-3 font-inter text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A] placeholder:text-[#ccc] transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 font-inter text-sm">{error}</p>
                )}

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { type: 'catalog', label: 'Request Catalog' },
                    { type: 'pricing', label: 'Request Pricing' },
                    { type: 'sample', label: 'Order Sample' },
                  ].map(({ type, label }) => (
                    <button
                      key={type}
                      type="submit"
                      disabled={loading}
                      onClick={() => setFields(f => ({ ...f, requestType: type }))}
                      className={`py-3 rounded-xl font-inter font-semibold text-xs transition-all btn-ripple ${
                        type === 'catalog'
                          ? 'bg-[#1F4D3A] text-white hover:bg-[#163629]'
                          : 'bg-[#F8F7F4] text-[#1F4D3A] border border-[#e2ddd5] hover:border-[#1F4D3A]'
                      } disabled:opacity-60`}
                    >
                      {loading && fields.requestType === type ? '...' : label}
                    </button>
                  ))}
                </div>
              </form>
            )}
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

// ─── Wholesale Benefits ──────────────────────────────────────────────────────

function WholesaleBenefitsSection() {
  const benefits = [
    { icon: '◈', title: 'High Sustainability Story', desc: 'Documented, third-party verified circular economy credentials that resonate with conscious consumers.' },
    { icon: '✦', title: 'Strong Customer Appeal', desc: 'Unique product narrative that drives repeat purchase and word-of-mouth in eco-conscious communities.' },
    { icon: '◎', title: 'Premium Margins', desc: 'Competitive wholesale pricing at USD 40–80 with strong retail markup potential for your category.' },
    { icon: '⊕', title: 'Growing Market', desc: 'Sustainable footwear market growing 12% YoY in Europe. Early adopters gain significant category advantage.' },
    { icon: '⬡', title: 'Brand Differentiation', desc: 'Move beyond generic sustainable claims. Re:Bumi offers a verifiable, unique story that stands apart from mainstream.' },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <span className="text-[#1F4D3A] font-inter text-sm font-semibold uppercase tracking-widest">
              Retail Advantage
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              Designed For{' '}
              <em className="not-italic text-[#1F4D3A]">Sustainable Retailers</em>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <FadeInWhenVisible key={b.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="text-center group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1F4D3A]/8 flex items-center justify-center text-[#1F4D3A] text-xl mx-auto mb-4 group-hover:bg-[#1F4D3A] group-hover:text-[#D9C7A2] transition-all">
                  {b.icon}
                </div>
                <h3 className="font-playfair font-bold text-[#1A1A1A] text-sm mb-2 leading-tight">{b.title}</h3>
                <p className="font-inter text-[#5a5a5a] text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="font-playfair text-2xl font-bold text-white mb-4">RE:BUMI</div>
            <p className="font-inter text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Circular footwear from Bandung, Indonesia. 95% recycled. Lifetime repaired. Exported to 20+ countries worldwide.
            </p>
            <div className="flex gap-3">
              {['🌿', '♻', '🌍'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-sm hover:bg-white/15 transition-colors cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-inter text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Company</div>
            <ul className="space-y-2.5">
              {['About Us', 'Our Mission', 'Factory Tour', 'Press'].map(l => (
                <li key={l}>
                  <span className="font-inter text-sm text-white/60 hover:text-white transition-colors cursor-pointer">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <div className="font-inter text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Product</div>
            <ul className="space-y-2.5">
              {['Re:Bumi Sandals', 'Black Matcha', 'White Matcha', 'Sustainability'].map(l => (
                <li key={l}>
                  <button onClick={() => scrollTo('product')} className="font-inter text-sm text-white/60 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Wholesale */}
          <div>
            <div className="font-inter text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Wholesale</div>
            <ul className="space-y-2.5">
              {['Request Catalog', 'Pricing Sheet', 'Order Sample', 'Export FAQ'].map(l => (
                <li key={l}>
                  <button onClick={() => scrollTo('contact')} className="font-inter text-sm text-white/60 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-inter text-xs text-white/30">
            © 2024 Re:Bumi by Pijak Bumi. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {['Privacy Policy', 'Terms & Conditions', 'GDPR Compliance', 'Cookie Policy', 'Sitemap'].map(l => (
              <span key={l} className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── WhatsApp Float ──────────────────────────────────────────────────────────

function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/62xxxxxxxxxxx"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow flex items-center gap-3 pl-4 pr-5 py-3 group"
    >
      <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
      <span className="font-inter text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
        Chat With Export Team
      </span>
    </motion.a>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function ReBumiLanding() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <Hero />
      <TrustSection />
      <AboutSection />
      <SustainabilitySection />
      <ProductSection />
      <WhySection />
      <ComparisonSection />
      <WholesaleBenefitsSection />
      <ProcessSection />
      <ExportSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
