import React from 'react';
import "./Header.css"
import logo from "../hyped.png"

export default function Header(props) {
    
    return (
        <header className="header-root">
            <img src={logo} className="hyped-logo" alt="logo" />
            <p>position here</p>
            <p>time</p>
            <p>
              {props.connectedToBackend ? 'connected' : 'disconnected'} 
            </p>
        </header>
    );
}

