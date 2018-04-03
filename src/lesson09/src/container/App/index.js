import React, { Component } from 'react';
import AddLocation from '../AddLocation';
import LocationList from '../LocationList';

import Header from '../Header';
import style from './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: []
        };

        this.AddNewLocation = (location) => {
            this.setState({
                locations: [...this.state.locations, location]
            });

        };
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={style.app}>
                    <AddLocation add={this.AddNewLocation} />
                    <LocationList locations={this.state.locations} />
                </div>
            </div>
        );
    }
}


export default App;
