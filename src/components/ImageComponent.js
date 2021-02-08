import React from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";

const ImageComponent = ({
  width,
  text,
  textColor,
  img,
  btnText,
  btns,
  secondBtn,
  link,
  secondLink,
}) => {
  return (
    <ImageComponentStyles
      style={{
        backgroundImage: `url(${img})`,
        width: `${width}`,
      }}
    >
      <span style={{ color: `${textColor}` }}>{text}</span>
      {btns ? (
        <div className="buttons">
          <Link to={link} className="link">
            <button className="button-white">{btnText}</button>
          </Link>
          <Link to={secondLink} className="link">
            <button className="button-white">{secondBtn}</button>
          </Link>
        </div>
      ) : (
        <Link to={link} className="link">
          <button className="button-white">{btnText}</button>
        </Link>
      )}
    </ImageComponentStyles>
  );
};

const ImageComponentStyles = styled.div`
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  height: 40rem;
  @media screen and (max-width: 1000px) {
    height: 20rem;
    margin: 0.2rem;
  }
  span {
    font-size: 4rem;
    padding: 2rem 0rem;
    text-transform: upperCase;
    font-weight: bold;
    @media screen and (max-width: 1000px) {
      font-size: 1.5rem;
    }
  }
  button {
    width: fit-content;
    margin: 0rem 1rem;
    @media screen and (max-width: 1000px) {
      margin: 0rem 0.5rem;
    }
  }
`;

export default ImageComponent;
