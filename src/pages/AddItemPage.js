import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//redux
import { useSelector } from "react-redux";
//material ui
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
//icons
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
//link
import { Link } from "react-router-dom";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch } from "react-redux";

const AddItemPage = () => {
  //state
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState(false);
  const [price, setPrice] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [description, setDescription] = useState("");
  const { user, isLogged } = useSelector((state) => state.login);
  //materials
  const [materials, setMaterials] = useState([]);
  const [materialFabric, setMaterialFabric] = useState("");
  const [materialPercentage, setMaterialPercentage] = useState("");
  const [lastMaterialId, setLastMaterialId] = useState(0);
  //images
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [lastImageId, setLastImageId] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  const axios = require("axios");
  const materialHandler = () => {
    if (materialFabric !== "" && materialPercentage !== "") {
      materials.push({
        id: lastMaterialId,
        fabric: materialFabric,
        percentage: materialPercentage,
      });
      setMaterials(materials);
      setLastMaterialId(lastMaterialId + 1);
      setMaterialFabric("");
      setMaterialPercentage("");
    } else {
      alert("inputs cant be empty");
    }
  };
  const imagesHandler = () => {
    if (imageUrl !== "") {
      images.push({
        id: lastImageId,
        img: imageUrl,
      });
      setImages(images);
      setLastImageId(lastImageId + 1);
      setImageUrl("");
    } else {
      alert("inputs cant be empty");
    }
  };
  const itemHandler = () => {
    if (
      gender !== "" &&
      category !== "" &&
      name !== "" &&
      item !== "" &&
      amount !== "" &&
      price !== "" &&
      materials.length !== 0 &&
      images.length !== 0
    ) {
      axios
        .post(`https://benzen-server.herokuapp.com/${gender}`, {
          name: name,
          item: item,
          amount: amount,
          category: category,
          discount: discount,
          beforeDiscount: parseFloat(priceBeforeDiscount),
          price: parseFloat(price),
          desc: description,
          material: [...materials],
          images: [...images],
        })
        .then((resp) => {
          alert("Item added successfully");
          setGender("");
          setName("");
          setItem("");
          setAmount("");
          setCategory("");
          setDescription("");
          setDiscount(false);
          setPriceBeforeDiscount("");
          setPrice("");
          setMaterials([]);
          setImages([]);
          dispatch(loginAction(localStorage.getItem("userId")));
          window.scrollTo(0, 0);
        })
        .catch((error) => {});
    } else {
      alert("Inputs cant be empty");
    }
  };
  return (
    <AddItemPageComponent>
      <Link to="/admin/panel/orders">
        <button className="button-black">
          <ArrowLeftIcon />
          Go back to admins panel
        </button>
      </Link>
      {isLogged && user.email === "admin@admin.com" && (
        <div className="inputs">
          <div className="two-inputs">
            <div className="option">
              Items Gender:
              <FormControl>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select"
                >
                  <MenuItem value="man">man</MenuItem>
                  <MenuItem value="woman">woman</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="option">
              Items Category:
              <FormControl>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select"
                >
                  <MenuItem value="clothes">clothes</MenuItem>
                  <MenuItem value="accessories">accessories</MenuItem>
                  {gender === "woman" && (
                    <MenuItem value="shoes">shoes</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="two-inputs">
            {gender === "woman" && category === "shoes" && (
              <div className="option">
                item:{" "}
                <FormControl>
                  <Select
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="select"
                  >
                    <MenuItem value="heels">heels</MenuItem>
                    <MenuItem value="flats">flats</MenuItem>
                    <MenuItem value="sneakers">sneakers</MenuItem>
                    <MenuItem value="boots">boots</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            {category === "accessories" && (
              <div className="option">
                item:{" "}
                <FormControl>
                  <Select
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="select"
                  >
                    <MenuItem value="bags">bags</MenuItem>
                    <MenuItem value="gloves">gloves</MenuItem>
                    <MenuItem value="hats">hats</MenuItem>
                    <MenuItem value="scarves">scarves</MenuItem>
                    <MenuItem value="socks">socks</MenuItem>
                    {gender === "man" && (
                      <MenuItem value="shoes">shoes</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            )}
            {category === "clothes" && (
              <div className="option">
                item:{" "}
                <FormControl>
                  <Select
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="select"
                  >
                    <MenuItem value="coats">coats</MenuItem>
                    <MenuItem value="jackets">jackets</MenuItem>
                    <MenuItem value="puffer-jackets">puffer-jackets</MenuItem>
                    <MenuItem value="shirts">shirts</MenuItem>
                    <MenuItem value="sweatshirts">sweatshirts</MenuItem>
                    <MenuItem value="sweaters">sweaters</MenuItem>
                    <MenuItem value="trousers">trousers</MenuItem>
                    <MenuItem value="t-shirts">t-shirts</MenuItem>
                    <MenuItem value="jeans">jeans</MenuItem>
                    <MenuItem value="blazers">blazers</MenuItem>
                    <MenuItem value="nightwear">nightwear</MenuItem>
                    <MenuItem value="polos">polos</MenuItem>
                    <MenuItem value="suits">suits</MenuItem>
                    <MenuItem value="underwear">underwear</MenuItem>
                    <MenuItem value="vests">vests</MenuItem>
                    <MenuItem value="dresses">dresses</MenuItem>
                    <MenuItem value="skirts">skirts</MenuItem>
                    <MenuItem value="biker-jackets">biker-jackets</MenuItem>
                    <MenuItem value="lingerie">lingerie</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}

            <div className="option">
              Name:{" "}
              <TextField
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="two-inputs">
            <div className="option">
              discount:
              <FormControl>
                <Select
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="select"
                >
                  <MenuItem value="false">false</MenuItem>
                  <MenuItem value="true">true</MenuItem>
                </Select>
              </FormControl>
            </div>
            {discount === "true" && (
              <div className="option">
                Price before discount:{" "}
                <TextField
                  className="input"
                  type="number"
                  value={priceBeforeDiscount}
                  onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="two-inputs">
            <div className="option">
              price:{" "}
              <TextField
                className="input"
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="option">
              amount:{" "}
              <TextField
                className="input"
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="option">
            description:{" "}
            <TextField
              className="description-input"
              value={description}
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="option">
            materials:
            <div className="materials-add">
              Name:
              <TextField
                className="input"
                value={materialFabric}
                onChange={(e) => setMaterialFabric(e.target.value)}
              />
              Percentage:
              <TextField
                className="input"
                type="number"
                min="1"
                max="100"
                value={materialPercentage}
                onChange={(e) => setMaterialPercentage(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? materialHandler() : "")}
              />
              <button
                className="button-white"
                onClick={() => materialHandler()}
              >
                Add Material
              </button>
            </div>
            {materials.map((material) => (
              <div className="material" key={material.name}>
                <span>
                  {" "}
                  Fabric:{material.fabric}, Percentage:{material.percentage}
                </span>
                <span
                  className="remove-material"
                  onClick={() =>
                    setMaterials(
                      materials.filter(
                        (deleteMaterial) => deleteMaterial.id !== material.id
                      )
                    )
                  }
                >
                  remove
                </span>
              </div>
            ))}
          </div>
          <div className="option">
            Images:
            <div className="image-add">
              Url:
              <TextField
                className="input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? imagesHandler() : "")}
              />
              <button className="button-white" onClick={() => imagesHandler()}>
                Add Image
              </button>
            </div>
            <div className="images-display">
              {images.map((image) => (
                <div className="image" key={image.url}>
                  <span>{image.img}</span>
                  <span
                    className="image-remove"
                    onClick={() =>
                      setImages(
                        images.filter(
                          (deleteImage) => deleteImage.id !== image.id
                        )
                      )
                    }
                  >
                    remove
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="button-black" onClick={() => itemHandler()}>
        Add Item
      </button>
    </AddItemPageComponent>
  );
};

const AddItemPageComponent = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: Center;
  align-items: center;
  flex-direction: column;
  .button-black {
    width: 27rem;
    height: 3rem;
    background-color: black;
    color: white;
    margin: 1rem 0;
    @media screen and (max-width: 1000px) {
      font-size: 1rem;
      width: 100%;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  .two-inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }
  }
  .option {
    font-size: 2rem;
    margin: 1rem 0rem;
    font-weight: bold;
    @media screen and (max-width: 1000px) {
      font-size: 1rem;
    }
    &:first-letter {
      text-transform: upperCase;
    }
    .select {
      width: 10rem;
      margin: 0rem 1rem;
    }
    .description-input {
      width: 100%;
    }
    .material {
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      font-weight: normal;
      margin: 1rem 0rem;
      padding: 1rem;
      border: 1px solid black;
      .remove-material {
        &:hover {
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
    .materials-add {
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1rem 0rem;
      padding: 1rem;
      border: 1px solid black;
      @media screen and (max-width: 1000px) {
        font-size: 1rem;
      }
      button {
        font-size: 1rem;
        width: fit-content;
        margin-top: 0.5rem;
      }
    }
    .image-add {
      display: flex;
      flex-direction: column;
      margin: 1rem 0rem;
      padding: 1rem;
      border: 1px solid black;
      button {
        font-size: 1rem;
        width: fit-content;
        margin-top: 0.5rem;
      }
    }
    .images-display {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .image {
      display: flex;
      width: 100%;
      justify-content: space-between;
      font-size: 1rem;
      font-weight: normal;
      margin: 1rem 0rem;
      padding: 1rem;
      border: 1px solid black;
      .image-remove {
        padding: 0rem 1rem;
        &:hover {
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
  }
`;

export default AddItemPage;
