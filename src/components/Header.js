import React, { useState } from 'react';

import logo from '../assets/logo.png';
import { FaAlignJustify, ImStarEmpty, ImStarFull } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MyModal from './modal/Modal';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { suniTokenAddress, busdTokenAddress } from '../contract_ABI/vestingData';

const Header =() => {
    const {account} = useEthers();
    const tokenBalance = useTokenBalance(suniTokenAddress, account);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [star, setStar] = useState(true);

    function handleToggle(){
        setIsOpen(!isOpen);
    };

    function handleStar(){
        setStar(!star);
    }

    function connectWallet(){
        setIsOpenModal(true);
    }

    return (
        <>
        <section className="header">
            <nav className="navbar">
                <a className="cursor-pointer">
                    <img src={logo} alt="logo"></img>
                    <span className='title'>Sassy Unicorns</span>
                </a>
                <div className="nav-center">
                    <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                        {!account && (
                            <li className=" d-flex hd-btn"><button className="btn btn-wallet wallet-default my-auto" onClick={connectWallet}> Connect Wallet </button></li>
                        ) || (
                            <li className='hd-btn'><button className="btn btn-wallet wallet-connected " onClick={connectWallet}> { String(account).substring(0, 6) + "..." + String(account).substring(38) + " : " + (tokenBalance ? Number(tokenBalance/10**18).toFixed(2) : 0 ) + '  SUNI' } </button></li>
                        )}
                    </ul>
                    <ul className="nav-mobile">
                        <li>
                            <button type="button" className="nav-btn" onClick={handleToggle}><FaAlignJustify className="nav-icon" /></button>
                        </li>
                        {<li>{star ?
                            <button type="button" className="nav-btn" onClick={handleStar}>
                                <ImStarEmpty className="nav-icon" />
                            </button>
                            : <button type="button" className="nav-btn" onClick={handleStar}>
                                <ImStarFull className="nav-icon" />
                            </button>}
                        </li>}
                    </ul>
                </div>
            </nav>
            <MyModal isOpen = { isOpenModal } setIsOpen = {setIsOpenModal} onlyOneToast = {false}/>
        </section>
        </>
    );
}

export default Header;
