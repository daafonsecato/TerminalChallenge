import React, { useRef, useEffect, useState } from 'react';
import 'xterm/css/xterm.css';
import './TerminalPanel.css';

function TerminalPanel({ wsUrl }) {

    return (
        <iframe className="simple-terminal-panel" src={wsUrl} title="Terminal" />
    );
}

export default TerminalPanel;
