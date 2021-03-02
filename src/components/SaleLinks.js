import React, { useEffect, useState } from "react";
//styled
import styled from "styled-components";
//axios
import axios from "axios";
//location
import { Link } from "react-router-dom";
//material ui
import AccordionDetails from "@material-ui/core/AccordionDetails";

const SaleLinks = ({ gender, category, hamburger, setNavOpen, navOpen }) => {
  //state
  const [itemsList, setItemList] = useState([]);
  //useEffect
  useEffect(() => {
    axios
      .get(`https://benzen-server.herokuapp.com/${gender}?discount=true`)
      .then((res) => setItemList([...new Set(res.data.map((a) => a.item))]));
  }, [gender]);
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
    if (hamburger) {
      setNavOpen(!navOpen);
    }
  };
  return (
    <SaleLinksComponent>
      {hamburger ? (
        <>
          {itemsList.map((item) => (
            <Link to={`/sale/${gender}/${item}`} className="link" key={item}>
              <AccordionDetails
                onClick={() => linkHandler()}
                style={{ color: "red" }}
              >
                {item}
              </AccordionDetails>
            </Link>
          ))}
        </>
      ) : (
        <ul
          style={{
            fontSize: category ? "1.5rem" : "0.8rem",
            fontWeight: category ? "normal" : "bold",
            letterSpacing: category ? "2px" : "0px",
          }}
        >
          {itemsList.map((item) => (
            <Link
              to={`/sale/${gender}/${item}`}
              className="link"
              key={item}
              onClick={() => linkHandler()}
            >
              <li
                className={category === item ? "active-list" : ""}
                style={{ color: category ? "black" : "red" }}
              >
                {item}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </SaleLinksComponent>
  );
};

const SaleLinksComponent = styled.div`
  ul {
    list-style: none;
    padding: 0rem;
    li {
      padding: 0.4rem 0rem;
      &:hover {
        text-decoration: underline;
      }
    }
    .active-list {
      font-weight: bold;
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
`;

export default SaleLinks;
