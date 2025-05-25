export function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function filterBySearch<T extends object>(
  items: T[],
  searchValue: string,
): T[] {
  if (!searchValue) return items;

  const escaped = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  return items.filter((item) =>
    regex.test(
      Object.values(item)
        .filter((v) => typeof v === "string")
        .join(" "),
    ),
  );
}
