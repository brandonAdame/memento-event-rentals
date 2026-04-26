import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Card, Spinner } from "@heroui/react";
import { useCart } from "#/context/CartContext";
import { GET_PRODUCTS_QUERY } from "#/queries/product";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { createServerFn } from "@tanstack/react-start";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

const getInventory = createServerFn()
  .inputValidator(z.object({ cursor: z.string().optional() }))
  .handler(async ({ data }) => {
    const client = createStorefrontApiClient({
      storeDomain: "dev-test-store-20210635.myshopify.com",
      apiVersion: "2026-04",
      privateAccessToken: process.env.STOREFRONT_PRIVATE_TOKEN,
    });

    const { data: gqlData } = await client.request(GET_PRODUCTS_QUERY, {
      variables: {
        first: 9,
        after: data.cursor ?? null,
      },
    });

    return gqlData;
  });

export const Route = createFileRoute("/inventory")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchInfiniteQuery({
      queryKey: ["inventory"],
      queryFn: async ({ pageParam }) =>
        getInventory({ data: { cursor: pageParam as string | undefined } }),
      initialPageParam: undefined,
    });
  },
});

function RouteComponent() {
  const { addToCart } = useCart();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["inventory"],
      queryFn: async ({ pageParam }) =>
        getInventory({ data: { cursor: pageParam as string | undefined } }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => {
        const pageInfo = lastPage?.products?.pageInfo;
        return pageInfo?.hasNextPage ? pageInfo.endCursor : undefined;
      },
      placeholderData: (previousData) => previousData,
    });

  const products =
    data?.pages.flatMap(
      (page) => page?.products?.edges.map((edge: any) => edge.node) ?? [],
    ) ?? [];

  return (
    <div className="flex flex-col items-center mt-10 gap-10">
      <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-(--sea-ink) sm:text-6xl">
        Inventory Selection
      </h1>
      <p className="text-base text-(--sea-ink-soft) sm:text-lg">
        Browse our vast selection of unique pieces. Surely, you'll find
        something you like!
      </p>
      <div className="grid grid-cols-3 gap-5">
        {/* create a 3-row grid that displays 9 items at a time */}
        {products.map((item: any, idx: number) => (
          <Card key={item?.node?.id || idx} className="min-h-125">
            <Link
              to="/products/$productHandle"
              params={{ productHandle: item?.handle || "1" }}
            >
              <img
                alt={item.images.edges[0]?.node.altText || "Product image"}
                aria-hidden="true"
                width={500}
                src={item.images.edges[0]?.node.url}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </Link>

            <Card.Header className="flex flex-col gap-3 z-10">
              <Card.Title className="text-2xl text-(--sea-ink-soft)">
                {item?.title || "Product"}
              </Card.Title>
              <Card.Description>
                {item?.totalInventory
                  ? `${item.totalInventory} in stock`
                  : "Available for rent"}
              </Card.Description>
            </Card.Header>
            <Card.Footer className="flex items-center justify-between z-10">
              <Button
                onClick={() =>
                  addToCart({
                    id: item?.id || "1",
                    name: item?.title || "Product",
                    price: 50,
                    quantity: 1,
                  })
                }
              >
                Add to cart
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
      {hasNextPage && (
        <Button
          size="lg"
          onClick={() => fetchNextPage()}
          isDisabled={isFetchingNextPage}
          isPending={isFetchingNextPage}
        >
          {({ isPending }) => (
            <>
              {isPending ? (
                <>
                  <Spinner color="current" size="md" /> Loading...
                </>
              ) : (
                "Load More"
              )}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
