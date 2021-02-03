import React from 'react';
import './App.css';

import Navbar from './Navbar.js';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Navbar />
            </div>
        );
    }
}

export default App;
