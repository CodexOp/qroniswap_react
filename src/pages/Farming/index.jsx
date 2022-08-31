import React from 'react'
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HeroCover from '../../components/HeroCover';
import DataTable from '../../components/DataTable';

const Farming =()=> {
  const Main = styled.main`
    padding-top: 130px;
    padding-bottom: 100px;
  `
  const NavTab = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 0;
    gap: 0.5rem;
    margin-bottom: 30px;

    a{
      padding: 10px 20px;
      border-radius: 2rem;
      text-decoration: none;
      background: var(--navtab-active-bg, #fff);
      color: var(--navtab-active-text, #364073);
      font-size: 14px;
      font-weight: 600;

      &.active{
        --navtab-active-bg: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
        --navtab-active-text: #fff;
      }
    }
  `
  return (
    <>

    <Header types="gradient"/>
    <Main>
      <NavTab>
        <li><a href="/farming" className='active'>Farm</a></li>
        <li><a href="/staking">Stake</a></li>
      </NavTab>
      <HeroCover heading="Farms" content="Stake LP tokens to earn."/>
     
      <DataTable />
      
    </Main>
    <Footer />

    </>
  )
}

export default Farming;