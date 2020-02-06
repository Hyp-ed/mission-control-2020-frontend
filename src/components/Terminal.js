import React, { useState, useEffect } from 'react';
import "./Terminal.css";

export default function Terminal(props) {

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
