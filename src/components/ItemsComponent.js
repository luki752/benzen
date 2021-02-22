import React, { useEffect, useState, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//actions
import { loadAllItems } from "../actions/itemsAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//components
import Card from "../components/Card";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import SearchIcon from "@material-ui/icons/Search";

const ItemsComponent = () => {
  //state
  const dispatch = useDispatch();
  const [gender, setGender] = useState("man");
  const [search, setSearch] = useState("");
  const [item, setItem] = useState("t-shirts");
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //useEffects
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    setMV(window.matchMedia("(min-width: 1000px)").matches);
  }, [size, mv]);
  useEffect(() => {
    dispatch(loadAllItems(gender, search, item));
  }, [dispatch, gender, item, search]);
  //handlers
  const genderHandler = (e) => {
    setGender(e.target.value);
  };
  const itemHandler = (e) => {
    setItem(e.target.value);
  };
  const { AllItems } = useSelector((state) => state.item);
  return (
    <ItemsComponentView>
      <div className="items-header">
        <div className="gender-chose">
          <FormControl>
            <InputLabel className="sort-label">Gender</InputLabel>
            <Select
              value={gender}
              onChange={genderHandler}
              className="sort-select"
            >
              <MenuItem value="man">man</MenuItem>
              <MenuItem value="woman">woman</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="items-search">
          <TextField
            label="search"
            value={search}
            className="users-input"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="items-chose">
          <FormControl>
            <InputLabel className="sort-label">Item</InputLabel>
            <Select value={item} onChange={itemHandler} className="sort-select">
              <MenuItem value="coats">coats</MenuItem>
              <MenuItem value="jackets">jackets</MenuItem>
              <MenuItem value="puffer-jackets">puffer-jackets</MenuItem>
              <MenuItem value="shirts">shirts</MenuItem>
              <MenuItem value="sweatshirts">sweatshirts</MenuItem>
              <MenuItem value="sweaters">sweaters</MenuItem>
              <MenuItem value="trousers">trousers</MenuItem>
              <MenuItem value="t-shirts">t-shirts</MenuItem>
              <MenuItem value="jeans">jeans</MenuItem>
              <MenuItem value="blazers">blazers</MenuItem>
              <MenuItem value="nightwear">nightwear</MenuItem>
              <MenuItem value="polos">polos</MenuItem>
              <MenuItem value="suits">suits</MenuItem>
              <MenuItem value="underwear">underwear</MenuItem>
              <MenuItem value="vests">vests</MenuItem>
              <MenuItem value="dresses">dresses</MenuItem>
              <MenuItem value="skirts">skirts</MenuItem>
              <MenuItem value="biker-jackets">biker-jackets</MenuItem>
              <MenuItem value="lingerie">lingerie</MenuItem>
              <MenuItem value="shoes">shoes</MenuItem>
              <MenuItem value="bags">bags</MenuItem>
              <MenuItem value="gloves">gloves</MenuItem>
              <MenuItem value="hats">hats</MenuItem>
              <MenuItem value="scarves">scarves</MenuItem>
              <MenuItem value="socks">socks</MenuItem>
              <MenuItem value="heels">heels</MenuItem>
              <MenuItem value="flats">flats</MenuItem>
              <MenuItem value="sneakers">sneakers</MenuItem>
              <MenuItem value="boots">boots</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="items-amount">{AllItems.length} Items</div>
      </div>

      <div className="items-display">
        {AllItems.map((item) => (
          <Card
            key={item.id}
            height={mv ? "30rem" : "20rem"}
            width={mv ? "23%" : "50%"}
            margin={mv ? "1.5rem 0.5rem" : "0.5rem 0"}
            id={item.id}
            gender={gender}
            category={item.category}
            item={item}
            adminPanel
          />
        ))}
      </div>
    </ItemsComponentView>
  );
};

const ItemsComponentView = styled.div`
  display: flex;
  flex-direction: column;
  .items-header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .items-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

export default ItemsComponent;
