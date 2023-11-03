import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { SEARCH_PLACEHOLDER } from "../../constants/constants";
//import styles from "./SearchProducts.module.css";

import { InputAdornment, TextField } from "@mui/material";

const SearchProducts = ({ products,setSearchedProducts,setFilteredProducts}) => {
  let [search, setSearch] = useState();
  let [debounceTimeout, setDebounceTimeout] = useState();
  const performSearch = (value) => {
    if(value.length===0){
      setSearchedProducts(products);
      setFilteredProducts(products);
    }

    let temp = products.filter(
      (item) =>
        item.color.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedProducts(temp);
    setFilteredProducts(temp);
    
  };
  const debounceSearch = (event, debounceTimeout) => {
    setSearch(event.target.value);
    clearTimeout(debounceTimeout);
    let timer = setTimeout(() => {
      performSearch(event.target.value);
    }, 1000);
    setDebounceTimeout(timer);
  };
  return (
    <TextField
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
      placeholder={SEARCH_PLACEHOLDER}
      name="search"
      value={search}
      onChange={(e) => {
        debounceSearch(e, debounceTimeout);
      }}
    />
  );
};

export default SearchProducts;
