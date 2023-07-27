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
    <nav className="navbar is-light">
      <div className="container">
      <div className="navbar-brand">
        <div className="navbar-item">
          <p className="is-size-5 has-text-weight-semibold">BLOCKCHAIN VOTING</p>
        </div>
      </div>

      <div className="navbar-menu" id="nav-links">
        <div className="navbar-start">
          <Link href="/" className="navbar-item">Home</Link>
          <Link href="/create" className="navbar-item">Create</Link>
          <Link href="/deposit" className="navbar-item">Deposit</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {!user.address && (<button className="button is-link" onClick={handleConnectWallet}>Connect Wallet</button>)}
            {/* {user.address && (<p>{user.address}</p>)} */}
            {user.address && (<p>{user.address.slice(0,5)}...{user.address.slice(-4)}</p>)}
          </div>
        </div>
      </div>
      </div>
    </nav>
    </>
  )
}