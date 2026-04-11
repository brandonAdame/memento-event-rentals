import { createFileRoute } from "@tanstack/react-router";
import FurnitureImg from "/images/antique-furniture.jpg";
import OldChair from "/images/chair-unsplash.jpg";
import UrbanVintage from "/images/urban-vintage-unsplash.jpg";
import UrbanVintage2 from "/images/urban-vintage2-unsplash.jpg";
import { Accordion, Button } from "@heroui/react";
import { Select } from "@mantine/core";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";

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

const inventory = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
];

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const [numberOfItems, setNumberOfItems] = useState<number | null>(1);

  return (
    <div className="flex flex-col items-center gap-10 mt-10 page-wrap">
      <h1 className="text-6xl display-title">1940s Antique Chair</h1>
      <div className="grid grid-cols-2 min-h-screen">
        {/* Scrollable photos section */}
        <div className="flex flex-col space-y-5">
          <img
            alt="Antique chair"
            aria-hidden="true"
            src={FurnitureImg}
            className=""
          />
          <img
            alt="Antique chair"
            aria-hidden="true"
            src={OldChair}
            className=""
          />
          <img
            alt="Antique chair"
            aria-hidden="true"
            src={UrbanVintage}
            className=""
          />
          <img
            alt="Antique chair"
            aria-hidden="true"
            src={UrbanVintage2}
            className=""
          />
        </div>

        {/* Product description */}
        <div className="ml-32 flex flex-col gap-10 lg:max-w-140 sticky top-20 h-[calc(100vh-4rem)] z-40">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-xl">Overview</h3>
            <span>$50</span>
            <span className="underline">12 ratings</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-2xl">Description</h3>
            <span>
              Rent our Victorian-era antique chair for weddings, photo shoots,
              and special events in the Raleigh-Durham and surrounding areas.
              Featuring ornate carved details and original upholstery, this
              one-of-a-kind piece adds instant elegance to any setting.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select
              data={inventory}
              value={numberOfItems}
              onChange={(val) => setNumberOfItems(val)}
              className="w-16"
              aria-label="Select quantity"
              allowDeselect={false}
            />

            {/* Right segment: Add to Cart */}
            <Button>
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
