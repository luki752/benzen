import React, { useEffect, useRef } from "react";
//styling
import styled from "styled-components";

const SmallImage = ({ setCurrentIndex, index, img, currentIndex }) => {
  const imageRef = useRef();
  useEffect(() => {
    if (currentIndex === index) {
      imageRef.current.scrollIntoView(false);
    }
  }, [currentIndex, index]);
  return (
    <Image>
      <img
        src={img.img}
        alt={index}
        ref={imageRef}
        onClick={(e) => {
          setCurrentIndex(index);
          e.target.scrollIntoView(false);
        }}
        className={index === currentIndex ? "active-image" : ""}
      />
    </Image>
  );
};

const Image = styled.div`
  img {
    height: 18vh;
    width: 100%;
    margin-bottom: 8px;
    border-bottom: 2px solid white;
    &:hover {
      cursor: pointer;
    }
  }
  .active-image {
    filter: grayscale(100%);
    border-bottom: 2px solid black;
  }
`;

export default SmallImage;
