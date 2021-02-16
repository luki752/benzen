// import React, { useState, useEffect } from "react";
// //styling
// import styled from "styled-components";
// //material ui
// import Checkbox from "@material-ui/core/Checkbox";
// //redux
// import { useSelector, useDispatch } from "react-redux";
// //actions
// import { loginAction } from "../actions/loginAction";

// const Address = ({
//   name,
//   surname,
//   street,
//   houseNr,
//   postalCode,
//   city,
//   id,
//   phone,
//   setNewAddressCheckbox,
//   setUsersAddressName,
//   setUsersAddressSurname,
//   setUsersCity,
//   setUsersPhone,
//   setUsersHouseNr,
//   setUsersStreet,
//   setUsersPostalCode,
//   addressIndex,
//   setAction,
//   setAddressId,
// }) => {
//   //state
//   const dispatch = useDispatch();
//   const [address, setAddress] = useState(id === 1 ? true : false);
//   const { user } = useSelector((state) => state.login);
//   const checkboxHandler = (e) => {
//     setAddress(e);
//     if (address === false) {
//     }
//   };
//   useEffect(() => {
//     if (addressIndex + 1 === id) {
//       setAddress(true);
//     } else {
//       setAddress(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [checkboxHandler]);
//   const axios = require("axios");
//   //handlers

//   return <AddressComponent></AddressComponent>;
// };

// const AddressComponent = styled.div``;

// export default Address;
