import { createFileRoute } from "@tanstack/react-router";
import { Accordion, Button } from "@heroui/react";
import { Select } from "@mantine/core";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "#/context/CartContext";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { productQuery } from "#/queries/product";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";

const items = [
  {
    content:
      "Dropoff and pickup fees are set for a 15 mile radius from our warehouse. Dropping off & picking up the item further than the 15 mile radius will incure a $15 charge for every 10mi traveled.",
    title: "Do you offer dropoff & pickup?",
  },
  {
    content:
      "We offer dropoff times from 9am-6pm. Dropoff times can be coordinated before checkout.",
    title: "What are your dropoff times?",
  },
  {
    content:
      "Yes! Let us know where you want your items and we'll handle it from there.",
    title: "Do you offer setup?",
  },
];

const getProduct = createServerFn()
  .inputValidator(z.object({ productHandle: z.string() }))
  .handler<Promise<Product>>(async ({ data: { productHandle } }) => {
    const client = createStorefrontApiClient({
      storeDomain: "dev-test-store-20210635.myshopify.com",
      apiVersion: "2026-04",
      privateAccessToken: process.env.STOREFRONT_PRIVATE_TOKEN,
    });

    const { data: productData } = await client.request(productQuery, {
      variables: {
        handle: productHandle,
      },
    });

    return productData.product;
  });

export const Route = createFileRoute("/products/$productHandle")({
  component: RouteComponent,
  loader: async ({ params: { productHandle } }) =>
    getProduct({ data: { productHandle } }),
});

function RouteComponent() {
  const { addToCart } = useCart();
  const [numberOfItems, setNumberOfItems] = useState<number | null>(1);
  const productData = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center gap-10 mt-10 page-wrap">
      <h1 className="text-6xl display-title">{productData.title}</h1>
      <div className="grid grid-cols-2 min-h-screen">
        {/* Scrollable photos section */}
        {(productData.images.edges || []).length > 0 && (
          <div className="flex flex-col space-y-5">
            {productData.images.edges.map((edge) => (
              <img
                key={edge.node.id}
                src={edge.node.url}
                alt={edge.node.altText ?? "Product image"}
              />
            ))}
          </div>
        )}

        {/* Product description */}
        <div className="ml-32 flex flex-col gap-10 lg:max-w-140 sticky top-20 h-[calc(100vh-4rem)] z-40">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-xl">Overview</h3>
            <span>
              ${productData.variants.nodes[0]?.price.amount}{" "}
              {productData.variants.nodes[0]?.price.currencyCode}
            </span>
            <span className="underline">12 ratings</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-2xl">Description</h3>
            <span>{productData.description}</span>
          </div>

          <div className="flex items-center gap-4">
            <Select
              data={[...Array(productData.totalInventory).keys()].map(
                (num) => ({
                  label: String(num + 1),
                  value: num + 1,
                }),
              )}
              value={numberOfItems}
              onChange={(val) => setNumberOfItems(val)}
              className="w-16"
              aria-label="Select quantity"
              allowDeselect={false}
            />

            {/* Right segment: Add to Cart */}
            <Button
              onClick={() =>
                addToCart({
                  id: productData.id,
                  name: productData.title,
                  price: Number(productData.variants.nodes[0]?.price.amount),
                  quantity: numberOfItems || 1,
                })
              }
            >
              <ShoppingCart size={16} />
              Add to cart
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">FAQ</h3>
            <Accordion className="w-full">
              {items.map((item, index) => (
                <Accordion.Item key={index}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      {item.title}
                      <Accordion.Indicator>
                        <ChevronDown />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>{item.content}</Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
