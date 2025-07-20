class LocaleCache {
  private locale: "he" | "en" = "he";
  get(): "he" | "en" {

    if (typeof document !== "undefined") {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="));
      const value = cookie?.split("=")[1];
      this.locale = value === "en" ? "en" : "he";
      return this.locale;
    }

    return this.locale;
  }

  set(locale: "he" | "en") {
    this.locale = locale;
  }

  isRtl(): boolean {
    return this.get() === "he";
  }

  dir(): "rtl" | "ltr" {
    return this.isRtl() ? "rtl" : "ltr";
  }
}

export const localeCache = new LocaleCache();
