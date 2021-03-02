import React, { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//location
import { useLocation } from "react-router-dom";
//action
import { loadSale } from "../actions/itemsAction";
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//components
import Card from "../components/Card";
import SimpleClothesHeader from "../components/SimpleClothesHeader";
import SaleLinks from "../components/SaleLinks";

const SalePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const gender = location.pathname.split("/")[2];
  const category = location.pathname.split("/")[3];
  const { sale } = useSelector((state) => state.sale);
  //useEffects
  useEffect(() => {
    dispatch(loadSale(gender, category, sort));
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch, gender, category, sort]);
  return (
    <>
      {sale && (
        <SalePageComponent>
          <div className="left-side">
            <SaleLinks gender={gender} category={category} />
          </div>
          <div className="right-side">
            <div className="items-header">
              <SimpleClothesHeader
                sort={sort}
                setSort={setSort}
                length={sale.length}
              />
            </div>
            <div className="items-display">
              {sale.map((item) => (
                <Card
                  key={item.id}
                  lgHeight={"30rem"}
                  smHeight={"20rem"}
                  smWidth={"48%"}
                  lgWidth={"24%"}
                  lgMargin={"1rem 0.3rem"}
                  smMargin={"0.5rem 0.1px"}
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
  }
  .right-side {
    width: 80%;
    margin-left: 20%;
    .items-display {
      display: flex;
      flex-wrap: wrap;
      @media screen and (max-width: 1000px) {
        align-items: Center;
      }
    }
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0;
    }
  }
`;
export default SalePage;
