import React from "react";
import styles from "./Navbar.module.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
       <h1>Tee Rex Store</h1>
       <div>
       <Button variant="fill">Shopping Cart</Button>
       <IconButton  aria-label="Cart"> <ShoppingCartOutlinedIcon /></IconButton>
      </div>
      
    </nav>
  );
};

export default Navbar;
