import { Order, OrderStatus, Product, Collection } from "./types/entities";
import { ModelType } from "./types/form";
import { API_URL } from "./const";

let cachedData: { products: Product[]; collections: Collection[] } = {
  products: [],
  collections: [],
};
let lastFetched = 0;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function serverFetch(
  input: string,
  init: RequestInit = {},
): Promise<Response> {
  const { next, redirect, headers, cache, body, ...restInit } = init as any;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Detect FormData correctly
  const isFormData = body instanceof FormData;

  const defaultHeaders: HeadersInit = isFormData
    ? {
        ...(headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // ❌ DO NOT manually set Content-Type for FormData
      }
    : {
        "Content-Type": "application/json",
        ...(headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

  return fetch(`${API_URL}${input}`, {
    ...restInit,
    headers: defaultHeaders,
    body,
    credentials: "include",
    cache: cache || "no-store",
  });
}

export async function deleteModel(model: ModelType, id: number): Promise<void> {
  const response = await serverFetch(`/auth/${model}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("❌ Failed to delete model");
    throw new Error(err?.error || "Failed to delete model");
  }
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await serverFetch(`/auth/image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("❌ Failed to upload image");
    throw new Error(err?.error || "Failed to upload image");
  }

  const data = await response.json();
  return data.url as string;
}

export async function submitModel(
  model: ModelType,
  idOrAdd: string,
  body: any,
): Promise<Response> {
  const response = await serverFetch(`/auth/${model}/${idOrAdd}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("❌ Failed to submit model");
    throw new Error(err?.error || "Failed to submit model");
  }

  return response;
}

export async function submitOrder(order: Order): Promise<Response> {
  const response = await serverFetch(`/checkout`, {
    method: "POST",
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("❌ Failed to submit order");
    throw new Error(err?.error || "Failed to submit order");
  }

  return response;
}
export async function getOrders() {
  const response = await serverFetch(`/auth/orders`);

  if (!response.ok) {
    console.error("❌ Failed to fetch orders");
    throw new Error("Failed to fetch orders from API");
  }

  return response.json();
}
export async function getOrderById(id: number) {
  const res = await serverFetch(`/auth/order/${id}`);

  if (!res.ok) {
    console.error("❌ Failed to fetch order");
    return null;
  }

  return res.json();
}

export async function updateOrderStatus(
  id: number,
  status: OrderStatus,
): Promise<Order> {
  const res = await serverFetch(`/auth/order/status`, {
    method: "POST",
    body: JSON.stringify({ id, status }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("❌ Failed to update order status");
    throw new Error(err?.error || "שגיאה בעדכון הסטטוס");
  }

  return res.json();
}

export async function loginUser(
  username: string,
  password: string,
): Promise<{ token: string }> {
  const response = await serverFetch(`/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("❌ Failed to login");
    throw new Error(err?.error || "Login failed");
  }

  return response.json(); // <- returns { token }
}

async function fetchData(force = false) {
  const now = Date.now();

  if (!force && cachedData && now - lastFetched < CACHE_DURATION) {
    console.log("✅ Using cachedData");
    return cachedData;
  }

  console.log("🌐 Fetching fresh data from server...");
  const response = await serverFetch(`/data`);

  if (!response.ok) {
    console.error("❌ Failed to fetch data");
    throw new Error("Failed to fetch data from API");
  }

  const data = await response.json();
  cachedData = data;
  lastFetched = now;

  return data;
}

export async function getProducts(force = false): Promise<Product[]> {
  const { products } = await fetchData(force);
  return products;
}

export async function getCollections(force = false): Promise<Collection[]> {
  const { collections } = await fetchData(force);
  return collections;
}
export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  const collections = await getCollections();
  return collections.find((collection) => collection.handle === handle);
}

export async function getCollectionProducts({
  collection,
}: {
  collection: string;
}): Promise<Product[]> {
  const products: Product[] = await getProducts();
  return products.filter(
    (product: Product) => product.collection === collection,
  );
}
