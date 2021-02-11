import React, { useEffect, useState, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//location
import { useLocation, Link } from "react-router-dom";
//action
import { loadSale } from "../actions/itemsAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//components
import Card from "../components/Card";
//axios
import axios from "axios";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SalePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const gender = location.pathname.split("/")[2];
  const category = location.pathname.split("/")[3];
  const { sale } = useSelector((state) => state.sale);
  const [itemsList, setItemList] = useState([]);
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
    dispatch(loadSale(gender, category, sort));
  }, [dispatch, gender, category, sort]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/${gender}?discount=true`)
      .then((res) => setItemList([...new Set(res.data.map((a) => a.item))]));
  }, [dispatch, gender]);
  //handlers
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <>
      {sale && (
        <SalePageComponent>
          <div className="left-side">
            <ul>
              {itemsList.map((item) => (
                <Link
                  to={`/sale/${gender}/${item}`}
                  className="link"
                  key={item}
                >
                  <li className={category === item ? "active-list" : ""}>
                    {item}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="right-side">
            <div className="items-header">
              <div className="sort">
                <FormControl>
                  <InputLabel className="sort-label">Sort price </InputLabel>
                  <Select
                    value={sort}
                    onChange={handleSort}
                    className="sort-select"
                  >
                    <MenuItem value="asc">Sort price low to high</MenuItem>
                    <MenuItem value="desc">Sort price high to low</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="items-amount">
                {sale.length} {sale.length === 1 ? "Product" : "Products"}
              </div>
            </div>
            <div className="items-display">
              {sale.map((item) => (
                <Card
                  key={item.id}
                  height={mv ? "30rem" : "20rem"}
                  width={mv ? "25%" : "50%"}
                  margin={mv ? "1.5rem 0" : "0.5rem 0"}
                  id={item.id}
                  gender={gender}
                  category={item.category}
                  item={item}
                />
              ))}
            </div>
          </div>
        </SalePageComponent>
      )}
    </>
  );
};

const SalePageComponent = styled.div`
  display: flex;
  margin-top: 2rem;
  .left-side {
    width: 20%;
    position: Fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      list-style: none;
      font-size: 1.5rem;
      letter-spacing: 2px;
      li {
        margin: 5px 0;
        &:hover {
          text-decoration: underline;
        }
      }
      .active-list {
        font-weight: bold;
      }
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .right-side {
    width: 80%;
    margin-left: 20%;
    .items-header {
      display: flex;
      justify-content: space-between;
      align-items: Center;
      .sort-select {
        width: 15rem;
        margin-left: 5px;
      }
      .items-amount {
        margin-right: 4rem;
        @media screen and (max-width: 1000px) {
          margin-right: 0rem;
        }
      }
    }
    .items-display {
      display: flex;
      flex-wrap: wrap;
      @media screen and (max-width: 1000px) {
        align-items: Center;
      }
    }
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
`;
export default SalePage;
