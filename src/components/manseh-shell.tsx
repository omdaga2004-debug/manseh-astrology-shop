import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X, Instagram, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";


const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "The collection" },
  { href: "/kundli", label: "Kundli reading" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { bagCount } = useStore();

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent border-b border-white/[0.06]">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10">
        <button type="button" onClick={() => setOpen((v) =>!v)} className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white md:hidden">
          {open? <><X size={14}/> Close</> : <><Menu size={14}/> Menu</>}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {nav.map(i => (
            <Link key={i.href} href={i.href} className={cn("text-[11px] tracking-[0.2em] uppercase hover:text-white transition-colors", location===i.href? "text-white" : "text-white/50")}>
              {i.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-[26px] md:text-[30px] tracking-[0.45em] text-white font-light">
          MANSEH
        </Link>

        <div className="flex items-center gap-5">
          
          <Link href="/cart" className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white">
            <ShoppingBag size={15} /> Bag ({bagCount})
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0c0c0c] border-t border-white/10 px-6 py-10 flex flex-col gap-6">
          {nav.map(i => (
            <Link key={i.href} href={i.href} onClick={()=>setOpen(false)} className="text-3xl font-serif font-light text-white">
              {i.label}
            </Link>
          ))}
          <p className="mt-8 text-[11px] leading-6 tracking-[0.15em] uppercase text-white/30 max-w-[280px]">
            Where silence becomes culture — A house of astrology, curated for the modern soul.
          </p>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="font-serif text-[32px] tracking-[0.4em] text-white">MANSEH</div>
            <p className="mt-4 max-w-[320px] text-[11px] leading-[1.8] tracking-[0.15em] uppercase text-white/30">
              Where silence becomes culture.<br/>
              Curated astrology, gemstones & kundli for the modern seeker.
            </p>
          </div>
          <div className="flex gap-16 text-[11px] tracking-[0.2em] uppercase text-white/40">
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="hover:text-white">Shop</Link>
              <Link href="/kundli" className="hover:text-white">Kundli</Link>
              <Link href="/cart" className="hover:text-white">Bag</Link>
            </div>
            <a href="#" className="flex items-center gap-2 hover:text-white"><Instagram size={12}/> Instagram <ArrowUpRight size={10}/></a>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex justify-between text-[10px] tracking-[0.2em] uppercase text-white/20">
          <span>© 2026 MANSEH</span>
          <span>Crafted with silence</span>
        </div>
      </div>
    </footer>
  );
}
