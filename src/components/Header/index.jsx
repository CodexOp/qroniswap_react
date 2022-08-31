import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import Logo from "./qri-hd-footer-logo.png";
import CreditCard from "./credit-card-svg.svg";
import ChevronDown from "./chevron-down.svg";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = (props) => {
  const [buyWithCard, setBuyWithCard] = useState(false);

  const handleBuyWithCardClose = () => setBuyWithCard(false);
  const handleBuyWithCardShow = (e) => {
    e.preventDefault();
    setBuyWithCard(true);
  };

  const handleSwapModalShow = (e) => {
    e.preventDefault();
  };

  const configuration = {
    from: "ETH",
    to: "0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3",
    fromChain: "ETH",
    toChain: "ETH",
    amount: 1,
    iframe: "flex",
    hideSelectionFrom: false,
    hideSelectionTo: true,
    theme: "dark",
    background: "#28372e",
    injectTokens: {
      eth: ["0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3"],
    },
    slippagePercent: {
      instantTrades: 2,
      crossChain: 5,
    },
  };

  useEffect(() => {
    // prevent accidental changes to the object, for example, when re-creating a widget for another theme
    // Object.freeze(configuration);
    // // create widget
    // rubicWidget.init(configuration);
  }, []);

  const list = [
    {
      name: "Trade",
      slug: "trade",
      list: [
        {
          name: "Staking",
          slug: "staking",
        },
        {
          name: "Swap",
          slug: "https://swap.qroni.io",
          // swap: true
        },
      ],
    },
    {
      name: "Earn",
      slug: "earn",
      list: [
        {
          name: "Farm",
          slug: "farming",
        },
        {
          name: "Stake",
          slug: "staking",
        },
      ],
    },
    {
      name: "Win",
      slug: "win",
      list: [
        {
          name: "Lottery",
          slug: "lottery",
          badge: "soon",
        },
      ],
    },
  ];
  const HeaderWrapper = styled.header`
    .cb-header {
      height: 80px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
    }
    .header-transparent {
      @media (max-width: 991px) {
        background-color: #000;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .header-gradient {
      @media (max-width: 991px) {
        border-bottom: 1px solid rgba(255, 255, 255, 1);
      }
    }

    .btn-sm {
      --btn-padding: 10px 20px;
    }

    @media (max-width: 991px) {
      .navbar-collapse {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        padding: 10px 15px;

        &:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100vh;
          /* Glass 1 */
          background: linear-gradient(
            139.38deg,
            rgba(65, 70, 83, 0.4) 13.51%,
            rgba(56, 61, 74, 0.1) 86.74%
          );
          /* Glass 3 */
          box-shadow: 0px 4px 24px -1px rgba(21, 24, 32, 0.2);
          backdrop-filter: blur(40px);
          left: 0;
          top: 0;
          z-index: -1;
        }
      }
    }
    .nav {
      padding: 15px 0;
    }
    .header-gradient {
      background: linear-gradient(95.08deg, #9f2dfe 6.71%, #3bb2f9 111.09%);
    }

    // TOGGLER ICON
    @media (max-width: 991px) {
      .navbar-toggler {
        padding: 0;
        outline: none;
        border: 0;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        gap: 7px;

        span.icon-bar {
          display: inline-block;
          position: relative;
          width: 26px;
          height: 2px;
          background-color: #fff;
          transition: all 0.2s ease-in-out;
        }

        &:not(.collapsed) {
          span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 5px);
          }
          span:nth-child(2) {
            visibility: hidden;
            opacity: 0;
            width: 0;
          }
          span:nth-child(3) {
            transform: rotate(-45deg) translate(8px, -5px);
          }
        }
      }
    }

    // RIGHT BUTTONS
    .header-right-buttons {
      @media (max-width: 991px) {
        flex-direction: column-reverse;

        a,
        .btn {
          width: 100%;
          text-align: center;
        }
      }
    }

    .nav-link {
      font-size: 16px;
      color: white;
      font-weight: 500;
    }
    .dropdown-toggle::after {
      background-image: url("${ChevronDown}");
      background-position: center;
      border: 0;
      width: 15px;
      height: 15px;
      margin-left: 10px;
      transform: translateY(5px);

      @media (max-width: 991px) {
        float: right;
      }
    }
    .dropdown-item {
      position: relative;
      color: #fff;
      padding: 10px 20px;
      z-index: 1;
      @media (min-width: 991px) {
        text-align: center;
      }

      sup {
        background-color: #e31b1b;
        color: #fff;
        font-size: 8px;
        padding: 0px 6px 2px;
        font-style: italic;
        font-weight: 500;
        letter-spacing: 0.2px;
        line-height: 1;
        border-radius: 8px;
      }
    }

    .dropdown-menu {
      position: relative;
      background-color: transparent;
      z-index: 1;
      color: white;
      border: 0;

      @media (min-width: 991px) {
        padding: 20px;
      }
    }
    @media (min-width: 991px) {
      .dropdown-menu:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;

        background: linear-gradient(
          139.38deg,
          rgba(65, 70, 83, 0.4) 13.51%,
          rgba(56, 61, 74, 0.1) 86.74%
        );
        box-shadow: 0px 4px 24px -1px rgba(21, 24, 32, 0.2);
        backdrop-filter: blur(40px);
        /* Note: backdrop-filter has minimal browser support */
        border-radius: 8px;
      }
      .dropdown-item {
        position: relative;
        // background: linear-gradient(95.08deg,#9F2DFE 6.71%,#3BB2F9 111.09%);
        // box-shadow: 0px 4px 24px -1px rgba(21, 24, 32, 0.2);
        // backdrop-filter: blur(40px);
        /* Note: backdrop-filter has minimal browser support */
        border-radius: 8px;
      }
      .dropdown-item:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        // background: linear-gradient(139.38deg, rgba(109, 118, 142, 0.4) 13.51%, rgba(109, 118, 142, 0.1) 86.74%);
        left: 0;
        top: 0;
      }
      .dropdown-item.active,
      .dropdown-item:active,
      .dropdown-item:focus,
      .dropdown-item:hover {
        background: var(--gr-primary);

        &:before {
          content: "";
          position: absolute;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          background: #000;
          backdrop-filter: blur(40px);
          /* Note: backdrop-filter has minimal browser support */
          border-radius: 8px;
          left: 2px;
          top: 2px;
          z-index: -1;
        }
      }
    }
  `;
  return (
    <HeaderWrapper>
      <Navbar
        className={`cb-header header-${props.types}`}
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {list &&
                list.map((item, key) =>
                  item.list ? (
                    <NavDropdown
                      key={key}
                      title={item.name}
                      id={`dropdown-item--${key}`}
                    >
                      {item.list.map((d, i) =>
                        d.swap ? (
                          <NavDropdown.Item
                            key={i}
                            onClick={handleSwapModalShow}
                            href={d.slug}
                          >
                            {d.name} {d.badge && <sup>{d.badge}</sup>}{" "}
                          </NavDropdown.Item>
                        ) : (
                          <NavDropdown.Item key={i} href={d.slug}>
                            {d.name} {d.badge && <sup>{d.badge}</sup>}{" "}
                          </NavDropdown.Item>
                        )
                      )}
                    </NavDropdown>
                  ) : (
                    <Nav.Link key={key} href={item.slug}>
                      {item.name}
                    </Nav.Link>
                  )
                )}
            </Nav>
            <Nav className="align-items-center gap-lg-3 header-right-buttons">
              <Nav.Link
                className="p-0"
                href="#"
                target="_blank"
                onClick={handleBuyWithCardShow}
              >
                <img src={CreditCard} alt="" />
              </Nav.Link>
              <ConnectButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={buyWithCard}
        onHide={handleBuyWithCardClose}
        // backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <iframe
            src="https://widget.onramper.com?color=266677&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
            height={660}
            width={482}
            title="Onramper widget"
            frameborder={0}
            allow="accelerometer; autoplay; camera; gyroscope; payment"
          ></iframe>
        </Modal.Body>
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
