import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loginAction } from "../actions/loginAction";

const AddressModal = ({
  addressModal,
  setModal,
  modalHandler,
  editModalHandler,
  name,
  surname,
  phone,
  city,
  street,
  houseNr,
  postalCode,
  setStreet,
  setName,
  setSurname,
  setCity,
  setPostalCode,
  setPhone,
  setHouseNr,
  setAddressId,
  setChosenAddress,
  addressId,
}) => {
  //state
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);

  const { user, isLogged } = useSelector((state) => state.login);
  //handlers
  const chooseButton = () => {
    if (
      name !== "" &&
      surname !== "" &&
      phone !== "" &&
      phone.length >= 9 &&
      city !== "" &&
      street !== "" &&
      houseNr !== "" &&
      postalCode !== ""
    ) {
      setChosenAddress(true);
      setModal(false);
    }
  };
  const addressChooseHandler = (
    id,
    name,
    surname,
    city,
    postalCode,
    street,
    phone,
    houseNr
  ) => {
    setName(name);
    setSurname(surname);
    setCity(city);
    setPostalCode(postalCode);
    setStreet(street);
    setPhone(phone);
    setHouseNr(houseNr);
    setAddressId(id);
  };
  return (
    <AddressModalComponent style={{ display: addressModal ? "block" : "none" }}>
      <div className="address-info">
        <div className="address-header">
          <span>Delivery address</span>
          <CloseIcon
            className="close-modal"
            onClick={() => setModal(!addressModal)}
          />
        </div>
        {isLogged && (
          <>
            {user.addresses.map((address, index) => (
              <div
                key={address.id}
                className={
                  index + 1 === addressId
                    ? "single-address active-address"
                    : "single-address"
                }
                onClick={() =>
                  addressChooseHandler(
                    address.id,
                    address.name,
                    address.surname,
                    address.city,
                    address.postalCode,
                    address.street,
                    address.phone,
                    address.houseNr
                  )
                }
              >
                <div className="checkbox"></div>
                <div className="address-data">
                  <span>
                    {address.name} {address.surname}
                  </span>
                  <span>
                    {address.street} {address.houseNr}, {address.postalCode}{" "}
                    {address.city}
                  </span>
                  <span>{address.phone}</span>
                  <p onClick={() => editModalHandler()}>Edit</p>
                </div>
              </div>
            ))}
            <div className="button-add-address" onClick={() => modalHandler()}>
              <AddCircleOutlineIcon /> Add new address
            </div>
            <div className="choose-button">
              <button className="button-black" onClick={() => chooseButton()}>
                Choose
              </button>
            </div>
          </>
        )}
      </div>
    </AddressModalComponent>
  );
};

const AddressModalComponent = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .address-info {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0;
    }
    .address-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      .close-modal {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .active-address {
      .checkbox {
        background-color: black;
      }
    }
    .single-address {
      display: flex;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.4);
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.8);
        cursor: pointer;
      }
      .checkbox {
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: 2rem;
        height: 2rem;
        border-radius: 2rem;
        margin: 0 1rem;
        @media screen and (max-width: 1000px) {
          width: 1rem;
          height: 1rem;
          border-radius: 1rem;
          margin: 0 0.5rem;
        }
      }
      .address-data {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        p {
          margin: 10px 0;
          font-weight: bold;
        }
      }
    }
    .button-add-address {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      &:hover {
        cursor: pointer;
      }
    }
    .choose-button {
      width: 100%;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .button-black {
        width: 100%;
        margin: 1rem;
        padding: 1rem;
      }
    }
  }
`;

export default AddressModal;
