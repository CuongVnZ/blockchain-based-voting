'use client'

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
  const [address, setAddress] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [votingContract, setVotingContract] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [description, setDescription] = useState(null);

  const user = useSelector(state=>state.user)

  const handleConnectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAddress(accounts[0]);

        const tokenContractInst = tokenContractInstance(web3Instance);
        setTokenContract(tokenContractInst);
        const votingContractInst = votingContractInstance(web3Instance);
        setVotingContract(votingContractInst);

        const balance = await tokenContractInst.methods.balanceOf(accounts[0]).call();
        // console.log(balance)
        setBalance(web3Instance.utils.fromWei(balance, "ether"));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSumbitProposal = async () => {
    try {
      const allowance = await tokenContract.methods.allowance(address, votingContract._address).call();
      if (Number(web3.utils.fromWei(allowance, "ether")) < 20) {
        await tokenContract.methods.approve(votingContract._address, BigInt(20 * 10 ** 18)).send({
          from: address,
        });
      }
      await votingContract.methods.createProposal(description).send({
        from: address,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if(user.address) {
      handleConnectWallet();
    }
  });

  return user.address ? (
    <>
    <NavBar />
    <main className="container">
      <section>
          <div className="field my-5"> 
            <label className=" lable">Create a poll for your community (Require 20 COM)</label>
            <div className=" controle mt-2">
              <input onChange={updateDescription} className="input" type=" type" placeholder=" Enter description..." />
            </div>
            <button onClick={handleSumbitProposal} className="button is-primary mt-2" >Create</button>
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
