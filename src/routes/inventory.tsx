import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Card, Modal } from "@heroui/react";
import { PackageOpen, Feather } from "lucide-react";
import { useCart } from "#/context/CartContext";
import { getProducts } from "#/queries/product";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { createServerFn } from "@tanstack/react-start";

const getInventory = createServerFn().handler(async () => {
  const client = createStorefrontApiClient({
    storeDomain: "dev-test-store-20210635.myshopify.com",
    apiVersion: "2026-04",
    privateAccessToken: process.env.STOREFRONT_PRIVATE_TOKEN,
  });

  const { data } = await client.request(getProducts, {
    variables: {
      first: 9,
    },
  });

  return data;
});

export const Route = createFileRoute("/inventory")({
  component: RouteComponent,
  loader: async () => getInventory(),
});

function RouteComponent() {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const data = Route.useLoaderData();

  const QuickViewModal = () => (
    <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <Button variant="outline" onPress={() => setIsModalOpen(true)}>
        <PackageOpen />
        Quick view
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon>
                <Feather />
              </Modal.Icon>
              <Modal.Heading>Antique Chair</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>This antique chair is the best. Come check it out.</p>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );

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
        {(data?.products?.edges || []).map((item: any, idx: number) => (
          <Card key={item?.node?.id || idx}>
            <div className="relative h-50 rounded-2xl overflow-hidden">
              <Link
                to="/products/$productHandle"
                params={{ productHandle: item?.node?.handle || "1" }}
              >
                <img
                  alt={
                    data.products.edges[idx].node.images.edges[0]?.node
                      .altText || "Product image"
                  }
                  aria-hidden="true"
                  // width={500}
                  // height={500}
                  src={data.products.edges[idx].node.images.edges[0]?.node.url}
                  className="absolute inset-0 h-full w-full object-cover"
                  // className="absolute inset-x-0 bottom-0 scale-125 object-cover object-center select-none"
                />
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3 z-10">
              <Card.Header className="flex flex-col gap-3 z-10">
                <Card.Title className="text-2xl text-(--sea-ink-soft)">
                  {item?.node?.title || "Product"}
                </Card.Title>
                <Card.Description>
                  {item?.node?.totalInventory
                    ? `${item.node.totalInventory} in stock`
                    : "Available for rent"}
                </Card.Description>
              </Card.Header>
              <Card.Footer className="flex items-center justify-between z-10">
                <Button
                  onClick={() =>
                    addToCart({
                      id: item?.node?.id || "1",
                      name: item?.node?.title || "Product",
                      price: 50,
                      quantity: 1,
                    })
                  }
                >
                  Add to cart
                </Button>
                <QuickViewModal />
              </Card.Footer>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
