import React from 'react';
import styled from 'styled-components';
import Icon1 from './img/featured-icon-1.svg';
import Icon2 from './img/featured-icon-2.svg';
import Icon3 from './img/featured-icon-3.svg';
import Icon4 from './img/featured-icon-4.svg';
import Icon5 from './img/featured-icon-5.svg';
import Icon6 from './img/featured-icon-6.svg';


const Features =()=> {
    const list = [
        {
            icon: Icon1,
            title: "Instant crypto trading",
            content: "Buy crypto with your debit/credit card. Instant deposit.",
        },
        {
            icon: Icon2,
            title: "Multi-chain decentralized exchange (DEX)",
            content: "Trade in a cross-chain DEX. Avoid impermanent loss and low capital efficiency.",
        },
        {
            icon: Icon3,
            title: "Fiat on-ramp",
            content: "Trade highly liquid assets. Convert to fiat instantly.",
        },
        {
            icon: Icon4,
            title: "Secure crypto trading",
            content: "Qroni Swap applies top-security protocols and audits.",
        },
        {
            icon: Icon5,
            title: "Crypto staking",
            content: "Stake your Qroni Tokens (QNI) in farm and syrup pools. Earn up to [%] APY.",
        },
        {
            icon: Icon6,
            title: "NFT staking",
            content: "Stake your NFTs and idle NFT tickets, and earn passive income as you navigate Qroniswap.",
        },
    ]
    const Section = styled.section`
        padding: 100px 0;
    `;
    const Heading = styled.h2`
      font-size: 36px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 60px;
  
      @media(min-width: 991px){
        font-size: 36px;
      }
    `;
    const ItemThumb = styled.div`
      margin-bottom: 20px;
    `
    const ItemTitle = styled.h4`
      font-size: 20px;
      line-height: 1.7;
      margin-bottom: 10px;
    `
    const ItemContent = styled.p`
      font-size: 16px;
      margin-bottom: 0px;
    `
  return (
    <Section>
        <div className="container">
            <Heading>Take Your Crypto Trading To The NEXT LEVEL!</Heading>

            <div className="row gy-5 gx-3 text-center">
                {list && list.map((feature, i) =>(
                <div key={i} className="col-lg-4 col-md-6">

                    {feature.icon && <ItemThumb><img src={feature.icon} alt={feature.title} /></ItemThumb> }
                    <div className="item-content">
                        {feature.title && <ItemTitle>{feature.title}</ItemTitle>}
                        {feature.content && <ItemContent>{feature.content}</ItemContent>}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Section>
  )
}

export default Features