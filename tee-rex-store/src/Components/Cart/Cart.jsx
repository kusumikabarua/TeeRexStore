import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box } from "@mui/material";
import styles from "./Cart.module.css"
import { useSnackbar } from "notistack";
import {MAX_QUANTITY_WARNING,WARNING_MSG,TOTAL_AMOUNT,CART_PRODUCTS_LOCAL_STORAGE,PRODUCTS_LOCAL_STORAGE,CURRENCY} from  '../../constants/constants'
import {
    AddOutlined,
    RemoveOutlined,
    ShoppingCart,
    ShoppingCartOutlined,
  } from "@mui/icons-material";
  import { Button, IconButton, Stack } from "@mui/material";


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
    const [cartItems,setCartItems] =useState([]);
    const { enqueueSnackbar } = useSnackbar();
   
    useEffect(()=>{
        let cartProducts =JSON.parse(localStorage.getItem("cartProducts") || "[]"); 
        console.log(cartProducts);
        setCartItems(cartProducts);
      },[]);

    const getTotalCartValue =(cartItems)=>{
        let total = cartItems.reduce((acc,item)=>acc +( item.quantity * item.price),0);
        //console.log(total);
    
        return  `${CURRENCY}  ${total}`;
    }
    const handleQuantity=(id,quantity)=>{
        let cartProducts =JSON.parse(localStorage.getItem("cartProducts") || "[]"); 
        let products =JSON.parse(localStorage.getItem("products") || "[]"); 
        if(quantity===0){
            cartProducts.splice(cartProducts.findIndex(item => item.id == id) , 1);
            console.log(cartProducts);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            setCartItems(cartProducts);
            return;
        }
       
        let item =products.find((item)=>item.id ==id);
        // console.log(item);
        // console.log(quantity);

        if(item.quantity>=quantity){
            let cartItem=cartProducts.find((item)=>item.id ==id);
            cartItem.quantity=quantity;
            console.log(cartProducts)
            setCartItems(cartProducts);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        }else{
            enqueueSnackbar(MAX_QUANTITY_WARNING, {
                variant:WARNING_MSG ,
              });
        }
      
    }

  return (
    <div><Navbar />{cartItems && cartItems.map((item) => {
        const {imageURL,name,price,currency,quantity,id} =item;
       
        return (
          <Box display="flex" justifyContent="center" className={styles.cart} alignItems="flex-end" >
            <Box className={styles.image_container} >
              <img
                // Add product image
                src={imageURL}
                // Add product name as alt eext
                alt={name}
                width="100%"
                height="100%"
               
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{name}</div>
               <Box padding="0.5rem" >
                  {currency}{price}
                </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ItemQuantity
                  // Add required props by checking implementation
                  //isReadOnly={isReadOnly}
                  handleAdd={(e) => {
                    handleQuantity(
                        //  localStorage.getItem("token"),
                     
                      id,
                      quantity + 1
                    );
                  }}
                  handleDelete={(e) => {
                    handleQuantity(
                    //   localStorage.getItem("token"),
                   
                      
                      id,
                      quantity - 1
                    );
                  }}
                  value={quantity}
                />
               
              </Box>
            </Box>
          </Box>
        );
      })}
      {cartItems && <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
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
        </Box>}
      </div>
  )
}

export default Cart