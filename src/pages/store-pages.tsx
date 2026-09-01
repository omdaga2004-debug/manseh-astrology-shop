import { ArrowDown, ArrowRight, Check, Minus, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { Field } from '@/components/field';
import { Notice, PageFrame } from '@/components/manseh-shell';
import { ProductCard } from '@/components/product-card';
import { fetchProduct, fetchProducts, postCart, postKundli, postLogin } from '@/lib/manseh-api';
import { fallbackProducts, useStore, type StoreProduct } from '@/lib/store';

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} — MANSEH`;
    const tag = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    tag.setAttribute('name', 'description');
    tag.setAttribute('content', description);
    document.head.appendChild(tag);
  }, [title, description]);
  return null;
}

function ButtonLink({ href, children, inverse = false, testId }: { href: string; children: ReactNode; inverse?: boolean; testId: string }) {
  return <Link href={href} data-testid={testId} className={`focus-ring inline-flex items-center gap-4 px-5 py-3 font-mono text-[10px] uppercase tracking-[.17em] transition ${inverse ? 'bg-[#f0ece0] text-[#080e14] hover:bg-[#d8ad56]' : 'border border-[#d8ad56]/45 text-[#e0bb6b] hover:bg-[#d8ad56] hover:text-[#080e14]'}`}>{children}<ArrowRight size={14} strokeWidth={1.3} /></Link>;
}

export function HomePage() {
  const { addToBag } = useStore();
  const featured = fallbackProducts[0];
  const [notice, setNotice] = useState(false);
  const addFeatured = () => {
    addToBag(featured);
    void postCart([{ productId: featured.id, quantity: 1 }]).catch(() => setNotice(true));
  };
  return (
    <PageFrame>
      <Meta title="Objects for the inner life" description="Manseh is a quiet ritual in collectible objects, astrology and adornment." />
      <main>
        <section className="relative flex min-h-[720px] items-end overflow-hidden border-b border-[#d8ad56]/15 bg-[#080e14] px-5 pb-20 pt-32 sm:min-h-[800px] sm:px-8 sm:pb-28">
          <img src="/manseh-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080e14] via-[#080e14]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080e14] via-transparent to-[#080e14]/20" />
          <div className="relative mx-auto w-full max-w-[1320px]">
            <p className="eyebrow reveal">Maison of quiet objects · Est. 2026</p>
            <h1 className="serif reveal reveal-delay-1 mt-5 max-w-[670px] text-[clamp(3.6rem,9vw,8.5rem)] leading-[.91] tracking-[-.045em] text-[#f0ece0]">The things<br />that find <em className="text-[#d8ad56]">you.</em></h1>
            <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-5">
              <ButtonLink href="/shop" testId="button-discover-collection" inverse>Discover the collection</ButtonLink>
              <p className="max-w-[190px] text-xs leading-5 text-[#b2b2aa]">For the hours when the ordinary feels too loud.</p>
            </div>
          </div>
          <div className="absolute bottom-8 right-5 hidden items-center gap-3 sm:flex sm:right-8">
            <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#9b9d98]">Scroll to enter</span><ArrowDown size={14} className="text-[#d8ad56]" />
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-36">
          <div className="grid gap-14 md:grid-cols-[.9fr_1.1fr] md:items-end">
            <div>
              <p className="eyebrow">01 — The point of departure</p>
              <h2 className="serif mt-5 max-w-[520px] text-4xl leading-[1.08] text-[#f0ece0] sm:text-6xl">A little ceremony for an otherwise ordinary day.</h2>
            </div>
            <p className="max-w-[390px] text-sm leading-7 text-[#9b9d98] md:justify-self-end">Manseh makes objects with a sense of gravity. Each piece is chosen for its feeling first: the weight in a palm, the flash of metal at dusk, the private meaning no one else can see.</p>
          </div>
        </section>

        <section className="border-y border-[#d8ad56]/15 bg-[#0c151d] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-10 flex items-end justify-between">
              <div><p className="eyebrow">02 — New moon edition</p><h2 className="serif mt-3 text-4xl text-[#f0ece0] sm:text-6xl">YOUR COLLECTION <span className="text-[#d8ad56]">—</span> The bag</h2></div>
              <Link href="/shop" data-testid="link-view-all-products" className="line-link hidden font-mono text-[10px] uppercase tracking-[.17em] text-[#d8ad56] sm:block">View all</Link>
            </div>
            <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr]">
              <ProductCard product={featured} featured />
              <div className="flex flex-col justify-between border-l border-[#d8ad56]/20 pl-0 md:pl-10">
                <div>
                  <p className="eyebrow !text-[#898c87]">The Lunar Key</p>
                  <p className="serif mt-5 max-w-[330px] text-3xl leading-tight text-[#f0ece0]">Keep one small piece of the night close.</p>
                </div>
                <div className="mt-10">
                  <p className="mb-6 max-w-[280px] text-sm leading-6 text-[#929590]">{featured.description}</p>
                  <button type="button" onClick={addFeatured} data-testid="button-add-featured" className="focus-ring inline-flex items-center gap-3 border-b border-[#d8ad56] pb-2 font-mono text-[10px] uppercase tracking-[.17em] text-[#d8ad56] transition hover:gap-5">Add to bag <Plus size={14} strokeWidth={1.2} /></button>
                  {notice && <p className="mt-4 font-mono text-[9px] uppercase tracking-[.1em] text-[#c7a456]">Saved locally · atelier sync unavailable</p>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 sm:py-36 md:grid-cols-[.75fr_1.25fr] md:items-center">
          <div className="order-2 md:order-1">
            <p className="eyebrow">03 — Read your sky</p>
            <h2 className="serif mt-5 text-4xl leading-[1.06] text-[#f0ece0] sm:text-6xl">Before the object, there is the <em className="text-[#d8ad56]">knowing.</em></h2>
            <p className="mt-7 max-w-[360px] text-sm leading-7 text-[#9b9d98]">Bring us your birth details. We’ll make a quiet map of the sky you arrived under.</p>
            <div className="mt-8"><ButtonLink href="/kundli" testId="button-read-your-chart">Read your chart</ButtonLink></div>
          </div>
          <div className="order-1 aspect-[1.2/1] overflow-hidden bg-[#111b22] md:order-2"><img src="/manseh-chart.png" alt="Birth chart ritual with brass compass" className="h-full w-full object-cover opacity-85 transition duration-700 hover:scale-[1.03]" /></div>
        </section>
      </main>
    </PageFrame>
  );
}

export function ShopPage() {
  const [products, setProducts] = useState<StoreProduct[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [filter, setFilter] = useState('ALL');
  useEffect(() => {
    fetchProducts().then((items) => {
      if (Array.isArray(items) && items.length) setProducts(items.map((item) => ({ ...item, image: item.image || '/manseh-lunar.png', description: item.description || 'A considered object for the inner life.', zodiac: item.zodiac || 'ALL SIGNS' })));
    }).catch(() => setUnavailable(true)).finally(() => setLoading(false));
  }, []);
  const categories = ['ALL', ...Array.from(new Set(products.map((product) => product.category || 'OBJECTS')))];
  const visible = filter === 'ALL' ? products : products.filter((product) => product.category === filter);
  return (
    <PageFrame>
      <Meta title="The collection" description="Explore Manseh's collectible astrology objects, talismans and quiet adornments." />
      <main className="mx-auto max-w-[1320px] px-5 pb-24 pt-36 sm:px-8 sm:pb-36">
        <div className="border-b border-[#d8ad56]/20 pb-12">
          <p className="eyebrow reveal">A considered edit · 04 pieces</p>
          <h1 className="serif reveal reveal-delay-1 mt-5 max-w-[760px] text-[clamp(3.7rem,8vw,7.8rem)] leading-[.9] tracking-[-.04em]">YOUR COLLECTION <span className="text-[#d8ad56]">—</span><br /><em>The bag</em></h1>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-[360px] text-sm leading-6 text-[#969994]">Small editions for signs, seasons and the spaces between.</p>
            <div className="flex flex-wrap gap-5" aria-label="Filter products">
              {categories.map((category) => <button key={category} type="button" onClick={() => setFilter(category)} data-testid={`button-filter-${category.toLowerCase()}`} className={`focus-ring font-mono text-[9px] uppercase tracking-[.17em] transition ${filter === category ? 'text-[#d8ad56]' : 'text-[#737873] hover:text-[#f0ece0]'}`}>{category}</button>)}
            </div>
          </div>
        </div>
        {unavailable && <div className="mt-6"><Notice>Live collection unavailable · showing the current atelier edit</Notice></div>}
        {loading ? <div className="mt-12 grid gap-8 sm:grid-cols-2"><div className="aspect-[.82/1] animate-pulse bg-[#111b22]" /><div className="aspect-[.82/1] animate-pulse bg-[#111b22]" /></div> : visible.length ? <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-16 border border-[#d8ad56]/20 p-10 text-center"><p className="serif text-3xl">The edit is quiet for now.</p><p className="mt-3 text-sm text-[#969994]">Return with the next moon.</p></div>}
      </main>
    </PageFrame>
  );
}

export function ProductPage() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { addToBag } = useStore();
  const fallback = fallbackProducts.find((product) => String(product.id) === String(params.id)) || fallbackProducts[0];
  const [product, setProduct] = useState<StoreProduct>(fallback);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    fetchProduct(params.id).then((item) => setProduct({ ...item, image: item.image || fallback.image, description: item.description || fallback.description, zodiac: item.zodiac || fallback.zodiac })).catch(() => setUnavailable(true)).finally(() => setLoading(false));
  }, [params.id, fallback.description, fallback.image, fallback.zodiac]);
  const handleAdd = () => {
    addToBag(product);
    setAdded(true);
    void postCart([{ productId: product.id, quantity: 1 }]).catch(() => setUnavailable(true));
  };
  return (
    <PageFrame>
      <Meta title={product.name} description={product.description} />
      <main className="mx-auto max-w-[1320px] px-5 pb-24 pt-32 sm:px-8 sm:pb-36">
        <Link href="/shop" data-testid="link-back-shop" className="focus-ring line-link eyebrow !text-[#969994]">← The collection</Link>
        {unavailable && <div className="mt-6"><Notice>Product details are from the current atelier edit · live sync unavailable</Notice></div>}
        <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_.9fr] md:gap-20">
          <div className="relative aspect-[.9/1] overflow-hidden bg-[#111b22]">{loading && <div className="absolute inset-0 z-10 animate-pulse bg-[#17232a]" />}<img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-85" /></div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{product.category || 'OBJECTS'} · {product.zodiac}</p>
            <h1 className="serif mt-5 text-5xl leading-[.97] text-[#f0ece0] sm:text-7xl">{product.name}</h1>
            <p className="mt-6 font-mono text-sm text-[#d8ad56]">${product.price}</p>
            <p className="mt-8 max-w-[410px] text-sm leading-7 text-[#9b9d98]">{product.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button type="button" onClick={handleAdd} data-testid="button-add-product" className="focus-ring inline-flex items-center gap-4 bg-[#f0ece0] px-6 py-4 font-mono text-[10px] uppercase tracking-[.17em] text-[#080e14] transition hover:bg-[#d8ad56]">{added ? <Check size={15} /> : <Plus size={15} />} {added ? 'Added to bag' : 'Add to bag'}</button>
              <button type="button" onClick={() => setLocation('/kundli')} data-testid="button-find-your-object" className="focus-ring border-b border-[#d8ad56]/50 px-2 font-mono text-[10px] uppercase tracking-[.17em] text-[#d8ad56]">Find your object</button>
            </div>
            <div className="mt-16 grid max-w-[420px] grid-cols-2 border-y border-[#d8ad56]/20 py-5 font-mono text-[9px] uppercase tracking-[.13em] text-[#777c77]"><span>Edition 01 / 26</span><span className="text-right">Ships worldwide</span></div>
          </div>
        </div>
      </main>
    </PageFrame>
  );
}

export function CartPage() {
  const { bag, bagCount, bagTotal, updateQuantity, removeFromBag } = useStore();
  const [syncError, setSyncError] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const submitCheckout = () => {
    setCheckout(true);
    void postCart(bag.map((item) => ({ productId: item.id, quantity: item.quantity }))).catch(() => setSyncError(true)).finally(() => setCheckout(false));
  };
  return (
    <PageFrame>
      <Meta title="Your bag" description="Review your Manseh collection and continue to checkout." />
      <main className="mx-auto max-w-[1120px] px-5 pb-24 pt-36 sm:px-8 sm:pb-36">
        <div className="flex items-end justify-between border-b border-[#d8ad56]/20 pb-8"><div><p className="eyebrow">A quiet inventory</p><h1 className="serif mt-4 text-6xl text-[#f0ece0]">The bag</h1></div><span className="font-mono text-xs text-[#d8ad56]">{bagCount.toString().padStart(2, '0')} pieces</span></div>
        {syncError && <div className="mt-6"><Notice>Checkout sync unavailable · your bag remains saved in this browser</Notice></div>}
        {!bag.length ? <div className="flex min-h-[390px] flex-col items-center justify-center border-b border-[#d8ad56]/20 text-center"><Sparkles size={22} strokeWidth={1} className="mb-6 text-[#d8ad56]" /><p className="serif text-3xl">Nothing has found you yet.</p><p className="mt-3 text-sm text-[#90948f]">The collection is waiting.</p><div className="mt-8"><ButtonLink href="/shop" testId="button-return-to-shop">Enter the collection</ButtonLink></div></div> : <div className="grid gap-14 pt-10 md:grid-cols-[1.4fr_.6fr] md:gap-20"><div className="space-y-7">{bag.map((item) => <div key={item.id} data-testid={`row-cart-${item.id}`} className="grid grid-cols-[92px_1fr_auto] gap-4 border-b border-[#d8ad56]/20 pb-7 sm:grid-cols-[120px_1fr_auto]"><img src={item.image} alt="" className="aspect-[.8/1] w-full object-cover opacity-80" /><div><Link href={`/product/${item.id}`} data-testid={`link-cart-product-${item.id}`} className="focus-ring serif text-2xl text-[#f0ece0]">{item.name}</Link><p className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#7e837e]">${item.price}</p><div className="mt-6 flex items-center gap-4"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} data-testid={`button-decrease-${item.id}`} className="focus-ring text-[#d8ad56]"><Minus size={14} /></button><span className="font-mono text-xs">{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} data-testid={`button-increase-${item.id}`} className="focus-ring text-[#d8ad56]"><Plus size={14} /></button></div></div><div className="flex flex-col items-end justify-between"><span className="font-mono text-xs text-[#d8ad56]">${item.price * item.quantity}</span><button type="button" onClick={() => removeFromBag(item.id)} data-testid={`button-remove-${item.id}`} aria-label={`Remove ${item.name}`} className="focus-ring text-[#676d68] transition hover:text-[#e0bb6b]"><Trash2 size={15} strokeWidth={1.2} /></button></div></div>)}</div><aside className="h-fit border-t border-[#d8ad56]/30 pt-5"><div className="flex justify-between font-mono text-xs uppercase tracking-[.12em]"><span className="text-[#8b908a]">Subtotal</span><span className="text-[#f0ece0]">${bagTotal}</span></div><p className="mt-5 text-xs leading-5 text-[#777c78]">Shipping and final ritual fees are calculated at checkout.</p><button type="button" onClick={submitCheckout} disabled={checkout} data-testid="button-checkout" className="focus-ring mt-8 flex w-full items-center justify-center gap-3 bg-[#f0ece0] px-5 py-4 font-mono text-[10px] uppercase tracking-[.17em] text-[#080e14] transition hover:bg-[#d8ad56] disabled:cursor-wait disabled:opacity-60">{checkout ? 'Opening checkout…' : 'Continue to checkout'}<ArrowRight size={15} /></button></aside></div>}
      </main>
    </PageFrame>
  );
}

export function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError(false);
    const data = new FormData(event.currentTarget);
    void postLogin({ email: String(data.get('email')), password: String(data.get('password')) })
      .then(() => setSubmitted(true))
      .catch(() => setError(true))
      .finally(() => setSending(false));
  };
  return <PageFrame><Meta title="Sign in" description="Sign in to your private Manseh account." /><main className="mx-auto flex min-h-[760px] max-w-[1320px] items-center justify-center px-5 pb-24 pt-32 sm:px-8"><div className="w-full max-w-[430px]"><p className="eyebrow">A private room</p><h1 className="serif mt-5 text-6xl leading-none text-[#f0ece0]">Welcome<br /><em className="text-[#d8ad56]">back.</em></h1><p className="mt-7 text-sm leading-6 text-[#929690]">Keep your saved objects and chart close.</p><form onSubmit={submit} className="mt-12 space-y-8"><Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required data-testid="input-login-email" /><Field label="Password" name="password" type="password" autoComplete="current-password" placeholder="Your private word" required data-testid="input-login-password" /><button type="submit" disabled={sending} data-testid="button-login-submit" className="focus-ring mt-3 flex w-full items-center justify-center gap-3 bg-[#f0ece0] px-5 py-4 font-mono text-[10px] uppercase tracking-[.17em] text-[#080e14] transition hover:bg-[#d8ad56] disabled:cursor-wait disabled:opacity-60">{sending ? 'Entering the room…' : submitted ? 'Signed in' : 'Sign in'}<ArrowRight size={14} /></button></form>{error && <div className="mt-5"><Notice>Sign in unavailable · please check your details and try again</Notice></div>}{submitted && !error && <p role="status" data-testid="status-login" className="mt-5 border border-[#d8ad56]/25 px-4 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#d8ad56]">Your private room is open.</p>}<p className="mt-8 text-center font-mono text-[9px] uppercase tracking-[.14em] text-[#6f756f]">No account? Your first object makes one.</p></div></main></PageFrame>;
}

export function KundliPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    const data = new FormData(event.currentTarget);
    void postKundli({ name: String(data.get('name')), email: String(data.get('email')), birthDate: String(data.get('birthDate')), birthTime: String(data.get('birthTime')), birthPlace: String(data.get('birthPlace')) }).then(() => setSubmitted(true)).catch(() => setError(true)).finally(() => setSending(false));
  };
  return <PageFrame><Meta title="Your kundli" description="Begin your Manseh birth-chart reading." /><main className="mx-auto max-w-[1320px] px-5 pb-24 pt-36 sm:px-8 sm:pb-36"><div className="grid gap-16 md:grid-cols-[.85fr_1.15fr] md:gap-24"><div><p className="eyebrow">A personal constellation</p><h1 className="serif mt-5 max-w-[560px] text-[clamp(4rem,8vw,7rem)] leading-[.9] text-[#f0ece0]">Read the sky you <em className="text-[#d8ad56]">arrived under.</em></h1><p className="mt-8 max-w-[360px] text-sm leading-7 text-[#969a94]">Your kundli is a map of the moment you entered the world. Share the details below and we’ll prepare the first reading.</p><div className="mt-12 hidden border-t border-[#d8ad56]/20 pt-5 md:block"><span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#747a75]">The ritual takes 02 minutes</span></div></div><div className="border-t border-[#d8ad56]/25 pt-7"><p className="eyebrow mb-9">Begin with your details</p>{submitted ? <div className="flex min-h-[450px] flex-col justify-center"><Check size={23} className="text-[#d8ad56]" /><h2 className="serif mt-6 text-4xl text-[#f0ece0]">Your sky is on its way.</h2><p className="mt-4 max-w-[350px] text-sm leading-6 text-[#929791]">We’ll send your private reading to the email you gave us.</p><Link href="/shop" data-testid="link-kundli-shop" className="focus-ring line-link eyebrow mt-10 w-fit !text-[#d8ad56]">Continue to the objects →</Link></div> : <form onSubmit={submit} className="space-y-8"><Field label="Name" name="name" placeholder="What should we call you?" required data-testid="input-kundli-name" /><Field label="Email" name="email" type="email" placeholder="Where should the reading find you?" required data-testid="input-kundli-email" /><div className="grid gap-8 sm:grid-cols-2"><Field label="Date of birth" name="birthDate" type="date" required data-testid="input-kundli-date" /><Field label="Time of birth" name="birthTime" type="time" required data-testid="input-kundli-time" /></div><Field label="Place of birth" name="birthPlace" placeholder="City, country" required data-testid="input-kundli-place" /><button type="submit" disabled={sending} data-testid="button-kundli-submit" className="focus-ring mt-4 flex w-full items-center justify-center gap-3 bg-[#f0ece0] px-5 py-4 font-mono text-[10px] uppercase tracking-[.17em] text-[#080e14] transition hover:bg-[#d8ad56] disabled:opacity-60">{sending ? 'Reading the sky…' : 'Begin my reading'}<ArrowRight size={14} /></button>{error && <Notice>Reading service unavailable · please try again in a moment</Notice>}</form>}</div></div></main></PageFrame>;
}