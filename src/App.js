import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stomp from 'stompjs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedToPod: false,
    };
  }
  
  componentDidMount() {
    // ask backend to start base-station server instance
    // afterwards establish websocket connection to backend
    fetch('http://localhost:8080/server', {method: 'POST'})
        .then((response) => response.text(), error => Promise.reject('Error: could not communicate with backend (fetch() returned error)'))
        .then((text) => console.log('CONNECTED TO BACKEND'))
        .then(() => {
            const stompClient = Stomp.client('ws://localhost:8080/connecthere');

            this.setState({
                stompClient: stompClient,
            });

            stompClient.connect({}, (frame) => {
                stompClient.subscribe('/topic/podData', (message) => this.podDataHandler(message));
                stompClient.subscribe('/topic/isPodConnected', (message) => this.podConnectionStatusHandler(message));
                stompClient.subscribe('/topic/errors', (message) => console.error(`ERROR FROM BACKEND: ${message}`));
                stompClient.send("/app/pullData");
            }, (error) => this.disconnectHandler(error));
        })
        .catch(error => console.error(error));
  }

  podConnectionStatusHandler(message) {
    const receivedPodConnectionStatus = message.body;

    this.setState({
        connectedToPod: receivedPodConnectionStatus === 'CONNECTED' ? true : false,
    });
    console.log(receivedPodConnectionStatus);
}

  render() {
    const connectedToPod = this.state.connectedToPod;
    const connectedToBackend = this.state.stompClient;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {connectedToBackend ? 'connected' : 'disconnected'} 
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
  }
}

export default App;
