import React from 'react';
import "./Header.css"

export default function Header(props) {
    
    return (
        <header className="header-root">
            <p>logo here</p>
            <img src="../hyped.png" className="hyped-logo" alt="logo" />
            <p style={{alignSelf:"center"}}>position here</p>
            <p style={{marginLeft:"67%"}}>
              {props.connectedToBackend ? 'connected' : 'disconnected'} 
            </p>
        </header>
    );
}

