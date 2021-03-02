import React from "react";
//styled
import styled from "styled-components";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SortPrice = ({ sort, handleSort }) => {
  return (
    <SortPriceComponent>
      <FormControl>
        <InputLabel className="sort-label">Sort price</InputLabel>
        <Select value={sort} onChange={handleSort} className="sort-select">
          <MenuItem value="asc">Sort price low to high</MenuItem>
          <MenuItem value="desc">Sort price high to low</MenuItem>
        </Select>
      </FormControl>
    </SortPriceComponent>
  );
};

const SortPriceComponent = styled.div``;

export default SortPrice;
