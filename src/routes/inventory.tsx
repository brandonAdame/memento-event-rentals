import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Card, Modal } from "@heroui/react";
import { PackageOpen, Feather } from "lucide-react";
import FurnitureImg from "/images/antique-furniture.jpg";

export const Route = createFileRoute("/inventory")({
  component: RouteComponent,
});

function RouteComponent() {
  const openQuickViewModal = () => (
    <Modal>
      <Button variant="outline">
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
      <div className="flex space-x-5">
        {/* create a 3-row grid that displays 9 items at a time */}
        {[...Array(3)].map((_val, idx) => (
          <Card key={idx}>
            <div className="relative h-50 rounded-2xl overflow-hidden">
              <Link to="/products/$productId" params={{ productId: "1" }}>
                <img
                  alt="Antique chair"
                  aria-hidden="true"
                  src={FurnitureImg}
                  className="absolute inset-x-0 bottom-0 scale-125 object-cover object-center select-none"
                />
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Card.Header className="flex flex-col gap-3">
                <Card.Title className="text-2xl text-(--sea-ink-soft)">
                  Antique Chair
                </Card.Title>
                <Card.Description>
                  Bright and colorful chair wonderful for pictures
                </Card.Description>
              </Card.Header>
              <Card.Footer className="flex items-center justify-between">
                <Button>Add to cart</Button>
                {openQuickViewModal()}
              </Card.Footer>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
