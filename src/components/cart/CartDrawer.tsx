import { useCart } from "#/context/CartContext";
import { Badge, Drawer, Button, ButtonGroup, Card } from "@heroui/react";
import { ShoppingCart, Wallet, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { items, totalCount, removeFromCart, updateCartQuantity } = useCart();

  return (
    <Drawer>
      <Badge.Anchor>
        <Button variant="outline">
          <ShoppingCart />
          <Badge color="accent" size="sm">
            {totalCount}
          </Badge>
        </Button>
      </Badge.Anchor>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Cart</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {items.map((item) => (
                <div key={item.id} className="mb-4">
                  <Card>
                    <Card.Header>
                      <Card.Title>{item.name}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <p>${item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </Card.Content>
                    <Card.Footer className="flex justify-between">
                      <ButtonGroup>
                        <Button
                          isIconOnly
                          onClick={() =>
                            updateCartQuantity(item.id, 1, "subtract")
                          }
                        >
                          <Minus size={16} />
                        </Button>
                        <ButtonGroup.Separator />
                        <Button
                          onClick={() => updateCartQuantity(item.id, 1, "add")}
                        >
                          <Plus size={16} />
                        </Button>
                      </ButtonGroup>
                      <Button
                        variant="outline"
                        isIconOnly
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </Drawer.Body>
            <Drawer.Footer>
              <Button>
                <Wallet />
                Check Out
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
