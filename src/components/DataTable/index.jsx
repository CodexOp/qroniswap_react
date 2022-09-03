import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CBCheckbox } from "../../styled-components";
import Icon from "./img/qroni-icon.svg";
import LinkIcon from "./img/link-icon.svg";
import { FiSearch } from "react-icons/fi";
import { ethers } from "ethers";
import stakingAbi from "../../stakingAbi.json";
import tokenAbi from "../../tokenAbi.json";
import value from "../../value.json";
import { useSigner, useProvider, useContract, useBalance } from "wagmi";
import { _nameprepTableA1 } from "@ethersproject/strings/lib/idna";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useHistory, useLocation } from 'react-router-dom';
import { event } from "jquery";
const DataTable = ({databool}) => {
  const location = useLocation();
 
  const [isOpen, setIsOpen] = useState(null);
  const [laptop, setLaptop] = useState(
    window.matchMedia("(min-width: 778px)").matches
  );
  const { data: signer, isError, isLoading } = useSigner();

  const provider = useProvider();
  const staking = new ethers.Contract(value.stakingAddress, stakingAbi, signer);
  let token = new ethers.Contract(value.qniTokenAddress, tokenAbi, signer);
  // const staking = useContract({
  //   addressOrName: value.stakingAddress,
  //   contractInterface: stakingAbi,
  //   signer
  // });


  // const token = useContract({
  //   addressOrName: value.qniTokenAddresstestnet,
  //   contractInterface: tokenAbi,
  //   signerOrProvider: provider,
  // });

  const [iswalletconnected, setIswalletconnected] = useState(false);
  const [poolId, setPoolId] = useState(0);
  const [poolLength, setPoolLength] = useState(0);
  const [amount, setAmount] = useState();
  const [amountloc, setAmountloc] = useState(0);
  const [istokenapproved, settokenapproved] = useState(false);
  const [myaddress, setMyaddress] = useState();
  const [poolinfo, setPoolinfo] = useState();
  const [tokenaddress, setTokenaddress] = useState();
  const [allocpoint, setAllocpoint] = useState();
  const [depositfee, setDepositfee] = useState();
  const [qnipershare, setQnipershare] = useState();
  const [lastrewardblock, setLastrewardblock] = useState();
  const [feeadress, setfeeaddress] = useState();
  const [rewarddebt, setRewarddebt] = useState(0);
  const [devaddr, setDevaddr] = useState(0);
  const [errors, setError] = useState();
  const [qronibalance, setqronibalance] = useState(0);
  const [reward_pool1, setreward_pool1] = useState(0);
  const [reward_pool2, setreward_pool2] = useState(0);
  const [reward_pool3, setreward_pool3] = useState(0);
  const [reward_pool4, setreward_pool4] = useState(0);
  const [reward_pool5, setreward_pool5] = useState(0);
  const [reward_pool6, setreward_pool6] = useState(0);
  const [reward_pool7, setreward_pool7] = useState(0);
  const [reward_pool8, setreward_pool8] = useState(0);
  const [amountstaked1, setamountstaked1] = useState(0);
  const [amountstaked2, setamountstaked2] = useState(0);
  const [amountstaked3, setamountstaked3] = useState(0);
  const [amountstaked4, setamountstaked4] = useState(0);
  const [amountstaked5, setamountstaked5] = useState(0);
  const [amountstaked6, setamountstaked6] = useState(0);
  const [amountstaked7, setamountstaked7] = useState(0);
  const [amountstaked8, setamountstaked8] = useState(0);
  const [fee1, setfee1] = useState(0);
  const [fee2, setfee2] = useState(0);
  const [fee3, setfee3] = useState(0);
  const [fee4, setfee4] = useState(0);
  const [fee5, setfee5] = useState(0);
  const [fee6, setfee6] = useState(0);
  const [fee7, setfee7] = useState(0);
  const [fee8, setfee8] = useState(0);
  const [share1, setShare1] = useState(0);
  const [share2, setShare2] = useState(0);
  const [share3, setShare3] = useState(0);
  const [share4, setShare4] = useState(0);
  const [share5, setShare5] = useState(0);
  const [share6, setShare6] = useState(0);
  const [share7, setShare7] = useState(0);
  const [share8, setShare8] = useState(0);
  const [isStake, setIsStake] = useState(true);
  const [inputStakeAmount, setInputStakeAmount] = useState(0);

  useEffect(() => {
    refreshData(signer);
    if(location.pathname === "/farming"){
      token = new ethers.Contract(value.lpPair, tokenAbi, signer);
      setIsStake(false)
    }
    else{
      token = new ethers.Contract(value.qniTokenAddress, tokenAbi, signer);
      setIsStake(true)
    }



  if(signer){
    setIswalletconnected(true)
  }
  }, [signer, poolId, location]);



  async function refreshData(signer) {
    if (signer) {
      signer.getAddress().then((res) => {
        setMyaddress(res);
      });
      checkApproved();
      const {rewardDebt: rewards1, amount: amount1} = await getuserinfo(0);
      const {rewardDebt: rewards2, amount: amount2} = await getuserinfo(1);
      const {rewardDebt: rewards3, amount: amount3} = await getuserinfo(2);
      const {rewardDebt: rewards4, amount: amount4} = await getuserinfo(3);
      const {rewardDebt: rewards5, amount: amount5} = await getuserinfo(4);
      const {rewardDebt: rewards6, amount: amount6} = await getuserinfo(5);
      const {rewardDebt: rewards7, amount: amount7} = await getuserinfo(6);
      const {rewardDebt: rewards8, amount: amount8} = await getuserinfo(7);
      setreward_pool1(rewards1)
      setreward_pool2(rewards2)
      setreward_pool3(rewards3)
      setreward_pool4(rewards4)
      setreward_pool5(rewards5)
      setreward_pool6(rewards6)
      setreward_pool7(rewards7)
      setreward_pool8(rewards8)
      setamountstaked1(amount1)
      setamountstaked2(amount2)
      setamountstaked3(amount3)
      setamountstaked4(amount4)
      setamountstaked5(amount5)
      setamountstaked6(amount6)
      setamountstaked7(amount7)
      setamountstaked8(amount8)
      const {depositfee: fee1, acc_qni_per_share: share1} = await getpoolinfo(0);
      const {depositfee: fee2, acc_qni_per_share: share2} = await getpoolinfo(1);
      const {depositfee: fee3, acc_qni_per_share: share3} = await getpoolinfo(2);
      const {depositfee: fee4, acc_qni_per_share: share4} = await getpoolinfo(3);
      const {depositfee: fee5, acc_qni_per_share: share5} = await getpoolinfo(4);
      const {depositfee: fee6, acc_qni_per_share: share6} = await getpoolinfo(5);
      const {depositfee: fee7, acc_qni_per_share: share7} = await getpoolinfo(6);
      const {depositfee: fee8, acc_qni_per_share: share8} = await getpoolinfo(7);
      setfee1(fee1)
      setfee2(fee2)
      setfee3(fee3)
      setfee4(fee4)
      setfee5(fee5)
      setfee6(fee6)
      setfee7(fee7)
      setfee8(fee8)
      setShare1(share1)
      setShare2(share2)
      setShare3(share3)
      setShare4(share4)
      setShare5(share5)
      setShare6(share6)
      setShare7(share7)
      setShare8(share8)
      getpoollength();
      getfeeaddress();
      getdevaddr();
      getUserQroni();
      
    }
  }

  const hanglechange = (event) => {
    setInputStakeAmount(event.target.value)
  }


  async function deposit(poolId_selected) {
    try {
      console.log (poolId_selected)
          console.log(inputStakeAmount)
        const amount = inputStakeAmount;
        await approve();
        let _amount = ethers.utils.parseUnits(amount.toString(), 9);
        let tx = await staking.deposit(poolId_selected, _amount);
        let receipt = await tx.wait();
        console.log("Stake Tx receipt: ", receipt);
        refreshData(signer);
    } catch (error) {
      console.log(error);
      alert(error.error.data.message)
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }


  const checkApproved = async() => {
    let userAddress = await signer.getAddress()
    const isApproved = await token.allowance(userAddress, value.stakingAddress);
    const totaltokenapproved = isApproved.toString()
    if(totaltokenapproved.length > 2){
      console.log("approved", totaltokenapproved);
      settokenapproved(true)
    }
    else{
      console.log("Not Approved",totaltokenapproved);
      settokenapproved(false)

    }
  }

  async function approve() {
    if (!istokenapproved) {
      console.log("Not approved");
      try {
        let _amount = ethers.utils.parseEther("10000000000000000000");
        let tx = await token.approve(value.stakingAddress, _amount);
        let receipt = await tx.wait();
        console.log("Approve tx receipt: ", receipt);
      } catch (error) {
       alert(error.error.data.message)
      }
    } else {
      console.log("already approved");
    }
  }

  async function getUserQroni() {
      try {
        let qroni = await token.balanceOf(await signer.getAddress());
        console.log ("Qroni: ", qroni)
        const qroniconverted = ethers.utils.formatUnits(qroni, 9)
        console.log(qroniconverted)
        setqronibalance(qroniconverted)
      } catch (error) {
        console.log(error);
        alert(error.error.data.message)

      }
    } 


  async function withdraw(poolId_selected, amountunstake) {
    try {
      console.log(`amount to unstake`+amountunstake);
      const amountwithdraw = ethers.utils.parseUnits(amountunstake.toString(), 9)
      console.log(amountwithdraw)
      let tx = await staking.withdraw(poolId_selected, amountwithdraw);
      let receipt = await tx.wait();
      console.log("Withdraw tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error);
      alert(error.error.data.message)
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }







  async function getpoolinfo(poolids) {
    try {
      var _poolinfo = await staking.poolInfo(poolids);
      const token_address = _poolinfo.lpToken.toString();
      const last_reward_block = _poolinfo.lastRewardBlock.toString();
      const acc_qni_per_share = _poolinfo.accQNIPerShare.toString();
      const depositfee = _poolinfo.depositFeeBP.toString();
      console.log(depositfee);
      setDepositfee(depositfee);
      setPoolinfo(_poolinfo);
      setTokenaddress(token_address);
      setLastrewardblock(last_reward_block);
      setQnipershare(acc_qni_per_share);
      return {depositfee, acc_qni_per_share}
    } catch (err) {
      console.log(err);
      return {depositfee: 0, acc_qni_per_share: 0, }
    }
  }

  

  async function getpoollength() {
    try {
      var _poollength = await staking.poolLength();
      const poollength = _poollength.toString();
      console.log("pool length: ", poollength);
      setPoolLength(poollength);
    } catch (err) {
      console.log(err.message);
      alert(err.error.data.message)

    }
  }

  async function getfeeaddress() {
    try {
      var _feeaddr = await staking.feeAddress.toString();
      console.log("Fee address: ", _feeaddr);
      setfeeaddress(_feeaddr);
    } catch (err) {
      console.log(err.message);
      alert(err.error.data.message)

    }
  }

  async function getuserinfo(poolidindex) {
    try {
      var _userinfo = await staking.userInfo(poolidindex, signer.getAddress());
      console.log(_userinfo)
      const rewardfetched = await _userinfo.rewardDebt;
      const rewardDebt = ethers.utils.formatUnits(rewardfetched.toString(), 9);
      const amountconverted = await _userinfo.amount;
      const amount = ethers.utils.formatUnits(amountconverted.toString(), 9)
      console.log(amountconverted)
      setRewarddebt(rewardDebt);
      console.log("Reward debt ", rewardDebt);
      console.log("Amount: ", amount);
      return {rewardDebt, amount};   
    } catch (err) {
      console.log(err.message);
      alert(err.error.data.message)

    }
  }




  async function getdevaddr() {
    try {
      const _devaddr = await staking.devaddr();
      setDevaddr(_devaddr);
      console.log("Dev address: ", devaddr);
    } catch (err) {
      console.log(err.message);
      alert(err.error.data.message)

    }
  }


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const handler = (e) => setLaptop(e.matches);
    window.matchMedia("(min-width: 778px)").addEventListener("change", handler);
  });

  const onClickRowOpenHandle = ($id) => {
    setIsOpen($id);
  };

  const onClickRowCloseHandle = () => {
    setIsOpen(null);
  };

  const stakedata = [
    {
      id: 1,
      stakeorfarmid:0,
      QniPerShare: share1,
      PerfomanceFee: fee1,
      tokenlocked:amountstaked1,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake QNI",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "300%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked1}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool1}`,
        },
      ],
    },
    {
      id: 2,
      stakeorfarmid:1,
      QniPerShare: share2,
      PerfomanceFee: fee2,
      tokenlocked:amountstaked1,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake VCE",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "100%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked2}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool2}`,
        },
      ],
    },
    {
      id: 3,
      stakeorfarmid:2,
      QniPerShare: share3,
      PerfomanceFee: fee3,
      tokenlocked:amountstaked3,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake BNB",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "120%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked3}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool3}`,
        },
      ],
    },
    {
      id: 4,
      stakeorfarmid:3,
      QniPerShare: share4,
      PerfomanceFee: fee4,
      tokenlocked:amountstaked4,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake BTC",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "150%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked4}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool4}`,
        },
      ],
    },
    {
      id: 5,
      stakeorfarmid:4,
      QniPerShare: share5,
      PerfomanceFee: fee5,
      tokenlocked:amountstaked5,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake ETH",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "150%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked5}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool5}`,
        },
      ],
    },
    {
      id: 6,
      stakeorfarmid:5,
      QniPerShare: share6,
      PerfomanceFee: fee6,
      tokenlocked:amountstaked6,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Stake CAKE",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "150%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked6}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool6}`,
        },
      ],
    },
  ];
  const pooldata = [
    {
      id: 1,
      stakeorfarmid:6,
      QniPerShare: share7,
      PerfomanceFee: fee7,
      tokenlocked:amountstaked7,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "BNB-QNI Lp",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "300%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked7}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool7}`,
        },
      ],
    },
    {
      id: 8,
      stakeorfarmid:7,
      QniPerShare: share8,
      PerfomanceFee: fee8,
      tokenlocked:amountstaked8,

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "VCE - QNI Lp",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "100%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountstaked8}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool8}`,
        },
      ],
    },
    
  ];
  const Section = styled.section``;
  const TableBox = styled.div`
    width: 100%;
    background-color: #fdfdfd;
    color: #333333;
    border-radius: 8px;

    .btn {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0.2px;
      padding: 10px 20px;
      border-radius: 4px;
      color: #fff;
    }

    h6 {
      color: #4f4f4f;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
    h5 {
      font-size: 16px;
      line-height: 1;
      letter-spacing: 0.2px;
    }

    table {
      width: 100%;

      td {
        padding: 10px 15px;
        border-bottom: 1px solid rgba(102, 112, 133, 0.2);
        @media (min-width: 991px) {
          padding: 20px;
        }

        &:last-child {
          text-align: center;
        }

        &:nth-child(2) {
          h4 {
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
          }
        }
        &:not(:nth-child(2)) {
          h4 {
            font-size: 16px;
            font-weight: 500;
            line-height: 1;
          }
        }
      }
    }
  `;
  const ButtonBox = styled.div`
    display: inline-block;
    background-color: #f0eff0;
    border-radius: 4px;
    padding: 15px;
    text-align: start;
  `;
  const HeadingFilter = styled.div`
    display: flex;
    align-items: stretch;
    gap: 1rem;
    margin: 50px 0;

    .search-group {
      display: inline-flex;
      align-items: center;
      background-color: #fff;
      color: #000;
      padding: 10px 20px;
      border-radius: 8px;

      svg {
        font-size: 16px;
        min-width: 15px;
      }

      input {
        border: 0;
        outline: none;
        box-shadow: none;
        width: 100%;
      }
    }
    .select-group select {
      height: 100%;
      padding: 10px 20px;
      border-radius: 8px;
    }
  `;
  const Details = styled.tr``;
  const ListHeading = styled.div`
    font-size: 12px;
    line-height: 2;
    font-weight: 500;
    color: #364073;
  `;



  return (
    <div>
      {isStake ? 
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Heading */}
            <HeadingFilter>
              {/* Input Group */}
              <div className="search-group">
                <FiSearch className="me-1 me-md-3" />
                <input type="text" placeholder="Search" />
              </div>
              {/* Input Select */}
              <div className="select-group">
                <select name="" id="">
                  <option value="">Sort</option>
                  <option value="item-1">Hot</option>
                  <option value="item-2">Date</option>
                  <option value="item-3">Rate</option>
                  <option value="item-4">% APR</option>
                </select>
              </div>
              {/* Input Select */}
              <div className="checkbox-group align-self-center">
                <CBCheckbox>
                  <input id="checkbox-1" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cb-checkbox">
                    Staked
                  </label>
                </CBCheckbox>
              </div>
            </HeadingFilter>
            <TableBox>
              <table>
                <tbody>
                  {stakedata &&
                    stakedata.map((item, i) => (
                      <>
                        {!laptop ? (
                          <>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(0, 2).map((sub, subIdx) => (
                                  <td
                                    key={subIdx}
                                    className={sub.icon ? "pe-0" : "text-start"}
                                    width={sub.icon ? 53 : ""}
                                    colSpan={sub.icon ? 1 : 5}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(2, 5).map((sub, subIdx) => (
                                  // {item.list && item.list.map((sub, subIdx) =>(
                                  <td
                                    key={subIdx}
                                    className={sub.icon ? "pe-0" : ""}
                                    width={sub.icon ? 53 : ""}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                          </>
                        ) : (
                          <tr
                            key={i}
                            onClick={
                              isOpen !== null && isOpen === i
                                ? onClickRowCloseHandle
                                : () => onClickRowOpenHandle(i)
                            }
                          >
                            {item.list &&
                              item.list.map((sub, subIdx) => (
                                // {item.list && item.list.map((sub, subIdx) =>(
                                <td
                                  key={subIdx}
                                  className={sub.icon ? "pe-0" : ""}
                                  width={sub.icon ? 53 : ""}
                                >
                                  {sub.icon && (
                                    <img src={sub.icon} width={53} alt="" />
                                  )}
                                  {sub.title && <h6>{sub.title}</h6>}
                                  {sub.content && <h4>{sub.content}</h4>}
                                </td>
                              ))}
                          </tr>
                        )}
                        {isOpen !== null && isOpen === i && (
                          <Details>
                            <td colSpan={6}>
                              <div className="row align-items-center gy-4">
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <ListHeading>
                                      Total Locked: {item.tokenlocked}
                                    </ListHeading>
                                    <ListHeading>
                                      Qni Per Share: {item.QniPerShare} 
                                    </ListHeading>
                                    <ListHeading>Performance Fee: {item.PerfomanceFee}</ListHeading>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>Get Qroni-BNB LP</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>View Contract</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>See Pair Info</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                  <input placeholder="Amount" value={inputStakeAmount} type="number" className="amount_input" onChange={e => hanglechange(e)} autoFocus="autofocus"/>

                                    <ButtonBox>
                                      <div className="d-flex flex-wrap gap-2 gap-lg-4">
                                        <div>
                                          <h6>Qroni Earned</h6>
                                          <h5>$ {rewarddebt}</h5>
                                        </div>
                                        <div className="align-self-end">
                                          <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid)}
                                          >
                                            Harvest
                                          </button>
                                        </div>
                                      </div>
                                    </ButtonBox>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                      
                                      <h6>Start Farming</h6>
                                        {iswalletconnected ? <button onClick={() => withdraw(item.stakeorfarmid, item.tokenlocked)} className="btn btn-gr-primary"> unstake </button>  : <ConnectButton />}
                                       
                                    </ButtonBox>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </Details>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </TableBox>
          </div>
        </div>
      </div>
    </Section>
    :<div>
      {/* pool section started  */}
      <Section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Heading */}
            <HeadingFilter>
              {/* Input Group */}
              <div className="search-group">
                <FiSearch className="me-1 me-md-3" />
                <input type="text" placeholder="Search" />
              </div>
              {/* Input Select */}
              <div className="select-group">
                <select name="" id="">
                  <option value="">Sort</option>
                  <option value="item-1">Hot</option>
                  <option value="item-2">Date</option>
                  <option value="item-3">Rate</option>
                  <option value="item-4">% APR</option>
                </select>
              </div>
              {/* Input Select */}
              <div className="checkbox-group align-self-center">
                <CBCheckbox>
                  <input id="checkbox-1" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cb-checkbox">
                    Staked
                  </label>
                </CBCheckbox>
              </div>
            </HeadingFilter>
            <TableBox>
              <table>
                <tbody>
                  {pooldata &&
                    pooldata.map((item, i) => (
                      <>
                        {!laptop ? (
                          <>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(0, 2).map((sub, subIdx) => (
                                  <td
                                    key={subIdx}
                                    className={sub.icon ? "pe-0" : "text-start"}
                                    width={sub.icon ? 53 : ""}
                                    colSpan={sub.icon ? 1 : 5}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(2, 5).map((sub, subIdx) => (
                                  // {item.list && item.list.map((sub, subIdx) =>(
                                  <td
                                    key={subIdx}
                                    className={sub.icon ? "pe-0" : ""}
                                    width={sub.icon ? 53 : ""}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                          </>
                        ) : (
                          <tr
                            key={i}
                            onClick={
                              isOpen !== null && isOpen === i
                                ? onClickRowCloseHandle
                                : () => onClickRowOpenHandle(i)
                            }
                          >
                            {item.list &&
                              item.list.map((sub, subIdx) => (
                                // {item.list && item.list.map((sub, subIdx) =>(
                                <td
                                  key={subIdx}
                                  className={sub.icon ? "pe-0" : ""}
                                  width={sub.icon ? 53 : ""}
                                >
                                  {sub.icon && (
                                    <img src={sub.icon} width={53} alt="" />
                                  )}
                                  {sub.title && <h6>{sub.title}</h6>}
                                  {sub.content && <h4>{sub.content}</h4>}
                                </td>
                              ))}
                          </tr>
                        )}
                        {isOpen !== null && isOpen === i && (
                          <Details>
                            <td colSpan={6}>
                              <div className="row align-items-center gy-4">
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <ListHeading>
                                      Total Locked: {item.tokenlocked}
                                    </ListHeading>
                                    <ListHeading>
                                      Qni Per Share: {item.QniPerShare} 
                                    </ListHeading>
                                    <ListHeading>Performance Fee: {item.PerfomanceFee}</ListHeading>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>Get Qroni-BNB LP</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>View Contract</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>See Pair Info</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                    <input onChange={event=>{hanglechange(event.target.value)}}  placeholder="Amount" type="number" className="amount_input" autoFocus="autofocus"/>

                                      <div className="d-flex flex-wrap gap-2 gap-lg-4">
                                        <div>
                                          <h6>Qroni Earned</h6>
                                          <h5>$ {rewarddebt}</h5>
                                        </div>
                                        <div className="align-self-end">
                                          <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid)}
                                          >
                                            Harvest
                                          </button>
                                        </div>
                                      </div>
                                    </ButtonBox>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                      <h6>Start Farming</h6>
                                        {iswalletconnected ? <button onClick={() => withdraw(item.stakeorfarmid, item.tokenlocked)} className="btn btn-gr-primary"> unstake </button>  : <ConnectButton />}
                                       
                                    </ButtonBox>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </Details>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </TableBox>
          </div>
        </div>
      </div>
    </Section>



    </div> }
    </div>
  );
};

export default DataTable;
