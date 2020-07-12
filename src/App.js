import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getNewsAndComments } from "./services/HackerAPI.service";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NEWS_ID: 23809291,
        };
    }

    componentDidMount() {
        this.setState({
            started: new Date().toLocaleTimeString()
        })
        getNewsAndComments(this.state.NEWS_ID)
            .then(data => {
                this.setState({
                    NEWS: data
                })
            })
            .then(() => {
                this.setState({
                    done: new Date().toLocaleTimeString()
                })
            });
    }

    render() {
        return (
            <div className="App">
                <p>Fetching news and comments for: <b>{this.state.NEWS_ID}</b></p>
                <p>Started: {this.state.started}</p>
                <p>Ended: {this.state.done}</p>
                <pre>
                    {JSON.stringify(this.state.NEWS, null, 2)}
                </pre>
            </div>
        );
    }
}

export default App;
