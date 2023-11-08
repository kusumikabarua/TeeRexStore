import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { CircularProgress, Grid } from "@mui/material";
import ProductCard from "../Card/ProductCard";
import Search from "../Search/SearchProducts";
import { fetchCatalogue } from "../../api/api";
import { ProductFilter } from "../Filter/ProductFilter";
import Navbar from "../Navbar/Navbar";
import { useSnackbar } from "notistack";
import { ADD_TO_CART_WARNING, WARNING_MSG, CART_PRODUCTS_LOCAL_STORAGE,
  PRODUCTS_LOCAL_STORAGE } from "../../constants/constants";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import {getTotalCartQuantity} from "../../utils/utils"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getAllProducts();
    let totalQuantity = getTotalCartQuantity();
    setTotalCartQuantity(totalQuantity);
  }, []);

  const addToCart = (products, id) => {

    let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    let item = products.find((item) => item.id === id);
    let cartItem = cartProducts.find((item) => item.id === id);
    
    if (cartProducts.length !== 0 && cartItem) {
      enqueueSnackbar(ADD_TO_CART_WARNING, {
        variant: WARNING_MSG,
      });
    } else {
      item.quantity = 1;
      cartProducts.push(item);
      localStorage.setItem(CART_PRODUCTS_LOCAL_STORAGE, JSON.stringify(cartProducts));
      let totalQuantity = getTotalCartQuantity();
      setTotalCartQuantity(totalQuantity);
    }
  };
  const getAllProducts = async () => {
    try {
      const data = await fetchCatalogue();
      localStorage.setItem(PRODUCTS_LOCAL_STORAGE, JSON.stringify(data));
      setProducts(data);
      setFilteredProducts(data);
      setSearchedProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar quantity={totalCartQuantity}/>
      <div className={styles.border}>
        <div className={styles.header}>
          <Search
            products={products}
            setSearchedProducts={setSearchedProducts}
            setFilteredProducts={setFilteredProducts}
          />
          <IconButton
            aria-label="filter"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => {
              setDisplayFilter(!displayFilter);
            }}
          >
            <FilterAltIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: !displayFilter
                ? { xs: "none", md: "block" }
                : { xs: "block", md: "block" },
            }}
            className={styles.border}
          >
            <ProductFilter
              products={products}
              searchedProducts={searchedProducts}
              setFilteredProducts={setFilteredProducts}
              filteredProducts={filteredProducts}
            />
          </Grid>
          <Grid item xs={12} md={9} className={styles.border}>
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
                          addToCart(products, item.id);
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


