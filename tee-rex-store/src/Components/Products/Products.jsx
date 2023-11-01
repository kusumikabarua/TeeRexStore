import React from 'react';
import styles from './Products.module.css'

import { CircularProgress } from "@mui/material";
import Card from "../Card/Card";
import Search from "../Search/Search";


const Products = ({data}) => {
  return (
    <div> <div  className={styles.border}>
    <div className={styles.header}>
    <Search placeholder="Search a album of your choice"/>
      
    </div>
   
    {data.length === 0 ? (
      <CircularProgress />
    ) : (
      <div className={styles.cardWrapper} >
        (
          <div className={styles.wrapper}>
            {data.map((item) => {
              return <Card data={item}  />;
            })}
          </div>
        )
      </div>
    )}
  </div></div>
  )
}

export default Products;