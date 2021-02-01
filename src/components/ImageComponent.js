import React from "react";
//styling
import styled from "styled-components";

const ImageComponent = ({
  width,
  text,
  textColor,
  img,
  btnText,
  btns,
  secondBtn,
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
          <button>{btnText}</button>
          <button>{secondBtn}</button>
        </div>
      ) : (
        <button>{btnText}</button>
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
  }
`;

export default ImageComponent;
