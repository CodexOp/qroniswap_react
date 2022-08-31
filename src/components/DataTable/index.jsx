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
import { useSigner, useProvider, useContract } from "wagmi";
import { _nameprepTableA1 } from "@ethersproject/strings/lib/idna";

const DataTable = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [laptop, setLaptop] = useState(
    window.matchMedia("(min-width: 778px)").matches
  );
  const { data: signer, isError, isLoading } = useSigner();
    console.log(signer)
    
    const provider = useProvider();
  // const staking = new ethers.Contract(value.stakingAddress, stakingAbi, signer);
  // const token = new ethers.Contract(value.stakingToken, tokenAbi, signer);
  const staking = useContract({
    addressOrName: value.stakingAddress,
    contractInterface: stakingAbi,

  });


  const token = useContract({
    addressOrName: value.tokenAddress,
    contractInterface: tokenAbi,
    signerOrProvider: provider,
  });

  const [poolId, setPoolId] = useState(0);
  const [poolLength, setPoolLength] = useState(0);
  const [amount, setAmount] = useState();
  const [istokenapproved, settokenapproved] = useState(false);
  const [myaddress, setMyaddress] = useState();
  const [poolinfo, setPoolinfo] = useState();
  const [tokenaddress, setTokenaddress] = useState();
  const [allocpoint, setAllocpoint] = useState();
  const [depositfee, setDepositfee] = useState();
  const [qnipershare, setQnipershare] = useState();
  const [lastrewardblock, setLastrewardblock] = useState();
  const [feeadress, setfeeaddress] = useState();
  const [rewarddebt, setRewarddebt] = useState();
  const [totalallocpoint, setTotalallocpoint] = useState();
  const [emissionrate, setEmissionrate] = useState();
  const [bonusmultiplier, setBonusmultiplier] = useState();
  const [multiplier, setMultiplier] = useState();
  const [devaddr, setDevaddr] = useState();
  const [owner, setOwner] = useState();
  const [pendingqni, setPendingqni] = useState();
  const [errors, setError] = useState();


  useEffect(() => {
    refreshData(signer);
  }, [signer, poolId]);

  function refreshData(signer) {
    if (signer) {
      signer.getAddress().then((res) => {
        setMyaddress(res);
      });
      getpoolinfo();
      getpoollength();
      getfeeaddress();
      getuserinfo();
      gettotalallocpoints();
      getbonusmultiplier();
      getdevaddr();
      getowner();
      getpendingqni();
    }
  }

  async function deposit() {
    try {
      if (amount === undefined) {
        alert("Enter amount first");
      } else {
        await approve();
        let _amount = ethers.utils.parseEther(amount.toString());
        let tx = await staking.deposit(poolId, _amount);
        let receipt = await tx.wait();
        console.log("Stake Tx receipt: ", receipt);
        refreshData(signer);
      }
    } catch (error) {
      console.log(error);
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
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

  async function withdraw() {
    try {
      let tx = await staking.withdraw(poolId, amount);
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

  async function emergencyWithdraw() {
    try {
      let tx = await staking.emergencyWithdraw(poolId);
      let receipt = tx.wait();
      console.log("Emergency withdraw Tx receipt ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function addpool() {
    try {
      let tx = await staking.add(
        allocpoint,
        value.tokenAddress,
        depositfee,
        true
      );
      let receipt = tx.wait();
      console.log("New pool added Tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function adddevaddr() {
    try {
      let tx = await staking.dev(myaddress);
      let receipt = tx.wait();
      console.log("Dev address changed, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function massupdatepools() {
    try {
      let tx = await staking.massUpdatePools();
      let receipt = tx.wait();
      console.log("Mass updated pools, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function setpool() {
    try {
      let tx = await staking.set(poolId, allocpoint, depositfee, true);
      let receipt = tx.wait();
      console.log("Pool is set, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function setstakingwallet() {
    try {
      let tx = await staking.setStakingWallet(myaddress);
      let receipt = tx.wait();
      console.log("Staking wallet is set, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function transferownership() {
    try {
      let tx = await staking.transferOwnership(myaddress); //parameter must be changed
      let receipt = tx.wait();
      console.log("Owner changed, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function updateemissionrate() {
    try {
      let tx = await staking.updateEmissionRate(emissionrate);
      let receipt = tx.wait();
      console.log("Qni emission rate changed, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function updatepool() {
    try {
      let tx = await staking.updatePool(poolId);
      let receipt = tx.wait();
      console.log("Pool updated, tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error.toString());
      try {
        setError(error.error.data.message);
      } catch {
        setError("Something went wrong, please try again!");
      }
    }
  }

  async function getpoolinfo() {
    try {
      var _poolinfo = await staking.poolinfo(poolId);
      const token_address = _poolinfo.lpToken.toString();
      const allocation_point = _poolinfo.allocPoint.toString();
      const last_reward_block = _poolinfo.lastRewardBlock.toString();
      const acc_qni_per_share = _poolinfo.accQNIPerShare.toString();
      const depositfee = _poolinfo.depositFeeBP.toString();
      setAllocpoint(allocation_point);
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

  async function getuserinfo() {
    try {
      var _userinfo = await staking.userInfo();
      const rewardDebt = _userinfo.rewardDebt.toString();
      const amount = _userinfo.amount.toString();
      setRewarddebt(rewardDebt);
      console.log("Reward debt ", rewardDebt);
      console.log("Amount: ", amount);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function gettotalallocpoints() {
    try {
      var _totalalloc = await staking.totalAllocPoint().toString();
      setTotalallocpoint(_totalalloc);
      console.log("Total allocation points ", totalallocpoint);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getbonusmultiplier() {
    try {
      var _bonusmultiplier = await staking.BONUS_MULTIPLIER.toString();
      setBonusmultiplier(_bonusmultiplier);
      console.log("Bonus multiplier: ", bonusmultiplier);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getdevaddr() {
    try {
      var _devaddr = await staking.devaddr.toString();
      setDevaddr(_devaddr);
      console.log("Dev address: ", devaddr);
    } catch (err) {
      console.log(err.message);
    }
  }

  // async function getmultiplier(){
  //
  // }
  async function getowner() {
    try {
      var _owner = await staking.owner.toString();
      setOwner(_owner);
      console.log("Owner: ", _owner);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getpendingqni() {
    try {
      var _pendingqni = await staking.pendingQNI(poolId, myaddress);
      const pqni = _pendingqni.toString();
      console.log("pending qni: ", pqni);
      setPendingqni(pqni);
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
        },
      ],
    },
    {
      id: 1,
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
          content: "0",
        },
        {
          title: "APR",
          content: "41.68%",
        },
        {
          title: "Total Staked",
          content: "$6,881,690",
        },
        {
          title: "Earned",
          content: "$0.00",
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
                                    <ListHeading>Total Locked:</ListHeading>
                                    <ListHeading>
                                      Average Lock Duration:
                                    </ListHeading>
                                    <ListHeading>Performance Fee:</ListHeading>
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
                                          <h5>123.1267989273515344790</h5>
                                        </div>
                                        <div className="align-self-end">
                                          <button className="btn btn-gr-primary">
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
                                      <button className="btn btn-gr-primary">
                                        Connect Wallet
                                      </button>
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
