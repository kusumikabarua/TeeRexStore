import React from "react";
import styles from "./Navbar.module.css";
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { SITE_NAME,PRODUCTS} from '../../constants/constants'
import { Link } from "react-router-dom";


const Navbar = ({quantity}) => {

  return (
    <nav className={styles.navbar}>
       <h1>{SITE_NAME}</h1>
       <div>
       <Link to="/"><Button variant="fill">{PRODUCTS}</Button></Link>
       <Link to="cart"><Badge badgeContent={quantity} color="secondary"> <ShoppingCartOutlinedIcon /></Badge></Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
