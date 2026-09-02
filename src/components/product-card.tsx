import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { type StoreProduct, useStore } from '@/lib/store';

export function ProductCard({ product, featured = false }: { product: StoreProduct; featured?: boolean }) {
  const { addToBag, lastAdded } = useStore();
  const isAdded = String(lastAdded) === String(product.id);
  return (
    <article className={`group ${featured? 'md:col-span-2' : ''}`}>
      <div className="relative overflow-hidden bg-[#f1b622] aspect-[1.3/1]">
        <Link href={`/product/${product.id}`} className="block h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute left-4 top-4 text-[9px] text-white uppercase tracking-widest">{product.category}</span>
          <span className="absolute bottom-4 right-4 flex items-center gap-1 text-[9px] uppercase text-white">View <ArrowUpRight size={10} /></span>
        </Link>
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-black/10 py-4">
        <div>
          <h3 className="text-xl text-black" style={{fontFamily:'Playfair Display'}}>{product.name}</h3>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-green-600">{product.zodiac}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs">${product.price}</span>
          <button type="button" onClick={() => addToBag(product)} className="flex h-8 w-8 items-center justify-center rounded-full border border-black">
            {isAdded? <span className="text-xs">✓</span> : <Plus size={15} />}
          </button>
        </div>
      </div>
    </article>
  );
}
