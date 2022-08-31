import React from 'react'
import styled from 'styled-components'

const Roadmap =()=> {
    const list = [
        {
            title: "Stage1",
            class: "col-lg-4 order-lg-3 dot-top",
            list: [
                { name: "Web application launch", },
                { name: "DEX token listings", },
                { name: "Private NFT sale", },
                { name: "Beta testing", },
                { name: "Mobile app launch", },
                { name: "Multi-layer ID integration", },
                { name: "Qroni launchpad Integration", },
            ]
        },
        {
            title: "Stage2",
            class: "col-lg-5  order-lg-1 offset-lg-2",
            list: [
                { name: "Multi-chain DEX partnership & integration", },
                { name: "Fiat on-ramp integration", }, 
                { name: "Raffle draw", },
            ]
        },
        {
            title: "Stage3",
            class: "col-lg-6 order-lg-4 offset-lg-2 dot-top",
            list: [
                { name: "CEX listing", },
                { name: "NFT series launch", },
                { name: "QroniLock launch", },
                { name: "NFT ticketing", },
                { name: "Ethereum and Solana cross-chain launch", },
            ]
        },
        {
            title: "Stage4",
            class: "col-lg-4 order-lg-2 offset-lg-1",
            list: [
                { name: "Ticketing for blockchain events", },
                { name: "White labeling", },
                { name: "Multi-chain NFT marketplace launch", },
                { name: "Brand Partnerships", },
                { name: "Mobile app launch", },
                { name: "Multi-layer ID integration", },
                { name: "Qroni launchpad Integration", },
            ]
        },
    ]
    const Section = styled.section`
        padding-bottom: 100px;
        position: relative;
        z-index: 1;
    
        &:before{
            content: "";
            width: 25vw;
            height: 25vw;
            right: -15%;
            top: 0%;
            position: absolute;
            background: #3BB2F9;
            filter: blur(127px);
            z-index: -1;
        }
    
        &:after{
            position: absolute;
            content: "";
            width: 25vw;
            height: 25vw;
            left: -5%;
            top: 0%;
            background: #9F2DFE;
            filter: blur(127px);
            z-index: -1;
        }
    
        
        @media(min-width: 991px){
            .dot-top .roadmap-box{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-top: 5rem;

                &:before{
                    bottom: auto;
                    top: -16px;
                }
                &:after{
                    bottom: auto;
                    top: -8px;
                }
            }
        }

        .roadmap-box{
            position: relative;
            padding-left: 15px;
            padding-bottom: 30px;
            height: 100%;
            border-left: 1px solid #fff;
            z-index: 1;

            &:before{
                content: "";
                position: absolute;
                width: 32px;
                height: 32px;
                background: rgba(255, 69, 129, 0.1);
                bottom: -16px; left: -16px;
                z-index: 2;
                border-radius: 30rem;
            }
    
    
            &:after{
                content: "";
                position: absolute;
                width: 16px;
                height: 16px;
                background: #fff;
                bottom: -8px; 
                left: -8px;
                z-index: 3;
                border-radius: 30rem;
            }
    
            h4{
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 30px;
                text-transform: uppercase;
    
                span{
                    background: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            }
    
            ul{
                padding: 0;
                margin-bottom: 0;
                margin-left: 20px;
                font-size: 18px;
                line-height: 30px;
            }
        }
    `;
    const Heading = styled.div`
        text-align: center;
        margin-bottom: 100px;

        h2{
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        
            @media(min-width: 991px){
              font-size: 36px;
            }
        }
        p{
            font-size: 20px;
        }
    `;
  return (
    <Section>
        <div className="container">
            <Heading>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h2>QroniSwap Roadmap</h2>
                        <p>(The Qroni team may extend the roadmap as they wish and include dates of possible completion or milestone)</p>
                    </div>
                </div>
            </Heading>


            <div className="row gy-5 gy-lg-0">
                {list && list.map((item, i) =>(
                <div key={i} className={item.class}>
                    <div className='roadmap-box'>
                        {item.title && <h4><span>{item.title}</span></h4>}
                        {item.list && <ul className='d-flex flex-column gap-1'>
                            {item.list.map((m, idx) =>(
                                <li key={idx}>{m.name}</li>
                            ))}
                        </ul> }
                    </div>
                </div>
                ))}
            </div>
        </div>


    </Section>
  )
}

export default Roadmap