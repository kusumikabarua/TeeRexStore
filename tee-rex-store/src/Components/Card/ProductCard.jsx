import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import styles from  "./ProductCard.module.css";
import {ADD_TO_CART} from "../../constants/constants"

const ProductCard = ({ product, handleAddToCart=null }) => {
 const {imageURL,name,price,currency} =product;
  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={imageURL}
      />
      <CardContent>       
        <Typography>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
        {currency} {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  variant="contained" startIcon={<AddShoppingCartOutlined />}
        onClick ={handleAddToCart}>{ADD_TO_CART}</Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;