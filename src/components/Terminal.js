import React, { useState, useEffect } from 'react';
import "./Terminal.css";
import { animateScroll } from 'react-scroll';

const socket_port = 3333;
//const socket = io.connect(`http://192.168.6.2:${socket_port}`);

export default function Terminal(props) {
    const [terminalOutput, setTerminalOutput] = useState('');

    useEffect(() => {
        scrollToBottom();
        return function cleanup() {
            // TODO: we can cleanup the text here when the terminal is inactive or when too much is in the pre
            if (props.isInactive) console.log("terminal off");
        };
    });

    function scrollToBottom() {
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
            <pre id='terminal_pre'>{props.content}</pre>  
        </div>
    );
}

Terminal.defaultProps = {
    content: 'The content prop of this component has not been set'
  };
