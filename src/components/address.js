import React, { useState } from "react";
//styling
import styled from "styled-components";
//material ui
import Checkbox from "@material-ui/core/Checkbox";
//axios
import axios from "axios";
//redux
import { useSelector } from "react-redux";

const Address = ({
  name,
  surname,
  street,
  houseNr,
  postalCode,
  city,
  id,
  phone,
}) => {
  //state
  const [address, setAddress] = useState(id === 1 ? true : false);
  const { user } = useSelector((state) => state.login);
  //handlers
  const deleteAddressHandler = (id) => {
    axios
      .post(`http://localhost:3000/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
        address: user.address.filter((info) => info.id !== id),
        orders: user.orders,
      })
      .then((resp) => {
        alert("Address deleted successfully");
      })
      .catch((error) => {});
  };
  const checkboxHandler = (e) => {
    setAddress(e.target.checked);
  };
  return (
    <AddressComponent>
      <Checkbox checked={address} onChange={checkboxHandler} color="dark" />
      <div className="address-info">
        <span>
          {name} {surname}
        </span>
        <span>
          {street} {houseNr}
        </span>
        <span>
          {postalCode} {city}
        </span>
        <span> Tel. {phone}</span>
        <p onClick={() => deleteAddressHandler(id)}>Delete address</p>
      </div>
    </AddressComponent>
  );
};

const AddressComponent = styled.div`
  display: flex;
  font-size: 0.8rem;
  .address-info {
    display: flex;
    flex-direction: column;
    p {
      margin: 5px 0;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default Address;
