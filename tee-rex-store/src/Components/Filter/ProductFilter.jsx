import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {genderConst,priceRangeConst} from '../../constants/constants'


const Filter =({title,data}) =>{

}

export const ProductFilter = ({products}) => {
    const color= [...new Set(products.map((item) => item.color))]; 
    const  gender =[...gender]
   
    
  return (
    <div>
        <FormGroup></FormGroup>
    </div>
  )
}
