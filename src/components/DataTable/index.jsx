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

const DataTable = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [laptop, setLaptop] = useState(
    window.matchMedia("(min-width: 778px)").matches
  );
  const { data: signer, isError, isLoading } = useSigner();
  console.log(signer);

  const provider = useProvider();
  const staking = new ethers.Contract(value.stakingAddress, stakingAbi, signer);
  const token = new ethers.Contract(value.qniTokenAddresstestnet, tokenAbi, signer);
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
  const [amountstaked1, setamountstaked1] = useState(0);
  const [amountstaked2, setamountstaked2] = useState(0);
  const [amountstaked3, setamountstaked3] = useState(0);


  useEffect(() => {
    refreshData(signer);
  if(signer){
    setIswalletconnected(true)
  }
  }, [signer, poolId]);



  function refreshData(signer) {
    if (signer) {
      signer.getAddress().then((res) => {
        setMyaddress(res);
      });
      checkApproved();
      const {rewards1, amount1} = getuserinfo(0);
      const {rewards2, amount2} = getuserinfo(1);
      const {rewards3, amount3} = getuserinfo(2);
      setreward_pool1(rewards1)
      setreward_pool2(rewards2)
      setreward_pool3(rewards3)
      setamountstaked1(amount1)
      setamountstaked2(amount2)
      setamountstaked3(amount3)
      console.log(rewards1, rewards2)
      getpoollength();
      getfeeaddress();
      getdevaddr();
      getUserQroni();
      
    }
  }

  async function deposit(poolId_selected) {
    try {
      console.log (poolId_selected)
        const amount = qronibalance;
        await approve();
        let _amount = ethers.utils.parseEther(amount.toString());
        let tx = await staking.deposit(poolId_selected, _amount);
        let receipt = await tx.wait();
        console.log("Stake Tx receipt: ", receipt);
        refreshData(signer);
    } catch (error) {
      console.log(error);
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
        console.log("error");
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
      }
    } 


  async function withdraw(poolId_selected) {
    try {
      let tx = await staking.withdraw(poolId_selected, amountloc);
      let receipt = await tx.wait();
      console.log("Withdraw tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error);
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }







  async function getpoolinfo() {
    try {
      var _poolinfo = await staking.poolInfo(poolId);
      const token_address = _poolinfo.lpToken.toString();
      const last_reward_block = _poolinfo.lastRewardBlock.toString();
      const acc_qni_per_share = _poolinfo.accQNIPerShare.toString();
      const depositfee = _poolinfo.depositFeeBP;
      console.log(depositfee);
      setDepositfee(depositfee);
      setPoolinfo(_poolinfo);
      setTokenaddress(token_address);
      setLastrewardblock(last_reward_block);
      setQnipershare(acc_qni_per_share);
    } catch (err) {
      console.log(err.message);
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
    }
  }

  async function getfeeaddress() {
    try {
      var _feeaddr = await staking.feeAddress.toString();
      console.log("Fee address: ", _feeaddr);
      setfeeaddress(_feeaddr);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getuserinfo(poolidindex) {
    try {
      var _userinfo = await staking.userInfo(poolidindex, signer.getAddress());
      console.log(_userinfo)
      const rewardDebt = await _userinfo.rewardDebt.toNumber();
      const amount = await _userinfo.amount.toNumber();
      setRewarddebt(rewardDebt);
      setAmountloc(amount);
      console.log("Reward debt ", rewardDebt);
      console.log("Amount: ", amount);
      return {rewardDebt, amount};   
    } catch (err) {
      console.log(err.message);
    }
  }




  async function getdevaddr() {
    try {
      const _devaddr = await staking.devaddr();
      setDevaddr(_devaddr);
      console.log("Dev address: ", devaddr);
    } catch (err) {
      console.log(err.message);
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

  const data = [
    {
      id: 1,
      stakeorfarmid:0,
      lockedDuration: "20 Days",
      PerfomanceFee: "15%",

      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Qroni-BNB LP",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountloc}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool1}`,
        },
      ],
    },
    {
      id: 1,
      stakeorfarmid:1,
      lockedDuration: "30 Days",
      PerfomanceFee: "15%",
      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Qroni-BNB LP",
        },
        {
          title: "Qroni Balance",
          content: `$ ${qronibalance}`,
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountloc}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool2}`,
        },
      ],
    },
    {
      id: 1,
      stakeorfarmid:2,
      lockedDuration: "50 Days",
      PerfomanceFee: "15%",
      list: [
        {
          icon: Icon,
        },
        {
          title: "Earn Qroni",
          content: "Qroni-BNB LP",
        },
        {
          title: "Earned",
          content: `$ ${rewarddebt}`,
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: `$ ${amountloc}`,
        },
        {
          title: "Earned",
          content: `$ ${reward_pool3}`,
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
                  <option value="">Choose One</option>
                  <option value="item-1">Item 1</option>
                  <option value="item-2">Item 2</option>
                  <option value="item-3">Item 3</option>
                  <option value="item-4">Item 4</option>
                  <option value="item-5">Item 5</option>
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
                  {data &&
                    data.map((item, i) => (
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
                                      Total Locked: {amountloc}
                                    </ListHeading>
                                    <ListHeading>
                                      Average Lock Duration: 
                                    </ListHeading>
                                    <ListHeading>Performance Fee: 15%</ListHeading>
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
                                        {iswalletconnected ? <button onclick={() => withdraw(item.stakeorfarmid)}> unstake </button>  : <ConnectButton />}
                                       
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
  );
};

export default DataTable;
