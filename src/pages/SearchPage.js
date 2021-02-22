import React, { useState, useEffect, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//react
import { useSelector } from "react-redux";
//
import { useLocation } from "react-router-dom";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//components
import Card from "../components/Card";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch } from "react-redux";

const SearchPage = () => {
  //state
  const { answer } = useSelector((state) => state.item);
  const [sort, setSort] = useState("");
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const gender = location.pathname.split("/")[2];
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
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  return (
    <SearchPageComponent>
      <div className="header">
        <div className="sort">
          <FormControl>
            <InputLabel className="sort-label">Sort by price</InputLabel>
            <Select value={sort} onChange={handleSort} className="sort-select">
              <MenuItem value="asc">Sort price low to high</MenuItem>
              <MenuItem value="desc">Sort price high to low </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="list-length">{answer.length} results</div>
      </div>
      <div className="items-display">
        {answer
          .sort((a, b) => {
            if (sort === "asc") {
              return a.price - b.price;
            } else if (sort === "desc") {
              return b.price - a.price;
            }
            return "";
          })
          .map((item) => (
            <Card
              key={item.id}
              height={mv ? "30rem" : "20rem"}
              width={mv ? "23%" : "50%"}
              margin={mv ? "1.5rem 0.5rem" : "0.5rem 0"}
              id={item.id}
              gender={gender}
              category={item.category}
              item={item}
            />
          ))}
      </div>
      {answer.length === 0 && (
        <div className="no-match-found">No results found</div>
      )}
    </SearchPageComponent>
  );
};

const SearchPageComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  margin-top: 2rem;
  .header {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: Center;
    .sort-select {
      width: 15rem;
    }
  }
  .items-display {
    width: 80%;
    display: Flex;
    justify-content:space-evenly;
    flex-wrap: wrap;
    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }
  .no-match-found {
    display: flex;
    justify-content: center;
    align-items: Center;
    font-size: 2rem;
  }
`;

export default SearchPage;
