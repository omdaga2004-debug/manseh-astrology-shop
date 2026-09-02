import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { bagCount, lastAdded } = useStore();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'The collection' },
    { href: '/kundli', label: 'Kundli' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-5 pt-6 sm:px-8">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between">
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen((v) =>!v)} className="text-[11px] tracking-[0.2em] uppercase text-white/70 md:hidden">
          {open? <X size={15} /> : <Menu size={15} />} Menu
        </button>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-white text-[26px] tracking-[0.35em] font-serif font-light">
          MANSEH
        </Link>
        <Link href="/cart" className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white">
          <ShoppingBag size={14} /> Bag <span className="text-[#d8ad56]">({bagCount})</span>
        </Link>
      </div>
      {open && (
        <nav className="mx-auto mt-5 flex max-w-[1320px] flex-col gap-5 border-t border-white/10 bg-[#080808] pt-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-white/80">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}



export function SiteFooter() {
  return (
    <footer className="border-t border-[#d8ad56]/20 bg-[#080e14] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.4fr_.7fr_.7fr_.8fr]">
        <div>
          <p className="font-serif text-3xl tracking-[.18em] text-[#f0ece0]">MANSEH</p>
          <p className="mt-5 max-w-[260px] text-sm leading-6 text-[#9b9d98]">Objects for the inner life. Made slowly in small celestial editions.</p>
        </div>
        <div>
          <p className="eyebrow mb-5">Explore</p>
          <div className="flex flex-col gap-3 text-sm text-[#c9c6b9]">
            <Link href="/shop" data-testid="link-footer-collection" className="line-link w-fit">The collection</Link>
            <Link href="/kundli" data-testid="link-footer-kundli" className="line-link w-fit">Your chart</Link>
            <Link href="/login" data-testid="link-footer-sign-in" className="line-link w-fit">Sign in</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">Notes</p>
          <div className="flex flex-col gap-3 text-sm text-[#c9c6b9]">
            <a href="mailto:hello@manseh.co" data-testid="link-footer-email" className="line-link w-fit">hello@manseh.co</a>
            <span>New Delhi · Worldwide</span>
          </div>
        </div>
        <div className="md:text-right">
          <p className="eyebrow mb-5">A small ritual</p>
          <p className="text-sm leading-6 text-[#9b9d98]">Take what speaks. Leave what doesn't.</p>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1320px] justify-between border-t border-[#d8ad56]/15 pt-5 font-mono text-[9px] uppercase tracking-[.18em] text-[#696d69]">
        <span>© {new Date().getFullYear()} Manseh</span><span>Made under moonlight</span>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="manseh-page noise"><SiteHeader />{children}<SiteFooter /></div>;
}

export function Notice({ children }: { children: ReactNode }) {
  return <div role="status" data-testid="status-api-unavailable" className="border border-[#d8ad56]/25 bg-[#121a20] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#c7a456]">{children}</div>;
}
