import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { CircularProgress, Grid } from "@mui/material";
import ProductCard from "../Card/ProductCard";
import Search from "../Search/SearchProducts";
import { fetchCatalogue } from "../../api/api";
import { ProductFilter } from "../Filter/ProductFilter";

const Products = () => {

  const [products, setProducts] = useState([]);
  useEffect(()=>{
    getAllProducts();
  },[])
  const getAllProducts = async () => {
    try {
      const data = await fetchCatalogue();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  //const [cartProducts, setCartProducts] = useState([]);
  return (
    <div>
      <div className={styles.border}>
        <div className={styles.header}>
          <Search />
        </div>
        <Grid container>
        <Grid item xs={12} md={3}><ProductFilter products={products}/></Grid>
        <Grid item xs={12} md={9}>
      
        {products.length === 0 ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} marginX={1} marginY={1}>
            {products.map((item) => {
              return (
                <Grid item key={item.id} xs={6} md={3}>
                  <ProductCard
                    product={item}
                    handleAddToCart={() => {
                      // addToCart(
                      //   cartProducts,
                      //   products,
                      //   item.id
                      // )
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
        </Grid>
       
       </Grid>
 
      </div>
    </div>
  );
};

export default Products;
