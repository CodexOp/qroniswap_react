import React from 'react'
import styled from 'styled-components'

const Stats =()=> {
    const list = [
        {
            count: "$113,139,093",
            heading: "Total Value Locked",
        },
        {
            count: "$17,388,349,852",
            heading: "Total Trade Volume",
        },
        {
            count: "$16,073,165",
            heading: "Market Cap",
        },
        {
            count: "$4.291",
            heading: "Price",
        },
    ]
    const Section = styled.section`
        padding-top: 30px;
        padding-bottom: 100px;
    `
    const BoxRow = styled.div`

        @media(max-width: 777px){
            & > li:first-child > div{
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
            }
            & > li:not(:last-child) > div{
                border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            }
            & > li:last-child > div{
                border-bottom-left-radius: 12px;
                border-bottom-right-radius: 12px;
            }
        }
    `
    const Box = styled.div`
        padding: 30px 40px;
        background: var(--gr-primary);
        text-align: center;

        @media(min-width:778px){
            border-radius: 12px;
        }

        h3{
            font-size: 32px;
            line-height: 1.2;
            font-weight: 800;
            margin-bottom: 5px;
        }
        p{
            font-size: 18px;
            line-height: 32px;
            margin-bottom: 0px;
        }
        
    `
  return (
    <Section>
        <div className="container">
            <BoxRow className="list-unstyled row justify-content-xl-between g-md-4">
                { list && list.map((item, i) =>(
                    <li key={i} className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token">
                        <Box>
                            {item.count && <h3 className='fw-bold'>{item.count}</h3>}
                            {item.heading && <p className="mb-0">{item.heading}</p>}
                        </Box>
                    </li>
                ))}
            </BoxRow>
        </div>
    </Section>
  )
}

export default Stats