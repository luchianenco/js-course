import React, { Component } from 'react';
import Navigation from "../Navigation";

class Header extends Component {

    render() {
        return (
            <div>
                <Navigation menu={this.props.menu}/>
            </div>
        );
    }
}

export default Header;