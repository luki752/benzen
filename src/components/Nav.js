import React,{useState} from 'react';
//styling
import styled from 'styled-components'
//material ui
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
//icons
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Nav = () => {
    //state
    const [navOpen, setNavOpen] = useState(false);
    const [manDropdownOpen, SetManDropdown] = useState(false);
    const [womanDropdownOpen, SetWomanDropdown] = useState(false);

    return(
        <NavComponent>       
            <div className="nav-left-menu">
                <ul>
                    <li><MenuIcon onClick={() => setNavOpen(!navOpen)}/></li>
                    <li className="nav-logo" >benzen</li>
                    
                </ul>
            </div>
            <div className="nav-middle-menu">
                <ul>
                <li><Button className="gender-button" style={{textDecoration: womanDropdownOpen ? "underline" : "none"}} onMouseEnter={()=> SetWomanDropdown(true)} onMouseLeave={()=> SetWomanDropdown(false)}>woman</Button></li>
                    <li><Button className="gender-button" style={{textDecoration: manDropdownOpen ? "underline" : "none"}} onMouseEnter={()=> SetManDropdown(true)} onMouseLeave={()=> SetManDropdown(false)}>man</Button></li>
                </ul>
            </div>
            <div className="nav-right-menu">
                <ul>
                    
                    {/* <li><TextField label="search" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}/></li> */}
                    <li> <AccountCircleIcon className="nav-icon"/> </li>
                    <li> <FavoriteIcon className="nav-icon"/> </li>
                    <li> <LocalMallIcon className="nav-icon"/> </li>
                </ul>
            </div>
            <HamburgerMenu style={{display: navOpen ? "flex" : "none"}}>
                <div className="hamburger-close-icon">
                <CloseIcon className="close-icon" onClick={() => setNavOpen(!navOpen)}/>
                </div>
                <div className="accordion">

                    {/* MAN ACCORDION */}
                    
                {/* Whole accordion */}
                <Accordion className='one-accordion'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Man</h1>
                </AccordionSummary>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Clothes</h1>
                </AccordionSummary>
                <AccordionDetails>
                            New in
                        </AccordionDetails>
                        <AccordionDetails>
                            Bestsellers
                        </AccordionDetails>
                        <AccordionDetails>
                            Coats, jackets, puffer jackets
                        </AccordionDetails>
                        <AccordionDetails>
                           Jumpers, Cardigans
                        </AccordionDetails>
                        <AccordionDetails>
                           Shirts
                        </AccordionDetails>
                        <AccordionDetails>
                           Hoodies, sweatshirts
                        </AccordionDetails>
                        <AccordionDetails>
                           Trousers
                        </AccordionDetails>
                        <AccordionDetails>
                           Polo shirts
                        </AccordionDetails>
                        <AccordionDetails>
                           T-shirts
                        </AccordionDetails>
                        <AccordionDetails>
                           Jeans
                        </AccordionDetails>
                        <AccordionDetails>
                           Blazers
                        </AccordionDetails>
                        <AccordionDetails>
                           Suits
                        </AccordionDetails>
                        <AccordionDetails>
                           Nightwear
                        </AccordionDetails>
                        <AccordionDetails>
                           Underwear
                        </AccordionDetails>
            
                </Accordion>
                </AccordionDetails>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Shoes</h1>
                </AccordionSummary>
                <AccordionDetails>
                            Accessories
                        </AccordionDetails>
                        <AccordionDetails>
                            New In
                        </AccordionDetails>
                        <AccordionDetails>
                            Shoes
                        </AccordionDetails>
                        <AccordionDetails>
                            Bags, toiletry bags
                        </AccordionDetails>
                        <AccordionDetails>
                            Hats, scarves, gloves
                        </AccordionDetails>
                        <AccordionDetails>
                            Socks
                        </AccordionDetails>
                        <AccordionDetails>
                            See more
                        </AccordionDetails>
            
                </Accordion>
                </AccordionDetails>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Collection</h1>
                </AccordionSummary>
        <AccordionDetails>Collections</AccordionDetails>
                        <AccordionDetails>Athleisure</AccordionDetails>
                        <AccordionDetails>Winter Accessories</AccordionDetails>
                        <AccordionDetails>Premium quality</AccordionDetails>
                        <AccordionDetails>Unisex collection</AccordionDetails>
                        <AccordionDetails>Limited license</AccordionDetails>
                        <AccordionDetails>Eco aware</AccordionDetails>
            
                </Accordion>
                </AccordionDetails>
            
                </Accordion>


                {/* Whole accordion */}
                <Accordion className='one-accordion'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Woman</h1>
                </AccordionSummary>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Clothes</h1>
                </AccordionSummary>
                <AccordionDetails>
                            Bestsellers
                        </AccordionDetails>
                        <AccordionDetails>
                            Coats,jackets,puffer jackets
                        </AccordionDetails>
                        <AccordionDetails>Dresses,jumpsuits</AccordionDetails>
                        <AccordionDetails>Jumpers, Cardigans</AccordionDetails>
                        <AccordionDetails>Shirts</AccordionDetails>
                        <AccordionDetails>Blouses</AccordionDetails>
                        <AccordionDetails>T-shirts, tops</AccordionDetails>
                        <AccordionDetails>Hoodies, sweatshirts</AccordionDetails>
                        <AccordionDetails>Trousers</AccordionDetails>
                        <AccordionDetails>Jeans</AccordionDetails>
                        <AccordionDetails>Skirts</AccordionDetails>
                        <AccordionDetails>Blazers</AccordionDetails>
                        <AccordionDetails>Nightwear</AccordionDetails>
                        <AccordionDetails>Lingerie</AccordionDetails>
            
                </Accordion>
                </AccordionDetails>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Shoes</h1>
                </AccordionSummary>
                <AccordionDetails>
                 New in
                </AccordionDetails>
                <AccordionDetails>
                 All
                </AccordionDetails>
                <AccordionDetails>
                 Boots
                </AccordionDetails>
                <AccordionDetails>
                 Heels
                </AccordionDetails>
                <AccordionDetails>
                 Flats
                </AccordionDetails>
                <AccordionDetails>
                 Leather
                </AccordionDetails>
                <AccordionDetails>
                 Sneakers
                </AccordionDetails>
            
                </Accordion>
                </AccordionDetails>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Accessories</h1>
                </AccordionSummary>
                <AccordionDetails>New in</AccordionDetails>
                        <AccordionDetails>Bags, backpacks</AccordionDetails>
                        <AccordionDetails>Hats,scarves,gloves</AccordionDetails>
                        <AccordionDetails>Socks, tights</AccordionDetails>
                        <AccordionDetails>See more</AccordionDetails>
            
                </Accordion>
                </AccordionDetails>

                      {/* accordion within main accordion */}
                <AccordionDetails>
                <Accordion className='accordion-within'>
                <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
                 >
                <h1>Collection</h1>
                </AccordionSummary>
                <AccordionDetails>Age of Aquarius Collection</AccordionDetails>
                        <AccordionDetails>Home hub</AccordionDetails>
                        <AccordionDetails>Unisex collection</AccordionDetails>
                        <AccordionDetails>Premium quality</AccordionDetails>
                        <AccordionDetails>#BenzenForMum</AccordionDetails>
                        <AccordionDetails>Eco aware</AccordionDetails>
            
                </Accordion>
                </AccordionDetails>
            
                </Accordion>
                </div>
                </HamburgerMenu>
                <ManDropdown style={{display: manDropdownOpen ? "flex" : "none"}}>
                    <div className="dropdown-menu" onMouseEnter={()=> SetManDropdown(true)} onMouseLeave={()=> SetManDropdown(false)}>
                    <ul>
                        <li>
                            Clothes
                        </li>
                        <li>
                            New in
                        </li>
                        <li>
                            Bestsellers
                        </li>
                        <li>
                            Coats, jackets, puffer jackets
                        </li>
                        <li>
                           Jumpers, Cardigans
                        </li>
                        <li>
                           Shirts
                        </li>
                        <li>
                           Hoodies, sweatshirts
                        </li>
                        <li>
                           Trousers
                        </li>
                        <li>
                           Polo shirts
                        </li>
                        <li>
                           T-shirts
                        </li>
                        <li>
                           Jeans
                        </li>
                        <li>
                           Blazers
                        </li>
                        <li>
                           Suits
                        </li>
                        <li>
                           Nightwear
                        </li>
                        <li>
                           Underwear
                        </li>
                    </ul>
                    <ul>
                        <li>
                            Accessories
                        </li>
                        <li>
                            New In
                        </li>
                        <li>
                            Shoes
                        </li>
                        <li>
                            Bags, toiletry bags
                        </li>
                        <li>
                            Hats, scarves, gloves
                        </li>
                        <li>
                            Socks
                        </li>
                        <li>
                            See more
                        </li>
                    </ul>
                    <ul>
                        <li>Collections</li>
                        <li>Athleisure</li>
                        <li>Winter Accessories</li>
                        <li>Premium quality</li>
                        <li>Unisex collection</li>
                        <li>Limited license</li>
                        <li>Eco aware</li>
                    </ul>
                    </div>
                </ManDropdown>        
                <WomanDropdown style={{display: womanDropdownOpen ? "flex" : "none"}}>
                    <div className="dropdown-menu" onMouseEnter={()=> SetWomanDropdown(true)} onMouseLeave={()=> SetWomanDropdown(false)}>
                    <ul>
                        <li>
                            Clothes
                        </li>
                        <li>
                            Bestsellers
                        </li>
                        <li>
                            Coats,jackets,puffer jackets
                        </li>
                        <li>Dresses,jumpsuits</li>
                        <li>Jumpers, Cardigans</li>
                        <li>Shirts</li>
                        <li>Blouses</li>
                        <li>T-shirts, tops</li>
                        <li>Hoodies, sweatshirts</li>
                        <li>Trousers</li>
                        <li>Jeans</li>
                        <li>Skirts</li>
                        <li>Blazers</li>
                        <li>Nightwear</li>
                        <li>Lingerie</li>
                    </ul>
                    <ul>
                        <li>
                            Shoes
                        </li>
                        <li>
                            New In
                        </li>
                        <li>
                            All
                        </li>
                        <li>Boots</li>
                        <li>Heels</li>
                        <li>Flats</li>
                        <li>Leather</li>
                        <li>Sneakers</li>
                    </ul>
                    <ul>
                        <li>Accessories</li>
                        <li>New in</li>
                        <li>Bags, backpacks</li>
                        <li>Hats,scarves,gloves</li>
                        <li>Socks, tights</li>
                        <li>See more</li>
                        
                    </ul>
                    <ul>
                        <li>Collection</li>
                        <li>Age of Aquarius Collection</li>
                        <li>Home hub</li>
                        <li>Unisex collection</li>
                        <li>Premium quality</li>
                        <li>#BenzenForMum</li>
                        <li>Eco aware</li>
     
                        
                    </ul>
                    </div>
                </WomanDropdown>        
        </NavComponent>
    )
}

const NavComponent = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
.nav-left-menu{
   ul{
       display:flex;
       list-style:none;
       align-items:center;
       .nav-logo{
           text-transform:upperCase;
           font-size:2rem;
           padding:0rem 1rem;
           font-weight:bold;
           @media screen and (max-width:1000px){
            font-size:1.5rem;
        }
       }
       li{
           padding:1rem;
           &:first-child{
               display:none;
               @media screen and (max-width:1000px){
                   display:block;
               }
           }
       }
   }
}

.nav-middle-menu{
    ul{
        display:flex;
        list-style:none;
        align-items:center;
        @media screen and (max-width:1000px){
            display:none;
        }
        li{
           .gender-button{
            font-family: 'Raleway', sans-serif;
            font-size:1.5rem;
            padding:1rem;
           } 
        }
    }
}

.nav-right-menu{
    ul{
        display:flex;
        list-style:none;
        align-items:center;
        li{
            padding:0rem 1rem;
            @media screen and (max-width:1000px){
                padding:0rem 0.25rem;
                
            }
            .nav-icon{
                @media screen and (max-width:1000px){
                    padding:0rem 0.5rem;
                    font-size:1rem;
                }
            }
        }
    }
}
`

const HamburgerMenu = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:white;
display:flex;
flex-direction:column;
.close-icon{
    position:absolute;
    top:0;
    right:0;
    padding:1rem;
}
.hamburger-close-icon{
    width:100%;
    height:3rem;
}
.one-accordion{
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    width:100%;
    .accordion-within{
        width:100%;
        height:100%;
    }
}
`
const ManDropdown = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:91.4vh;
background-color:gray;
display:flex;
justify-content:center;
margin-top:4rem;
.dropdown-menu{
    height:fit-content;
    display:flex;
    background-color:white;
    padding:0 5rem;
    ul{
        padding:3rem;
        font-size:1rem;
        font-weight:bold;
        li{
            list-style:none;
            padding:0.4rem 0rem;
            &:hover{
                text-decoration:underline;
                cursor:pointer;
            }
            &:first-child{
                padding-bottom:2rem;
                text-transform:upperCase;
                text-decoration:none;
                cursor:default;
            }
        }
    }
}
`
const WomanDropdown = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:91.4vh;
background-color:gray;
display:flex;
justify-content:center;
margin-top:4rem;
.dropdown-menu{
    height:fit-content;
    display:flex;
    background-color:white;
    padding:0 5rem;
    ul{
        padding:3rem;
        font-size:1rem;
        font-weight:bold;
        li{
            list-style:none;
            padding:0.4rem 0rem;
            &:hover{
                text-decoration:underline;
                cursor:pointer;
            }
            &:first-child{
                padding-bottom:2rem;
                text-transform:upperCase;
                text-decoration:none;
                cursor:default;
            }
        }
    }
}
`
export default Nav;