import React from "react";
//styling
import styled from "styled-components";

const ImageComponent = ({ text, textColor, img, btnText }) => {
  console.log(textColor);
  return (
    <ImageComponentStyles style={{ backgroundImage: `url(${img})` }}>
      <span style={{ color: `${textColor}` }}>{text}</span>
      <button>{btnText}</button>
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
  height: 40rem;
  span {
    font-size: 4rem;
    padding: 2rem 0rem;
    text-transform: upperCase;
    font-weight: bold;
  }
`;

export default ImageComponent;
