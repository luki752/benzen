import React from "react";
//styling
import styled from "styled-components";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseIcon from "@material-ui/icons/Close";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//axios
import axios from "axios";
//material ui
import TextField from "@material-ui/core/TextField";

const EditAddressModal = ({
  editModal,
  setEditModal,
  name,
  surname,
  street,
  houseNr,
  postalCode,
  city,
  phone,
  setName,
  setSurname,
  setHouseNr,
  setStreet,
  setPostalCode,
  setCity,
  setPhone,
  editModalHandler,
  addressId,
  appLink,
}) => {
  //state
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  //handlers
  const editAddressHandler = (addressId) => {
    if (
      name !== "" &&
      surname !== "" &&
      phone !== "" &&
      phone.length === 9 &&
      houseNr !== "" &&
      street !== "" &&
      city !== "" &&
      postalCode !== ""
    ) {
      const newAddress = user.addresses.map((location) =>
        location.id === addressId
          ? (location = {
              name: name,
              surname: surname,
              phone: phone,
              houseNr: houseNr,
              street: street,
              city: city,
              postalCode: postalCode,
              id: addressId,
            })
          : location
      );
      axios
        .put(`${appLink}/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          addresses: newAddress,
        })
        .then((resp) => {
          dispatch(loginAction(localStorage.getItem("userId")));
          editModalHandler();
        })
        .catch((error) => {});
    } else {
      alert("inputs cant be empty");
    }
  };

  return (
    <AddressComponent style={{ display: editModal ? "block" : "none" }}>
      <div className="edit-address">
        <div className="header">
          <span onClick={() => editModalHandler()}>
            {" "}
            <ArrowBackIosIcon />
            Go back
          </span>
          <CloseIcon
            className="close-modal"
            onClick={() => setEditModal(!editModal)}
          />
        </div>
        <div className="inputs">
          <TextField
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <TextField
            value={surname}
            label="Surname"
            onChange={(e) => setSurname(e.target.value)}
            className="input"
          />
          <TextField
            value={street}
            label="Street"
            onChange={(e) => setStreet(e.target.value)}
            className="input"
          />
          <TextField
            value={houseNr}
            label="House Nr"
            onChange={(e) => setHouseNr(e.target.value)}
            className="input"
          />
          <div className="two-inputs">
            <TextField
              value={postalCode}
              label="Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
              className="postal input"
            />
            <TextField
              value={city}
              label="City"
              onChange={(e) => setCity(e.target.value)}
              className="input"
            />
          </div>
          <TextField
            value={phone}
            label="Phone"
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
        </div>
        <div
          className="button-black"
          onClick={() => editAddressHandler(addressId)}
        >
          Save
        </div>
      </div>
    </AddressComponent>
  );
};

const AddressComponent = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .edit-address {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    justify-content: center;
    padding: 1rem;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1rem;
      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 1rem;
      .input {
        width: 100%;
      }
      .two-inputs {
        width: 100%;
        display: flex;
      }
      .postal {
        margin-right: 10px;
      }
    }
    .button-black {
      width: 100%;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default EditAddressModal;
