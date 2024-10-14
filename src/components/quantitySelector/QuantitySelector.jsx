import { Button, Flex, Text } from "@radix-ui/themes";
import { useCart } from "../../hooks/useCart";


const QuantitySelector = ({ product }) => {
  const { getItem, addToCart, removeFromCart } = useCart();

  const cartItem = getItem(product);
  if (!cartItem)
    return <Button onClick={() => addToCart(product)}>Add to Cart</Button>;

  return (
    <Flex gap="3" align="center" role="spinbutton">
      <Button onClick={() => removeFromCart(product)}>-</Button>
      <Text role="status">{cartItem.quantity}</Text>
      <Button onClick={() => addToCart(product)}>+</Button>
    </Flex>
  );
};

export default QuantitySelector;
