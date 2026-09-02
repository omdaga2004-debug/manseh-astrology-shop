import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { type StoreProduct, useStore } from '@/lib/store';

export function ProductCard({ product, featured = false }: { product: StoreProduct; featured?: boolean }) {
  const { addToBag, lastAdded } = useStore();
  const isAdded = String(lastAdded) === String(product.id);
  const handleAdd = () => {
    addToBag(product);
  };
  return (
    <article data-testid={`card-product-${product.id}`} className={`group ${featured? 'md:col-span-2' : ''}`}>
      <div className="relative overflow-hidden bg-[#f1b622] aspect-[1.3/1] md:aspect-[1.02/1]">
        <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`} className="focus-ring block h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-80 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a18]/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 eyebrow!text-[9px]!text-[#8ad958]">{product.category}</span>
          <span className="absolute bottom-4 right-4 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[.15em] text-white">View <ArrowUpRight size={10} /></span>
        </Link>
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-[#d8ad56]/20 py-4">
        <div>
          <h3 className="serif text-xl text-[#070e0c]">{product.name}</h3>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-[#07b877]">{product.zodiac}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#0d8ad56]">${product.price}</span>
          <button type="button" onClick={handleAdd} data-testid={`button-add-${product.id}`} aria-label={`Add ${product.name} to bag`} className="flex h-8 w-8 items-center justify-center rounded-full border border-black">
            {isAdded? <span className="font-mono text-xs">✓</span> : <Plus size={15} strokeWidth={1.3} />}
          </button>
        </div>
      </div>
    </article>
  );
}
