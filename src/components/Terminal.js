import React, { useState, useEffect } from 'react';
import "./Terminal.css";
import { animateScroll } from 'react-scroll';

export default function Terminal(props) {
    const [terminalOutput, setTerminalOutput] = useState('');

    useEffect(() => {
        scrollToBottom();
        return function cleanup() {

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
