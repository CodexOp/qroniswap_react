import React from 'react';
import styled from 'styled-components';
import checkmark from './img/checkmark.svg';
import PoolBanner1 from './img/pools-banner-1.png';
import PoolBanner2 from './img/pools-banner-2.png';
import PoolBanner3 from './img/pools-banner-3.svg';

const TextImage =()=> {
    const list = [
        {
            heading: "Staking Pool",
            content: "Get the most out of our intuitive protocol",
            banner: PoolBanner1,
            button: {
                label: "Get started",
                url: "staking"
            },
            list: [
                { name: "Support the network with your tokens"},
                { name: "Earn huge interest rates"},
                { name: "Stake your NFTs too!"},
            ],
        },
        {
            heading: "Farming",
            content: "Get the most out of our liquidity pool in exchange for interest and other rewards",
            banner: PoolBanner2,
            banner_left: true,
            button: {
                label: "Start farming",
                url: "farming"
            },
            list: [
                { name: "Provide liquidity in our protocol"},
                { name: "Get liquidity pool (LP) tokens"},
                { name: "Stake your NFTs too!"},
            ],
        },
        {
            heading: "NFT ticketing",
            content: "We adopt industry-best technology to provide secure & peer-to-peer NFT ticketing",
            banner: PoolBanner3,
            button: {
                label: "Start minting tickets",
                cMingSoon: "Coming Soon",
                url: "https://nft.qroni.io"
            },
            list: [
                { name: "Mint unique NFT tickets"},
                { name: "Buy and sell NFT tickets"},
                { name: "Stake idle tickets all in one place!"},
            ],
        },
    ]
    const Section = styled.section`
    position: relative;
    z-index: 1;

    &:before{
        content: "";
        width: 25vw;
        height: 25vw;
        right: -15%;
        top: 30%;
        position: absolute;
        background: #9F2DFE;
        filter: blur(127px);
        z-index: -1;
    }

    &:after{
        position: absolute;
        content: "";
        width: 25vw;
        height: 25vw;
        left: -5%;
        top: 30%;
        background: #3BB2F9;
        filter: blur(127px);
        z-index: -1;
    }

    
        p{
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
        }

            .banner-area{
                @media(min-width: 1199px){
                    margin-right: -70%;
                }

                img{
                    width: 100%;
                }
            }

            @media(min-width: 1199px){
                .order-lg-first .banner-area{
                    margin-right: 0;
                    margin-left: -70%;
    
                }
            }
        }


    `
    const BoxContent = styled.div`
        ul{
            list-style: none;
            position: relative;
            margin: 40px 0 30px;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        
            li{
                font-size: 18px;
                font-weight: 400;
                line-height: 28px;
                background-image: url('${checkmark}');
                background-repeat: no-repeat;
                background-size: 28px;
                background-position: left-center;
                padding-left: 40px;
            }
        }

    
        p{
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
        }

    `
    const Heading = styled.div`
        margin-bottom: 100px;

        h2{
            font-size: 36px;
            text-align: center;
            font-weight: 500;
            margin-bottom: 0px;
        
            @media(min-width: 991px){
            font-size: 36px;
            }
        }
    `
    const BoxRow = styled.div`
        margin-bottom: 100px;
    `
  return (
    <Section>
        <Heading>
            <h2>A growing community for an evolving DeFi Platform</h2>
        </Heading>

        <div className="container">
            {list && list.map((r, idx) =>(
            <BoxRow key={idx} className="row g-5 align-items-center">
                <div className={`${r.banner_left ? 'col-lg-5 offset-lg-2' : 'col-lg-6'}`}>
                    <BoxContent>
                        {r.heading && <h3>{r.heading}</h3>}
                        {r.content && <p>{r.content}</p>}

                        {r.list && <ul>{r.list.map((s, i) => <li key={i}>{s.name}</li>)}</ul> }
                        {r.button && <div className="button-area comingSoon">
                            <a href={r.button.url} className="btn btn-gr-primary">{r.button.label}<br /><span>{r.button.cMingSoon}</span></a>
                        </div>       
                        }
                    </BoxContent>
                </div>
                <div className={`${r.banner_left ? 'col-lg-5 order-lg-first' : 'col-lg-5 offset-lg-1'}`}>
                    <div className="banner-area">
                        <img src={r.banner} alt=""/>
                    </div>
                </div>
            </BoxRow>
            ))}
        </div>
    </Section>
  )
}

export default TextImage