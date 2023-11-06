import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { CircularProgress, Grid } from "@mui/material";
import ProductCard from "../Card/ProductCard";
import Search from "../Search/SearchProducts";
import { fetchCatalogue } from "../../api/api";
import { ProductFilter } from "../Filter/ProductFilter";
import Navbar from '../Navbar/Navbar';
import { useSnackbar } from "notistack";
import { ADD_TO_CART_WARNING,WARNING_MSG } from '../../constants/constants'

const Products = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  //const [cartProducts, setCartProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(()=>{
    getAllProducts();
   
  },[]);

  const addToCart=(products,id)=>{
      // console.log(`products ${products}`);
      // console.log(`cartProducts ${cartProducts}`);
      // console.log(`id ${id}`);
      let cartProducts =JSON.parse(localStorage.getItem("cartProducts") || "[]"); 
     
      
      let item =products.find((item)=>item.id ===id);
      let cartItem=cartProducts.find((item)=>item.id ==id);
      //console.log(cartItem);
      if(cartProducts.length !== 0 && cartItem){
        enqueueSnackbar(ADD_TO_CART_WARNING, {
          variant:WARNING_MSG ,
        });
      }else{  
        item.quantity=1;
        cartProducts.push(item)
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      }
      console.log(cartProducts);
  }
  const getAllProducts = async () => {
    try {
      const data = await fetchCatalogue();
      localStorage.setItem("products", JSON.stringify(data));
      setProducts(data);
      setFilteredProducts(data);
      setSearchedProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div>
       <Navbar />
      <div className={styles.border}>
        <div className={styles.header}>
          <Search products ={products} setSearchedProducts ={setSearchedProducts} setFilteredProducts={setFilteredProducts} />
        </div>
        <Grid container>
        <Grid item xs={12} md={3} className={styles.border}><ProductFilter products={products} searchedProducts={searchedProducts} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts}/></Grid>
        <Grid item xs={12} md={9}  className={styles.border}>
      
        {filteredProducts.length === 0 ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} marginX={1} marginY={1}>
            {filteredProducts.map((item) => {
              return (
                <Grid item key={item.id} xs={6} md={3}>
                  <ProductCard
                    product={item}
                    handleAddToCart={() => {
                      addToCart(   
                        products,
                        item.id,                    
                      )
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
