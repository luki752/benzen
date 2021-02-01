import React from "react";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//icons
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Footer = () => {
  return (
    <FooterComponent>
      <div className="footer-computer">
        <ul>
          <li>reserved e-shop</li>
          <li>Help and Contact</li>
          <li>Delivery</li>
          <li>Returns {`&`} exchanges</li>
          <li>Payments</li>
          <li>Size guide</li>
          <li>Claims</li>
          <li>Withdrawal form</li>
          <li>Terms {`&`}conditions</li>
          <li>Privacy Policy</li>
        </ul>
        <ul>
          <li>reserved store</li>
          <li>Pricing Information</li>
          <li>Store returns policy</li>
          <li>Changes associated with Covid 19</li>
        </ul>
        <div className="two-lists">
          <ul>
            <li>my account</li>
            <li>Account settings</li>
            <li>Change password</li>
          </ul>
          <ul className="second-list">
            <li>company</li>
            <li>About us</li>
            <li>Pressroom</li>
            <li>Career</li>
            <li>About Eco Aware</li>
            <li>Our commitments</li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <span>newsletter</span>
          <p>
            Do you want to receive the newest trends and special offers? Sign up
            and get 10% off
          </p>
          <TextField
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I accept newsletter terms"
          />

          <button>send</button>
          <div className="footer-contact">
            Get more Benzen on:
            <p>
              <FacebookIcon className="icon" />
              <YouTubeIcon className="icon" />
              <InstagramIcon className="icon" />
              <PinterestIcon className="icon" />
            </p>
          </div>
        </div>
      </div>
      <div className="footer-phone">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            reserved e-shop
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <AccordionDetails>Help and Contact</AccordionDetails>
            <AccordionDetails>Delivery</AccordionDetails>
            <AccordionDetails>Returns {`&`} exchanges</AccordionDetails>
            <AccordionDetails>Payments</AccordionDetails>
            <AccordionDetails>Size guide</AccordionDetails>
            <AccordionDetails>Claims</AccordionDetails>
            <AccordionDetails>Withdrawal form</AccordionDetails>
            <AccordionDetails>Terms {`&`}conditions</AccordionDetails>
            <AccordionDetails>Privacy Policy</AccordionDetails>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            reserved store
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <AccordionDetails>Pricing Information</AccordionDetails>
            <AccordionDetails>Store returns policy</AccordionDetails>
            <AccordionDetails>
              Changes associated with Covid 19
            </AccordionDetails>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            my account
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <AccordionDetails>Account settings</AccordionDetails>
            <AccordionDetails>Change password</AccordionDetails>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            company
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <AccordionDetails>About us</AccordionDetails>
            <AccordionDetails>Pressroom</AccordionDetails>
            <AccordionDetails>Career</AccordionDetails>
            <AccordionDetails>About Eco Aware</AccordionDetails>
            <AccordionDetails>Our commitments</AccordionDetails>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            newsletter
          </AccordionSummary>

          <AccordionDetails className="accordion-details">
            <p>
              Do you want to receive the newest trends and special offers? Sign
              up and get 10% off
            </p>
            <TextField
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I accept newsletter terms"
            />

            <button>send</button>
          </AccordionDetails>
        </Accordion>

        <div className="footer-contact">
          <p>
            <FacebookIcon className="icon" />
            <YouTubeIcon className="icon" />
            <InstagramIcon className="icon" />
            <PinterestIcon className="icon" />
          </p>
        </div>
      </div>
    </FooterComponent>
  );
};

const FooterComponent = styled.div`
  background-color: #f4f3f1;
  margin-top: 3rem;
  .footer-computer {
    height: 20rem;
    width: 100%;
    display: flex;
    height: fit-content;
    justify-content: center;
    ul {
      padding: 2rem;
      list-style: none;
      li {
        font-size: 0.9rem;
        padding: 0.2rem 0rem;
        &:hover {
          color: #d5b383;
          cursor: pointer;
        }
        &:first-child {
          text-transform: upperCase;
          font-size: 1rem;
          color: black;
          cursor: regular;
        }
      }
    }
    .second-list {
      padding-top: 0;
    }
    .footer-newsletter {
      padding: 2rem;
      width: 20rem;
      button {
        border: 1px solid black;
        padding: 0.5rem;
        width: 10rem;
        transition: 0.3s ease-in all;
        &:hover {
          background-color: black;
          color: white;
        }
      }
    }
    .footer-contact {
      padding: 2rem 0rem;
      .icon {
        font-size: 3rem;
        margin-right: 0.2rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .footer-phone {
    display: none;
    @media screen and (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      text-align: Center;
    }
    .accordion-summary {
      text-transform: upperCase;
    }
    .accordion-details {
      display: flex;
      flex-direction: column;
    }
    .icon {
      font-size: 3rem;
      margin: 0.6rem;
    }
  }
`;

export default Footer;
