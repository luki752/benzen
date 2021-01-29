import React from 'react';
//styling
import styled from 'styled-components'
//material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
//icons
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';


const Nav = () => {
    return(
        <NavComponent>       
            <div className="nav-left-menu">
                <ul>
                    <li className="nav-logo" >benzen</li>
                    <li><Button>woman</Button></li>
                    <li><Button>man</Button></li>
                </ul>
            </div>
            <div className="nav-right-menu">
                <ul>
                    
                    <li><TextField label="search" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}/></li>
                    <li> <AccountCircleIcon/> </li>
                    <li> <FavoriteIcon/> </li>
                    <li> <LocalMallIcon/> </li>
                </ul>
            </div>          
        </NavComponent>
    )
}

const NavComponent = styled.div`
display:flex;
justify-content:space-between;
.nav-left-menu{
   ul{
       display:flex;
       list-style:none;
       align-items:center;
       .nav-logo{
           text-transform:upperCase;
           font-size:2rem;
           padding:0rem 1rem;
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
            &:first-child{
                padding:0;
            }
        }
    }
}
`

export default Nav;