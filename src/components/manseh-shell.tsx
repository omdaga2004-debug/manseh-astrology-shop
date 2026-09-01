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
    <header className="absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between">
        <nav className="hidden gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`} className={`line-link focus-ring eyebrow !text-[9px] !tracking-[.2em] ${location === link.href ? '!text-[#e7c576]' : '!text-[#a2a39e]'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-open-menu" className="focus-ring eyebrow flex items-center gap-2 !text-[9px] !text-[#a2a39e] md:hidden">
          {open ? <X size={15} strokeWidth={1.5} /> : <Menu size={15} strokeWidth={1.5} />}
          Menu
        </button>
        <Link href="/" data-testid="link-wordmark" className="focus-ring absolute left-1/2 -translate-x-1/2 font-serif text-[18px] tracking-[.25em] text-[#f0ece0] sm:text-[20px]">
          MANSEH
        </Link>
        <Link href="/cart" data-testid="link-bag" className={`focus-ring eyebrow flex items-center gap-2 !text-[9px] !text-[#a2a39e] ${lastAdded ? 'bag-pop' : ''}`}>
          <ShoppingBag size={14} strokeWidth={1.3} />
          Bag <span className="text-[#d8ad56]">({bagCount})</span>
        </Link>
      </div>
      {open && (
        <nav className="mx-auto mt-5 flex max-w-[1320px] flex-col gap-5 border-t border-[#d8ad56]/20 bg-[#080e14]/95 px-1 pb-5 pt-6 backdrop-blur-md md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`} className="focus-ring eyebrow !text-xs !tracking-[.2em] !text-[#f0ece0]">
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} data-testid="link-mobile-sign-in" className="focus-ring eyebrow !text-xs !tracking-[.2em] !text-[#d8ad56]">Sign in</Link>
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