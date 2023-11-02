import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import {
  genderConst,
  priceRangeConst,
  TITLE_COLOR,
  TITLE_GENDER,
  TITLE_PRICE,
  TITLE_TYPE,
  UPTO_250,
  FROM_251_TO_450,
  ABOVE_450,
} from "../../constants/constants";
import Checkbox from "@mui/material/Checkbox";

const Filter = ({ title, data, filter, setFilter }) => {
  const handleSendSelection = (event) => {
    const value = event.target.value,
      checked = event.target.checked;
    let temp = new Set(filter);
    if (checked) {
      temp.add(value);
    } else {
      temp.delete(value);
    }
    setFilter([...temp]);
  };
  return (
    <div>
      <h3>{title}</h3>
      <FormGroup>
        {data.map((item) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  value={item}
                  onClick={(event) => handleSendSelection(event)}
                />
              }
              label={item}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};

export const ProductFilter = ({
  products,
  setFilteredProducts,
  filteredProducts,
}) => {
  const color = [...new Set(products.map((item) => item.color))];
  const gender = [...genderConst];
  const priceRange = [...priceRangeConst];
  const type = [...new Set(products.map((item) => item.type))];
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredGender, setFilteredGender] = useState([]);
  const [filteredPrice, setFilteredPrice] = useState([]);
  const [filteredType, setFilteredType] = useState([]);

  const checkInRange = (filteredPrice, price) => {
    for (let index = 0; index < filteredPrice.length; index++) {
      switch (filteredPrice[index]) {
        case UPTO_250:
          if (price < 251) {
            return true;
          }
          break;
        case FROM_251_TO_450:
          if (price > 250 && price < 451) {
            return true;
          }
          break;
        case ABOVE_450:
          if (price > 450) {
            return true;
          }
          break;
        default:
      }
    }
    return false;
  };
  const applyFilter = () => {
    let temp = products.filter(
      (item) =>
             filteredColors.length === 0 || filteredColors.includes(item.color)
    );
    let temp1 = temp.filter(
      (item) =>
        filteredGender.length === 0 || filteredGender.includes(item.gender)
    );
    let temp2 = temp1.filter(
      (item) =>
        filteredPrice.length === 0 || checkInRange(filteredPrice, item.price)
    );
    let temp3 = temp2.filter(
      (item) => filteredType.length === 0 || filteredType.includes(item.type)
    );
    // console.log(temp);
    // console.log(temp1);
    // console.log(temp2);
    // console.log(temp3);
    setFilteredProducts(temp3);
  };
  return (
    <div>
      <Filter
        title={TITLE_COLOR}
        data={color}
        filter={filteredColors}
        setFilter={setFilteredColors}
      />
      <Filter
        title={TITLE_GENDER}
        data={gender}
        filter={filteredGender}
        setFilter={setFilteredGender}
      />
      <Filter
        title={TITLE_PRICE}
        data={priceRange}
        filter={filteredPrice}
        setFilter={setFilteredPrice}
      />
      <Filter
        title={TITLE_TYPE}
        data={type}
        filter={filteredType}
        setFilter={setFilteredType}
      />
      <Button onClick={applyFilter}>Apply Filter</Button>
    </div>
  );
};
