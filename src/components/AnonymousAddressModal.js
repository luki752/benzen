import React from "react";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
//icons
import CloseIcon from "@material-ui/icons/Close";

const AnonymousAddressModal = ({
  name,
  surname,
  street,
  houseNr,
  postalCode,
  city,
  email,
  phone,
  setName,
  setSurname,
  setHouseNr,
  setStreet,
  setPostalCode,
  setCity,
  setPhone,
  setAnonymousModal,
  anonymousModal,
  setEmail,
  setChosenAddress,
}) => {
  //setting address
  const anonymousAddressHandler = () => {
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
      setAnonymousModal(!anonymousModal);
      setName(name);
      setSurname(surname);
      setCity(city);
      setPostalCode(postalCode);
      setStreet(street);
      setPhone(phone);
      setHouseNr(houseNr);
      setChosenAddress(true);
    }
  };
  return (
    <AddressComponent style={{ display: anonymousModal ? "block" : "none" }}>
      <div className="anonymous-address">
        <div className="header">
          <span>Add</span>
          <CloseIcon
            className="close-modal"
            onClick={() => setAnonymousModal(!anonymousModal)}
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
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="button-black" onClick={() => anonymousAddressHandler()}>
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
  .anonymous-address {
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

export default AnonymousAddressModal;
