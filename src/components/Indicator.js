import React from 'react';
import "./Indicator.css";

export default function Indicator(props) {
    const indicatorStyle = props.enabled ? "indicator-enabled" : "indicator-disabled"

    return (
        <div className={indicatorStyle}>
            <div className="caption">{props.caption}</div>
        </div>
    );
}
