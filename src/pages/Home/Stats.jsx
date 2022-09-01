import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import value from "../../value.json";
import qniAbi from "../../qnitokenAbi.json";
import { useSigner, useProvider, useContract, useBalance } from "wagmi";
import routerAbi from "../../routerAbi.json";

const Stats = () => {
  //   let provider = createContext();
  //   let setProvider = createContext();
  //   let signer = createContext();
  //   let setSigner = createContext();

  //   let _provider = React.useContext(provider);
  //   let _setProvider = React.useContext(setProvider);
  //   let _signer = React.useContext(signer);
  //   let _setSigner = React.useContext(setSigner);

  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();

  const [currentprice, setCurrentprice] = useState();
  const [vallocked, setVallocked] = useState();
  const [marketCap, setMarketcap] = useState();
  const [volume, setVolume] = useState();

  async function totalvallocked() {
    try {
      //   let { data, isError, isLoading } = useBalance({
      //     addressOrName: signer,
      //   });
      provider.getBalance(signer).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);
        setVallocked(parseInt(currentprice) * parseInt(balance));
        console.log(`balance: ${balanceInEth}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function totalvolume() {
    try {
      let rpcUrl = value.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(value.qniTokenAddress, qniAbi, provider_);
      let supply = await token.totalSupply();
      console.log("Supply", supply.toString());
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      supply = ethers.utils.formatUnits(supply, decimals);
      setVolume(parseInt(supply));
    } catch (error) {
      console.log(error);
    }
  }

  

  async function fetchprice() {
    try {
      let rpcUrl = value.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      console.log(provider_)
      let router = new ethers.Contract(value.router, routerAbi, provider_);
      //   const router = useContract({
      //     addressOrName: value.router,
      //     contractInterface: routerAbi,
      //     signerOrProvider: provider_,
      //   });

      //needs to be sorted
      const tokenIn = value.qniTokenAddress;
      console.log(tokenIn)
      const tokenOut = value.wbnb;
      const amountIn = ethers.utils.parseUnits("1", 5);
      let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
      let busd = value.busd;
      let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
      console.log(`
            tokenIn: ${ethers.utils.formatEther(
              amountIn.toString()
            )} ${tokenIn} (QNI)
            tokenOut: ${ethers.utils.formatEther(
              amounts2[1].toString()
            )} ${busd} (BUSD)
          `);
      setCurrentprice(
        parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(8)
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function marketcap() {
    try {
      let _mcap = volume * currentprice;
      setMarketcap(_mcap);
      console.log("Current Market Capitalization: ", _mcap);
    } catch (error) {
      console.log(error);
    }
  }

  //   fetchprice();
  useEffect(() => {
    marketcap();
    totalvallocked();
    fetchprice();
    totalvolume();
  }, []);

  const list = [
    {
      count: vallocked,
      heading: "Total Value Locked",
    },
    {
      count: "$17,388,349,852",
      heading: "Total Trade Volume",
    },
    {
      count: marketCap,
      heading: "Market Cap",
    },
    {
      count: currentprice,
      heading: "Price",
    },
  ];
  const Section = styled.section`
    padding-top: 30px;
    padding-bottom: 100px;
  `;
  const BoxRow = styled.div`
    @media (max-width: 777px) {
      & > li:first-child > div {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
      & > li:not(:last-child) > div {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
      & > li:last-child > div {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  `;
  const Box = styled.div`
    padding: 30px 40px;
    background: var(--gr-primary);
    text-align: center;

    @media (min-width: 778px) {
      border-radius: 12px;
    }

    h3 {
      font-size: 32px;
      line-height: 1.2;
      font-weight: 800;
      margin-bottom: 5px;
    }
    p {
      font-size: 18px;
      line-height: 32px;
      margin-bottom: 0px;
    }
  `;
  return (
    <Section>
      <div className="container">
        <BoxRow className="list-unstyled row justify-content-xl-between g-md-4">
          {list &&
            list.map((item, i) => (
              <li
                key={i}
                className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token"
              >
                <Box>
                  {item.count && <h3 className="fw-bold">{item.count}</h3>}
                  {item.heading && <p className="mb-0">{item.heading}</p>}
                </Box>
              </li>
            ))}
        </BoxRow>
      </div>
    </Section>
  );
};

export default Stats;
