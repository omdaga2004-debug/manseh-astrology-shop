import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { postCart } from '@/lib/manseh-api';
import { type StoreProduct, useStore } from '@/lib/store';

export function ProductCard({ product, featured = false }: { product: StoreProduct; featured?: boolean }) {
  const { addToBag, lastAdded } = useStore();
  const isAdded = String(lastAdded) === String(product.id);

  const handleAdd = () => {
    addToBag(product);
    void postCart([{ productId: product.id, quantity: 1 }]).catch(() => {
      window.dispatchEvent(new CustomEvent('manseh-api-unavailable'));
    });
  };

  return (
    <article data-testid={`card-product-${product.id}`} className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden bg-[#111b22] ${featured ? 'aspect-[1.3/1] md:aspect-[1.75/1]' : 'aspect-[.82/1]'}`}>
        <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`} className="focus-ring block h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080e14]/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 eyebrow !text-[9px] !text-[#d8ad56]">{product.category}</span>
          <span className="absolute bottom-4 right-4 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[.15em] text-[#f0ece0] opacity-0 transition group-hover:opacity-100">View <ArrowUpRight size={13} /></span>
        </Link>
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-[#d8ad56]/20 py-4">
        <div>
          <h3 className="serif text-xl text-[#f0ece0]">{product.name}</h3>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-[#878b87]">{product.zodiac}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#d8ad56]">${product.price}</span>
          <button type="button" onClick={handleAdd} data-testid={`button-add-${product.id}`} aria-label={`Add ${product.name} to bag`} className="focus-ring flex h-8 w-8 items-center justify-center border border-[#d8ad56]/35 text-[#d8ad56] transition hover:bg-[#d8ad56] hover:text-[#080e14]">
            {isAdded ? <span className="font-mono text-xs">✓</span> : <Plus size={15} strokeWidth={1.3} />}
          </button>
        </div>
      </div>
    </article>
  );
}