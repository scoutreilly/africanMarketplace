import React, { useContext, useEffect } from "react";

import ItemContext from "../context/itemContext";
import Item from "./item";

import StyledLink from "./StyledComponents/LinkStyled";

// creating list of products from item.js
const ItemList = () => {
  const { items, getData, getSaleData, getLocationData, locations, tempItem } =
    useContext(ItemContext);

  useEffect(() => {
    getData();
    getSaleData();
  }, []);

  console.log(items);
  console.log(tempItem);

  //looping through items to generate list
  return (
    <>
      <StyledLink to="/addItem">Add Listing</StyledLink>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </>
  );
};

export default ItemList;
