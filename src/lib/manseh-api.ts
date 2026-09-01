export const MANSEH_API_BASE = 'https://manseh-backend-production.up.railway.app';

export type ApiProduct = {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  zodiac?: string;
  available?: boolean;
};

export type KundliPayload = {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === 'object') {
    const value = payload as Record<string, unknown>;
    if ('data' in value) return value.data as T;
    if ('result' in value) return value.result as T;
    if ('products' in value) return value.products as T;
  }
  return payload as T;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${MANSEH_API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`The atelier is unavailable (${response.status}).`);
  const text = await response.text();
  return text ? unwrap<T>(JSON.parse(text)) : (undefined as T);
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  return request<ApiProduct[]>('/products');
}

export async function fetchProduct(id: string): Promise<ApiProduct> {
  return request<ApiProduct>(`/products/${encodeURIComponent(id)}`);
}

export async function postCart(items: Array<{ productId: string | number; quantity: number }>) {
  return request<{ id?: string }>('/cart', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export async function postKundli(payload: KundliPayload) {
  return request<{ id?: string }>('/kundli', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function postLogin(payload: LoginPayload) {
  return request<{ token?: string; user?: unknown }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}