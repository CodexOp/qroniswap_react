import React from 'react';
import styled from 'styled-components';
import Logo1 from './img/partner-1.png';
import Logo2 from './img/partner-2.png';
import Logo3 from './img/partner-3.png';
import Logo4 from './img/partner-4.png';

const Partners =()=> {
  const list = [
    { image: Logo1 },
    { image: Logo2 },
    { image: Logo3 },
    { image: Logo4 },
  ]
  const Heading = styled.h2`
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;

    @media(min-width: 991px){
      font-size: 48px;
    }
  `
  const Gallery = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    gap: 30px;

    @media (min-width: 991px){
      gap: 75px;      
    }

    img{
      width: 64px;
      height: 64px;
      margin: auto;
      display: inline-block;
    }
  `
  return (
    <section>
        <div className="row justify-content-center">
            <div className="col-lg-4">
                <Heading>Partners</Heading>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col">
              <Gallery>
                {list && list.map((img, i) => (
                  <div key={i}>
                    <img src={img.image} alt="" />
                  </div>
                ))}
              </Gallery>
            </div>
        </div>
    </section>
  )
}

export default Partners