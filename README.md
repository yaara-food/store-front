# Next.js E-commerce Frontend 🛍️

A modern, accessible e-commerce storefront built with **Next.js 14**, **TypeScript**, **MUI**, and **Tailwind CSS** — styled primarily with MUI, extended with Tailwind utilities.  
Includes a full admin dashboard, product editor, and order management.

---

## 🌐 Live Preview

This project was originally built with a focus on **Hebrew (RTL)** support.  
Some design elements may appear more refined in RTL; improvements to LTR layout are ongoing.

- 🌍 RTL (Hebrew): [modern-ecommerce-store.vercel.app/he](https://modern-ecommerce-store.vercel.app/he)
- 🌐 LTR (English): [modern-ecommerce-store.vercel.app/en](https://modern-ecommerce-store.vercel.app/en)
- 🔐 Admin Panel: [modern-ecommerce-store.vercel.app/admin](https://modern-ecommerce-store.vercel.app/admin) — includes a built-in login form


---


## 🚀 Getting Started

To run the project locally:

- Install dependencies:

  ```bash
  pnpm install
  ```

- Start the development server:

  ```bash
  pnpm dev
  ```

---

### 🛠️ Environment Variables

Create a `.env` file at the root of your project:

```env
# Public site branding and metadata
NEXT_PUBLIC_SITE_NAME=YourStoreName
NEXT_PUBLIC_BASE_URL=https://your-store.vercel.app
NEXT_PUBLIC_API_URL=https://your-api.vercel.app

# Optional: Google verification & analytics & icon for SEO/social sharing
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_GOOGLE_ANALYTICS=your-google-analytics-code
NEXT_PUBLIC_ICON_IMAGE_URL=https://your-domain.com/logo.png

# Footer contact & social info (comma-separated)
NEXT_PUBLIC_FOOTER_DATA=info@example.com,123 Example St.,1234567890,instagram_handle,facebook_page,https://your-website.com

# Pre-filled WhatsApp message
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi, I came from your store website and had a question.
```

## 📁 Structure Overview

```

app/
├── admin/          → Admin panel (model-based)
├── checkout/       → Checkout flow
├── category/       → Category pages
├── product/        → Product detail pages

components/
├── admin/          → AG Grid Table, Model forms
├── cart/           → Cart modal and UI
├── checkout/       → Checkout info and summary
├── layout/         → Header, Footer
├── product/        → Product display, gallery, cards
├── shared/         → Loading, messages, accessibility

lib/
├── api/            → API helpers (catalog, orders, uploads)
├── store/          → Redux store and slices
├── types/          → Shared TypeScript types
├── assets/         → Static config like i18n messages, SEO
```

---

## 🙏 Acknowledgments

- [Vercel Commerce](https://github.com/vercel/commerce) for the initial template.

---
