import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//material ui
import Checkbox from "@material-ui/core/Checkbox";
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
  setNewAddressCheckbox,
  setUsersAddressName,
  setUsersAddressSurname,
  setUsersCity,
  setUsersPhone,
  setUsersHouseNr,
  setUsersStreet,
  setUsersPostalCode,
  usersAddressName,
  usersAddressSurname,
  usersCity,
  usersPhone,
  usersStreet,
  usersPostalCode,
  setAction,
  setAddressId,
}) => {
  //state
  const [address, setAddress] = useState(id === 1 ? true : false);
  const { user } = useSelector((state) => state.login);
  const checkboxHandler = (e) => {
    setAddress(e);
    if (address === false) {
      setUsersAddressName(name);
      setUsersAddressSurname(surname);
      setUsersCity(city);
      setUsersPhone(phone);
      setUsersHouseNr(houseNr);
      setUsersStreet(street);
      setUsersPostalCode(postalCode);
      setAction("change");
      setAddressId(id);
      setNewAddressCheckbox(false);
    }
  };
  useEffect(() => {
    if (
      usersCity === city &&
      usersAddressName === name &&
      usersAddressSurname === surname &&
      usersPhone === phone &&
      usersStreet === street &&
      usersPostalCode === postalCode
    ) {
      setAddress(true);
    } else {
      setAddress(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxHandler]);
  const axios = require("axios");
  //handlers
  const deleteAddressHandler = (id) => {
    axios
      .put(`http://localhost:3000/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
        addresses: user.addresses.filter((info) => info.id !== id),
        orders: user.orders,
        isLogged: user.isLogged,
      })
      .then((resp) => {
        window.location.reload();
        alert("Address deleted successfully");
      })
      .catch((error) => {});
  };

  return (
    <AddressComponent>
      <Checkbox
        checked={address}
        onChange={(e) => checkboxHandler(e.target.checked)}
        color="primary"
      />
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
