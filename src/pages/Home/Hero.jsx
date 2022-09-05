import React from "react";
import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";



const Hero = () => {
  const Section = styled.section`
    padding: 200px 0 100px;
    position: relative;
    z-index: 1;

    &:before {
      content: "";
      width: 25vw;
      height: 25vw;
      left: -15%;
      top: 47px;
      position: absolute;
      background: #9f2dfe;
      filter: blur(127px);
      z-index: -1;
    }

    &:after {
      position: absolute;
      content: "";
      width: 25vw;
      height: 25vw;
      right: -15%;
      top: -90px;
      background: #3bb2f9;
      filter: blur(127px);
      z-index: -1;
    }
  `;
  const Heading = styled.div`
    margin-bottom: 50px;

    .whitepaper_btn{
      margin-left:20px;
    }

    h1 {
      font-size: 32px;
      line-height: 1;
      font-weight: 600;
      margin-bottom: 25px;

      @media (min-width: 991px) {
        font-size: 60px;
      }
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 400;

      @media (min-width: 991px) {
        font-size: 20px;
      }
    }
  `;
  return (
    <Section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <Heading>
              <h1>
                Next level digital marketplace to trade your favorite assets.
              </h1>
              <p>
                Multi-chain DEX. Get Exclusive NFT Tickets. Robust Pools
                Tailored for Your Favorite Tokens. Receive Eye-Catching Staking
                Rewards. High liquidity. Fast trade. Credit card support. No
                extra fees. Secure transaction.
              </p>
            </Heading>

            <div className="hero-area-buttons d-flex justify-content-center gap-3">
            <ConnectButton />

              <a
                href="https://qroniswap.gitbook.io/qroniswap-whitepaper-1/"
                className="btn btn-light whitepaper_btn"
              >
                Whitepaper
              </a>
            </div>
            <div className="hero-area-buttons d-flex justify-content-center gap-3 threeandfourth">
            <a
                href="https://swap.qroni.io"
                className="whitepaper_btn btn_extra"
                target="_blank" rel="noreferrer"
              >
                Swap
              </a>

              <a
                href="https://nft.qroni.io"
                className="btn-light nft_btn"
                target="_blank" rel="noreferrer"
              >
                NFT
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
