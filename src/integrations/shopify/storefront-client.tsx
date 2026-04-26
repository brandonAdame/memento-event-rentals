import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const storefrontClient = createStorefrontApiClient({
  storeDomain: "dev-test-store-20210635.myshopify.com",
  apiVersion: "2026-04",
  publicAccessToken: import.meta.env.VITE_STOREFRONT_API_PUBLIC_TOKEN,
});
