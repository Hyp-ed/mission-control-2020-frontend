import React, {useState, useEffect} from 'react';
import "./Header.css"
import logo from "../hyped.png"

export default function Header(props) {
    const [timerState, setTimerState] = useState(false);
    const [time, setTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    
    const podConnectionStyle = props.connectedToPod
                                ? "pod-connection connected"
                                : "pod-connection disconnected";

    const startTimer = () => {
        console.log(Date.now)
        setStartTime(Date.now);
        setTimerState(true);
        setTime(0);
    };

    const stopTimer = () => {
        setTimerState(false)
    };
    
    useEffect(() => {
        console.log(Date.now);
        if (timerState) {
            setTime(Date.now-startTime);
        }
    })

    return (
        <header className="header-root">
            <img src={logo} className="hyped-logo" alt="logo" />
            <p>position here</p>
            <button onClick = {() => startTimer()}>start timer</button>
            <button onClick = {() => stopTimer()}>stop timer</button>
            <div className="timer">{time.toLocaleTimeString}</div>
            <div className="pod-status">
                <div className={podConnectionStyle}>
                    {props.connectedToPod
                        ? 'CONNECTED'
                        : 'DISCONNECTED'}
                </div>
                <div className="pod-state">{props.podState}</div>
                <div className="backend-connection">
                    {props.connectedToBackend
                        ? '' 
                        : 'NOT CONNECTED TO BACKEND'}
                </div>
            </div>
        </header>
    );
}

Header.defaultProps = {
    podState: "",
}

