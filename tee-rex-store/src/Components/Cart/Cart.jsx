import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/material";
import styles from "./Cart.module.css";
import { useSnackbar } from "notistack";
import {
  MAX_QUANTITY_WARNING,
  WARNING_MSG,
  TOTAL_AMOUNT,
  CART_PRODUCTS_LOCAL_STORAGE,
  PRODUCTS_LOCAL_STORAGE,
  CURRENCY,
  CART_EMPTY,
} from "../../constants/constants";
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { getTotalCartQuantity } from "../../utils/utils";

const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>

      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>

      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  useEffect(() => {
    let cartProducts = JSON.parse(
      localStorage.getItem(CART_PRODUCTS_LOCAL_STORAGE) || "[]"
    );
    let totalQuantity = getTotalCartQuantity();
    setTotalCartQuantity(totalQuantity);
    setCartItems(cartProducts);
  }, []);

  const getTotalCartValue = (cartItems) => {
    let total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    return `${CURRENCY}  ${total}`;
  };
  const handleQuantity = (id, quantity) => {
    let cartProducts = JSON.parse(
      localStorage.getItem(CART_PRODUCTS_LOCAL_STORAGE) || "[]"
    );
    let products = JSON.parse(
      localStorage.getItem(PRODUCTS_LOCAL_STORAGE) || "[]"
    );
    if (quantity === 0) {
      cartProducts.splice(
        cartProducts.findIndex((item) => item.id === id),
        1
      );

      localStorage.setItem(
        CART_PRODUCTS_LOCAL_STORAGE,
        JSON.stringify(cartProducts)
      );
      setCartItems(cartProducts);
      let totalQuantity = getTotalCartQuantity();
      setTotalCartQuantity(totalQuantity);
      return;
    }

    let item = products.find((item) => item.id === id);

    if (item.quantity >= quantity) {
      let cartItem = cartProducts.find((item) => item.id === id);
      cartItem.quantity = quantity;
      setCartItems(cartProducts);
      localStorage.setItem(
        CART_PRODUCTS_LOCAL_STORAGE,
        JSON.stringify(cartProducts)
      );
      let totalQuantity = getTotalCartQuantity();
      setTotalCartQuantity(totalQuantity);
    } else {
      enqueueSnackbar(MAX_QUANTITY_WARNING, {
        variant: WARNING_MSG,
      });
    }
  };

  return (
    <div>
      <Navbar quantity={totalCartQuantity} />
      {cartItems.length !== 0 &&
        cartItems.map((item) => {
          const { imageURL, name, price, currency, quantity, id } = item;

          return (
            <Box
              display="flex"
              justifyContent="center"
              className={styles.cart}
              alignItems="flex-end"
            >
              <Box className={styles.image_container}>
                <img src={imageURL} alt={name} width="100%" height="100%" />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{name}</div>
                <Box padding="0.5rem">
                  {currency} {price}
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    handleAdd={(e) => {
                      handleQuantity(id, quantity + 1);
                    }}
                    handleDelete={(e) => {
                      handleQuantity(id, quantity - 1);
                    }}
                    value={quantity}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      {cartItems.length !== 0 ? (
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ borderTop: 1 }}
        >
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
          >
            {TOTAL_AMOUNT}
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            {getTotalCartValue(cartItems)}
          </Box>
        </Box>
      ) : (
        <Box className={styles.empty}>
          <ShoppingCartOutlined className={styles.empty_cart_icon} />
          <Box color="#aaa" textAlign="center">
            {CART_EMPTY}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Cart;
