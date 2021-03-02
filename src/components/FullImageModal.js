import React from "react";
//styled
import styled from "styled-components";
//icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const FullImageModal = ({
  setCurrentIndex,
  currentIndex,
  item,
  modal,
  setModal,
}) => {
  //state
  return (
    <ModalComponent style={{ display: modal ? "flex" : "none" }}>
      <CloseIcon className="close-modal" onClick={() => setModal(!modal)} />
      <ArrowBackIosIcon
        className="arrows left-arrow"
        onClick={() =>
          currentIndex - 1 === -1
            ? setCurrentIndex(item.images.length - 1)
            : setCurrentIndex((currentIndex - 1) % item.images.length)
        }
      />
      {item.images && (
        <img src={item.images[currentIndex].img} alt={item.name} />
      )}
      <ArrowForwardIosIcon
        className="arrows right-arrow"
        onClick={() => setCurrentIndex((currentIndex + 1) % item.images.length)}
      />
    </ModalComponent>
  );
};

const ModalComponent = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  img {
    width: 80%;
    z-index: 4;
  }
  .close-modal {
    position: fixed;
    right: 0;
    top: 0;
    margin: 1rem;
    font-size: 2rem;
    font-size: 3rem;
    &:hover {
      cursor: pointer;
    }
  }
  .arrows {
    position: fixed;
    margin-top: 25%;
    font-size: 3rem;
    &:hover {
      cursor: pointer;
    }
  }
  .left-arrow {
    left: 0;
    margin-left: 2rem;
  }
  .right-arrow {
    right: 0;
    margin-right: 2rem;
  }
`;

export default FullImageModal;
