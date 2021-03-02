import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//react
import { useSelector } from "react-redux";
//location
import { useLocation } from "react-router-dom";
//components
import SimpleClothesHeader from "../components/SimpleClothesHeader";
import Card from "../components/Card";
//actions
import { loginAction } from "../actions/loginAction";
import {
  loadSearched,
  changeSearchLimit,
  loadAllSearched,
} from "../actions/itemsAction";
//redux
import { useDispatch } from "react-redux";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";

const SearchPage = () => {
  //state
  const [sort, setSort] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const gender = location.pathname.split("/")[2];
  const { question, searchLimit } = useSelector((state) => state.item);
  //useEffects
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  //dispatch data
  useEffect(() => {
    if (question !== "") {
      dispatch(loadSearched(gender, question, sort, searchLimit));
      dispatch(loadAllSearched(gender, question));
    }
  }, [dispatch, gender, searchLimit, question, sort]);
  //get data back
  const { answer, allAnswers } = useSelector((state) => state.item);
  //handlers
  const handleLimit = () => {
    dispatch(changeSearchLimit(20));
  };
  return (
    <SearchPageComponent>
      <BottomScrollListener onBottom={handleLimit} offset={700} />
      {question !== "" && <h1>Results for {question}</h1>}
      <SimpleClothesHeader
        sort={sort}
        setSort={setSort}
        length={allAnswers.length}
      />
      <div className="items-display">
        {answer.map((item) => (
          <Card
            key={item.id}
            lgHeight={"25rem"}
            smHeight={"18rem"}
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
  h1 {
    font-size: 1rem;
  }
  .items-display {
    width: 80%;
    display: Flex;
    justify-content: space-evenly;
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
