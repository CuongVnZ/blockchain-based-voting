'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'

import Web3 from "web3";
import {
  tokenContractInstance,
  votingContractInstance,
} from "@/service/service";

import { setUser, setUserBalance } from "@/redux/authSlice";
import { setInstance, setTokenContract, setVotingContract } from "@/redux/web3Slice";

export default function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector(state=>state.user)

  const handleConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();

        const tokenContractInst = tokenContractInstance(web3Instance);
        const balance = await tokenContractInst.methods.balanceOf(accounts[0]).call();

        dispatch(setUser(accounts[0]));
        dispatch(setUserBalance(web3Instance.utils.fromWei(balance, "ether")));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  return (
    <>
    <nav className="navbar">
      <div className="container">
      <div className="navbar-brand">
        <div className="navbar-item">
          <h1>Blockchain-Based Voting</h1>
        </div>
      </div>

      <div className="navbar-menu" id="nav-links">
        <div className="navbar-start">
          <Link href="/" className="navbar-item">Home</Link>
          <Link href="/create" className="navbar-item">Create Poll</Link>
          <Link href="/deposit" className="navbar-item">Deposit</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {!user.address && (<button className="button is-primary" onClick={handleConnectWallet}>Connect Wallet</button>)}
            {user.address && (<p>{user.address}</p>)}
          </div>
        </div>
      </div>
      </div>
    </nav>
    <section className="container">
      <div className="mt-2">
        <p>Your balance: {user.balance} COM (Community Token)</p>
      </div>
    </section>
    </>
  )
}