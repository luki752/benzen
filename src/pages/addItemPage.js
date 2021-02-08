import React, { useState } from "react";
//styling
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
//axios
import { axios } from "axios";
//material ui
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

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
  const { user } = useSelector((state) => state.login);
  //materials
  const [materials, setMaterials] = useState([]);
  const [materialFabric, setMaterialFabric] = useState("");
  const [materialPercentage, setMaterialPercentage] = useState("");
  const [lastMaterialId, setLastMaterialId] = useState(0);
  //images
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [lastImageId, setLastImageId] = useState(0);

  //   "clothes": [
  //     {
  //       "id": 1,
  //       "name": "Denim sherpa jacket",
  //       "item": "jackets",
  //       "amount": 1000,
  //       "gender": "male",
  //       "price": 39.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-001_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-003_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-004_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-005_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-006_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH963-55J-031_11.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 2,
  //       "name": "Classic turtleneck",
  //       "item": "sweaters",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastana",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-80M-001_15.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-80M-002_15.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-80M-004_15.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-80M-005_15.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-80M-040_15.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 3,
  //       "name": "Classic hoodie",
  //       "item": "sweatshirts",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-001_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-002_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-003_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-004_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-040_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/U/ZU278-00X-041_2.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 4,
  //       "name": "Shirt with mandarin collar",
  //       "item": "shirts",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-020_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-021_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-022_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-023_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-024_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-025_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/L/XL099-59M-040_1.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 5,
  //       "name": "Melange sweatpants",
  //       "item": "trousers",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-030_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-001_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-002_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-003_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-004_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-005_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-040_1.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 6,
  //       "name": "Polo shirt with stand up collar",
  //       "item": "polos",
  //       "amount": 1000,
  //       "price": 12.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-001_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-002_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-003_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-004_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-005_4.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-006_4.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/X/XX560-59X-040_4.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 7,
  //       "name": "Slim fit jeans",
  //       "item": "jeans",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-001_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-002_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-003_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-004_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-005_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW953-59J-040_7.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 8,
  //       "name": "Sports style blazer",
  //       "item": "blazers",
  //       "amount": 1000,
  //       "price": 49.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-001_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-002_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-003_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-004_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-005_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-006_11.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM395-59M-040_11.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 9,
  //       "name": "slim fit suit trousers",
  //       "item": "suits",
  //       "amount": 1000,
  //       "price": 22.99,
  //       "discount": true,
  //       "beforeDiscount": 39.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-001_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-002_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-003_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-004_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-005_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-006_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/P/XP136-99X-040_2.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 11,
  //       "name": "Super-Man pyjama set with shorts",
  //       "item": "nightwear",
  //       "amount": 1000,
  //       "price": 19.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/3/1/3128D-59X-001_10.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/3/1/3128D-59X-020_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/3/1/3128D-59X-021_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/3/1/3128D-59X-022_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/3/1/3128D-59X-023_1.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 12,
  //       "name": "Friends boxers 3 pack",
  //       "item": "underwear",
  //       "amount": 1000,
  //       "price": 17.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/O/ZO425-90X-001_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/O/ZO425-90X-002_2.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 13,
  //       "name": "Elegant coat with wool",
  //       "item": "coats",
  //       "amount": 1000,
  //       "price": 39.99,
  //       "discount": true,
  //       "beforeDiscount": 79.99,
  //       "desc": "notch lapels, single-breasted button fastening, open front pockets, practical single vented back hem",
  //       "material": [
  //         {
  //           "fabric": "wool",
  //           "percentage": "50"
  //         },
  //         {
  //           "fabric": "polyester",
  //           "percentage": "42"
  //         },
  //         {
  //           "fabric": "acrylic",
  //           "percentage": "4"
  //         },
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "2"
  //         },
  //         {
  //           "fabric": "viscose",
  //           "percentage": "2"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-001_16.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-002_16.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-003_16.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-004_16.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-005_16.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/W/YW674-88X-040_17.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 14,
  //       "name": "Quilted jacket with hood",
  //       "item": "puffer-jackets",
  //       "amount": 1000,
  //       "price": 39.99,
  //       "desc": "high collar with hood, front zip up fastening, zipped chest pocket, side pocket, with press stud fastening, sleeve and hem narrow ribbing, quilted lining on the inside",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-001_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-002_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-003_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-004_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-005_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-006_24.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/X/K/XK344-99X-040_24.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 15,
  //       "name": "Hooded jacket with pockets",
  //       "item": "jackets",
  //       "amount": 1000,
  //       "price": 59.99,
  //       "desc": "front flap pockets, smooth lining on the inside",
  //       "material": [
  //         {
  //           "fabric": "polyester",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-001_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-002_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-003_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-004_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-005_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-006_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/V/YV463-99X-040_6.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 16,
  //       "name": "Quilted vest with a hood",
  //       "item": "vests",
  //       "amount": 1000,
  //       "price": 39.99,
  //       "desc": "zip fastening",
  //       "material": [
  //         {
  //           "fabric": "polyester",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM394-59X-001_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM394-59X-002_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM394-59X-004_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM394-59X-006_9.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM394-59X-040_9.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 17,
  //       "name": "Basic T-shirt",
  //       "item": "t-shirts",
  //       "amount": 1000,
  //       "price": 5.99,
  //       "desc": "round neck, short sleeves",
  //       "material": [
  //         {
  //           "fabric": "cotton",
  //           "percentage": "60"
  //         },
  //         {
  //           "fabric": "polyester",
  //           "percentage": "40"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-020_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-021_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-022_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-023_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-024_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-025_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/U/YU930-88M-001_5.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 18,
  //       "name": "Quilted jacket",
  //       "item": "puffer-jackets",
  //       "amount": 1000,
  //       "price": 39.99,
  //       "desc": "high collar with hood, long sleeves with ribbed trim,smooth lining",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-030_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-001_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-002_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-003_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-005_3.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 19,
  //       "name": "Quilted jacket with high neck",
  //       "item": "puffer-jackets",
  //       "amount": 1000,
  //       "price": 29.99,
  //       "desc": "low stand up collar with press stud fastening, zip fastening, side pockets with press studs, long sleeves",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-001_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-002_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-003_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-004_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-005_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-006_12.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/I/ZI498-18X-040_12.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 20,
  //       "name": "Quilted jacket with standing collar",
  //       "item": "puffer-jackets",
  //       "amount": 1000,
  //       "price": 25.99,
  //       "discount": true,
  //       "beforeDiscount": 39.99,
  //       "desc": "low stand up collar, front zip up fastening, side pockets with press studs, long sleeves with ribbed cuffs",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "100"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-001_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-002_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-003_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-004_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-005_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-006_13.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Y/M/YM393-59X-040_13.jpg"
  //         }
  //       ]
  //     }
  //   ],
  //   "accessories": [
  //     {
  //       "id": 1,
  //       "name": "Classic sneakers",
  //       "item": "shoes",
  //       "amount": 1000,
  //       "price": 25.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-040_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-001_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-002_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-003_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-004_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-005_5.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/K/ZK037-00X-006_5.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 2,
  //       "name": "Bum bag",
  //       "item": "bags",
  //       "amount": 1000,
  //       "price": 12.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/1/0/1073E-59X-001_4.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/1/0/1073E-59X-041_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/1/0/1073E-59X-002_4.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/1/0/1073E-59X-042_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/1/0/1073E-59X-003_4.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 3,
  //       "name": "Flat cap",
  //       "item": "hats",
  //       "amount": 1000,
  //       "price": 12.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH194-90M-001_4.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH194-90M-040_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH194-90M-002_4.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 4,
  //       "name": "Patterned cotton rich socks 5 pack",
  //       "item": "socks",
  //       "amount": 1000,
  //       "price": 9.99,
  //       "desc": "high round neck",
  //       "material": [
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "92"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "8"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/X/ZX344-11X-001_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/X/ZX344-11X-002_2.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 5,
  //       "name": "Cap",
  //       "item": "hats",
  //       "amount": 1000,
  //       "price": 15.99,
  //       "desc": "Product size: M - 58 cm, L - 60 cm",
  //       "material": [
  //         {
  //           "fabric": "polyester",
  //           "percentage": "60"
  //         },
  //         {
  //           "fabric": "lyocell",
  //           "percentage": "24"
  //         },
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "6"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "4"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/9/0/9084D-90M-001_3.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/9/0/9084D-90M-002_3.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 6,
  //       "name": "Long check scarf",
  //       "item": "scarves",
  //       "amount": 1000,
  //       "price": 5.99,
  //       "discount": true,
  //       "beforeDiscount": 14.99,
  //       "desc": "Product size: 200 x 45 cm",
  //       "material": [
  //         {
  //           "fabric": "wool",
  //           "percentage": "30"
  //         },
  //         {
  //           "fabric": "polyester",
  //           "percentage": "23"
  //         },
  //         {
  //           "fabric": "viscose",
  //           "percentage": "23"
  //         },
  //         {
  //           "fabric": "acrylic",
  //           "percentage": "18"
  //         },
  //         {
  //           "fabric": "polyamide",
  //           "percentage": "6"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH286-99X-001_6.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH286-99X-040_2.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/H/ZH286-99X-002_6.jpg"
  //         }
  //       ]
  //     },
  //     {
  //       "id": 6,
  //       "name": "Gloves with buckle fastening",
  //       "item": "gloves",
  //       "amount": 1000,
  //       "price": 7.99,
  //       "discount": true,
  //       "beforeDiscount": 17.99,
  //       "material": [
  //         {
  //           "fabric": "polyester",
  //           "percentage": "97"
  //         },
  //         {
  //           "fabric": "elastane",
  //           "percentage": "3"
  //         }
  //       ],
  //       "images": [
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/Z/ZZ556-90M-001_1.jpg"
  //         },
  //         {
  //           "img": "https://www.reserved.com/media/catalog/product/Z/Z/ZZ556-90M-002_1.jpg"
  //         }
  //       ]
  //     }
  //   ]
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
      description !== "" &&
      materials.length !== 0 &&
      images.length !== 0
    ) {
      axios
        .post(`http://localhost:3000/${gender}/${category}`, {
          name: name,
          item: item,
          amount: amount,
          category: category,
          price: price,
          desc: description,
          material: [...materials],
          images: [...images],
        })
        .then((resp) => {
          console.log(resp);
          alert("Item added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Inputs cant be empty");
    }
  };
  return (
    <AddItemPageComponent>
      {user.email === "admin@admin.com" && (
        <div className="inputs">
          <div className="option">
            Items Gender:
            <FormControl>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select"
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
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
                {gender === "female" && (
                  <MenuItem value="shoes">shoes</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div className="option">
            Name:{" "}
            <TextField
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="option">
            item:{" "}
            <TextField
              className="input"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
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
          <div className="option">
            description:{" "}
            <TextField
              className="input"
              value={description}
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
                value={materialPercentage}
                onChange={(e) => setMaterialPercentage(e.target.value)}
              />
              <button onClick={() => materialHandler()}>Add Material</button>
            </div>
            {console.log(materials)}
            {materials.map((material) => (
              <div className="material">
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
              />
              <button onClick={() => imagesHandler()}>Add Image</button>
            </div>
            <div className="images-display">
              {images.map((image) => (
                <div className="image">
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
      <button onClick={() => itemHandler()}>Add Item</button>
    </AddItemPageComponent>
  );
};

const AddItemPageComponent = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: Center;
  align-items: center;
  flex-direction: column;
  .option {
    font-size: 2rem;
    margin: 1rem 0rem;
    font-weight: bold;
    &:first-letter {
      text-transform: upperCase;
    }
    .select {
      width: 10rem;
      margin: 0rem 1rem;
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
