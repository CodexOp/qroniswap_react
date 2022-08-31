import React from 'react';
import styled from 'styled-components';
import HeadingIcon from './img/trending-pools-icon.svg';
import TrendingIcon1 from './img/partner-1.png';
import TrendingIcon2 from './img/partner-2.png';
import TrendingIcon3 from './img/partner-3.png';
import TrendingIcon4 from './img/partner-4.png';
const Trending =()=> {
    const list = [
        {
            title: "Stake Qroni - Earn Qroni",
            performance: "Up to 50%",
            content: "APY",
            icon: TrendingIcon1,
        },
        {
            title: "Stake Pinksale - Earn Qroni",
            icon: TrendingIcon2,
        },
        {
            title: "Stake BNB - Earn Qroni",
            icon: TrendingIcon3,
        },
        {
            title: "Stake Vince - Earn Qroni",
            icon: TrendingIcon4,
        },
    ]
    const Section = styled.section`
        padding: 100px 0px;
        position: relative;
        z-index: 1;

        &:before{
            content: "";
            width: 25vw;
            height: 25vw;
            right: -15%;
            top: 0px;
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
            left: -15%;
            top: 60%;
            background: #3BB2F9;
            filter: blur(127px);
            z-index: -1;
        }

        @media(min-width: 577px){
            .list-vr li:not(:last-child){
                position: relative;

                &:after{
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    top: 0px;
                    right: 0px;
                    background-color: #EAECF0;

                }
            }
        }
    `
    const Heading = styled.div`
        text-align: center;
        margin-bottom: 50px;

        img{
            display: inline-block;
            width: 56px;
            margin-bottom: 30px;
        }


        h2{
            font-size: 24px;
            text-align: center;
            font-weight: 500;
        
            @media(min-width: 991px){
              font-size: 36px;
            }
        }
    `;
    const Box = styled.aside`
        
        h6{
            font-size: 18px;
            line-height: 28px;
            font-weight: 500;
            margin-bottom: 15px;
        }
        
        h3{
            font-size: 20px;
            line-height: 28px;
            font-weight: 700;
        }
        
        p{
            font-size: 18px;
            line-height: 28px;
            font-weight: 400;
        }
        .item-img img{
            display: inline-block;
            width: 48px;
        }
        
    `

  return (
    <Section>
        <div className="container">
            <Heading>
                <img src={HeadingIcon} alt="" />
                <h2>Trending Pools</h2>
            </Heading>

            <div className="row justify-content-center">
                <div className="col-xl-10">
                    {list && <ul className="list-vr list-unstyled row gy-5 justify-content-center">
                        {list.map((item, i) => (
                        <li key={i} className="col-xl-3 col-sm-6">
                            <Box>
                                {item.title && <h6>{item.title}</h6>}
                                <div className="d-flex gap-3">
                                    {item.performance &&
                                    <div className="item-content">
                                        {item.performance && <h3>{item.performance}</h3>}
                                        {item.content && <p>{item.content}</p>}
                                    </div> }
                                    {item.icon && <div className="item-img">
                                        <img src={item.icon} alt="" />
                                    </div>}
                                </div>
                            </Box>
                        </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </div>
    </Section>
  )
}

export default Trending