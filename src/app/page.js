'use client'

import { useEffect, useState } from "react";

import Web3 from "web3";
import {
  votingContractInstance,
} from "../service/service";

import Proposal from "./components/Proposal";
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null)
  const [votingContract, setVotingContract] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [countProposal, setCount] = useState(0);

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

        const votingContractInst = votingContractInstance(web3Instance);
        setVotingContract(votingContractInst);

      } catch (error) {
        // console.log(error);
        setErrorMessage(error.message);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  async function fetchData() {
    if(user.address && !web3) {
      handleConnectWallet();
    }

    if (votingContract) {
      const proposalCount = await votingContract.methods.proposalCount().call();
      console.log( "🚀 ~ file: index.js:116 ~ fetchData ~ proposalCount:", proposalCount);
      setCount(Number(proposalCount));
    }
  }

  useEffect(() => {
    fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 2000);

    // return () => clearInterval(interval);
  });

  return user.address ? (
    <>
    <NavBar />
    <main className="container">
      <section className="my-5">
        <p className="my-5 is-size-1 has-text-centered">VOTING LIST ({countProposal})</p>
        <p className="has-text-centered">(Voting require 20 COM)</p>
        <div className="columns is-multiline">
          {countProposal > 0 &&
            Array.from({ length: countProposal }, (_, index) => {
              return (
                <Proposal
                  votingContract={votingContract}
                  address={address}
                  id={index}
                  key={index}
                  web3={web3}
                />
              );
            })}
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
