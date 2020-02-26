import React, { useState, useEffect } from 'react';
import "./Terminal.css";
import { animateScroll } from 'react-scroll';
import Button from "../Button/Button"
import { faSkull, faPlay } from '@fortawesome/free-solid-svg-icons';
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export default function Terminal(props) {
    const flags = props.flags;
    const debug_level = props.debug_level;
    
    //updates terminal output in the pre
    useEffect(() => {
        scrollToBottom();
        return function cleanup() {
            // TODO: we can cleanup the terminal here when the terminal is inactive 
            //  or when too much is in the pre
            if (props.isInactive) console.log("terminal off");
        };
    }, [props.terminalOutput]); //useEffect only called when terminal output changes

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
          containerId: 'terminal_pre',
          duration: 0
        });
    }

    if (props.isInactive) {
        return(null);
    }

    return(
        <div className="terminal-root">
            <SimpleBar className="terminal-content" forceVisible="y" autoHide={false}>
                <pre id='terminal_pre'>{props.terminalOutput}</pre>
            </SimpleBar>
            <div className="bottom-buttons">
                <Button
                    caption="START BBB"
                    backgroundColor="#FFFFFF"
                    textColor="#000000"
                    icon={faPlay}
                    width="60%"
                    onClick= {() => {}}>
                </Button>
                <Button
                    caption="KILL"
                    backgroundColor="#FFFFFF"
                    textColor="#000000"
                    icon={faSkull}
                    width="38%"
                    onClick= {() => {}}>
                </Button>
            </div>
        </div>
    );
}

Terminal.defaultProps = {
    content: 'The content prop of this component has not been set',
    flags: [],
    debug_level: '0'
  };
