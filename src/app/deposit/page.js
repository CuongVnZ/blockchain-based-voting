'use client'

import "bulma/css/bulma.css";

import { useEffect, useState } from "react";

import Web3 from "web3";
import {
  tokenContractInstance,
  votingContractInstance,
} from "@/service/service";

import NavBar from '@/app/components/NavBar';
import { useSelector } from 'react-redux';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [amountDeposit, setAmountDeposit] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const user = useSelector(state=>state.user)

  const updateAmountDeposit = (e) => {
    setAmountDeposit(e.target.value);
  };

  const handleConnectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const tokenContractInst = tokenContractInstance(web3Instance);
        setTokenContract(tokenContractInst);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  const handleDeposit = async () => {
    try {
      await tokenContract.methods.deposit().send({
        from: user.address,
        value: Number(amountDeposit) * 10 ** 18,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if(user.address && !web3) {
      handleConnectWallet();
    }
  });

  return user.address ? (
    <>
    <NavBar />
    <main className="container">
      <section>
        <div className=" field my-5">
          <label className=" lable">Enter your amoutn of KLAY you want to deposit (0.1 KLAY = 1000 COM)</label>
          <div className=" controle mt-2">
            <input onChange={updateAmountDeposit} className=" input" type=" type" placeholder=" Enter a number..."/>
          </div>
          <button onClick={handleDeposit} className=" button is-primary mt-2" > Deposit </button>
        </div>
      </section>
      
      <section>
        <div className="has-text-danger">
          <p>{errorMessage}</p>
        </div>
      </section>
    </main>
    </>
  ) : (
    <>
      <NavBar />
      <section>
        <div className="has-text-danger">
          <p>Please connect wallet</p>
        </div>
      </section>
    </>
  )
}
