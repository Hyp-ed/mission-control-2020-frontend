import React from 'react';
import "./Status.css";
import Indicator from './Indicator';

export default function Status(props) {
    
    if (props.isInactive) {
        return(null);
    }

    return (
        <div className="status-root">
            <div className="imu-status">
                <div className="title">IMUS</div>
                <div className="indicator-box">
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                </div>
            </div>
            <div className="module-status">
                <div className="title">MODULES</div>
                <div className="indicator-box">
                    <Indicator caption="MOT" enabled={true}/>
                    <Indicator caption="BAT" enabled={false}/>
                    <Indicator caption="SEN" enabled={true}/>
                    <Indicator caption="TEL" enabled={true}/>
                    <Indicator caption="NAV" enabled={true}/>
                    <Indicator caption="BRA" enabled={true}/>
                </div>
            </div>
            <div className="encoder-status">
                <div className="encoder-title">WHEEL ENCODERS</div>
                <div className="indicator-box">
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                    <Indicator enabled={true}/>
                </div>
            </div>
        </div>
    );
}
