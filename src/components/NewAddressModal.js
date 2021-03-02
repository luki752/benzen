import React, { useState } from "react";
//styling
import styled from "styled-components";
//axios
import axios from "axios";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//material ui
import TextField from "@material-ui/core/TextField";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseIcon from "@material-ui/icons/Close";

const NewAddressModal = ({
  addAddressModal,
  modalHandler,
  setAddAddressModal,
  appLink,
}) => {
  //state
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newHouseNr, setNewHouseNr] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  //handlers
  const addAddressHandler = () => {
    if (
      newName !== "" &&
      newSurname !== "" &&
      newPhone !== "" &&
      newPhone.length >= 9 &&
      newCity !== "" &&
      newStreet !== "" &&
      newHouseNr !== "" &&
      newPostalCode !== ""
    ) {
      axios
        .put(`${appLink}/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          addresses: [
            ...user.addresses,
            {
              name: newName,
              surname: newSurname,
              phone: newPhone,
              houseNr: newHouseNr,
              street: newStreet,
              city: newCity,
              postalCode: newPostalCode,
              id: user.addresses.length !== 0 ? user.addresses.length + 1 : 1,
            },
          ],
        })
        .then((resp) => {
          dispatch(loginAction(localStorage.getItem("userId")));
          modalHandler();
        })
        .catch((error) => {});
    } else {
      alert("inputs cant be empty");
    }
  };
  return (
    <AddressComponent style={{ display: addAddressModal ? "block" : "none" }}>
      <div className="new-address">
        <div className="header">
          <span onClick={() => modalHandler()}>
            {" "}
            <ArrowBackIosIcon />
            Go back
          </span>
          <CloseIcon
            className="close-modal"
            onClick={() => setAddAddressModal(!addAddressModal)}
          />
        </div>
        <div className="inputs">
          <TextField
            value={newName}
            label="Name"
            onChange={(e) => setNewName(e.target.value)}
            className="input"
          />
          <TextField
            value={newSurname}
            label="Surname"
            onChange={(e) => setNewSurname(e.target.value)}
            className="input"
          />
          <TextField
            value={newStreet}
            label="Street"
            onChange={(e) => setNewStreet(e.target.value)}
            className="input"
          />
          <TextField
            value={newHouseNr}
            label="House Nr"
            onChange={(e) => setNewHouseNr(e.target.value)}
            className="input"
          />
          <div className="two-inputs">
            <TextField
              value={newPostalCode}
              label="Postal Code"
              onChange={(e) => setNewPostalCode(e.target.value)}
              className="postal input"
            />
            <TextField
              value={newCity}
              label="City"
              onChange={(e) => setNewCity(e.target.value)}
              className="input"
            />
          </div>
          <TextField
            value={newPhone}
            label="Phone"
            onChange={(e) => setNewPhone(e.target.value)}
            className="input"
          />
        </div>
        <div className="button-black" onClick={() => addAddressHandler()}>
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
  .new-address {
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

export default NewAddressModal;
