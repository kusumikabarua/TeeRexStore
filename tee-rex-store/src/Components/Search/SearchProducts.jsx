import React,{  useState } from "react";
import { Search } from "@mui/icons-material";
//import styles from "./SearchProducts.module.css";


import { 
  InputAdornment,
  TextField,
} from "@mui/material";


const SearchProducts = ({placeholder}) => {
  let [search, setSearch] = useState();
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
          placeholder="Search for products"
          name="search"
          value={search}
          onChange={(e) => {
            // debounceSearch(e, debounceTimeout);
          }}
        />
   
  );
};

export default SearchProducts;
