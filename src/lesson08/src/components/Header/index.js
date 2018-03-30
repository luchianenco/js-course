import React, { Component } from 'react';
import Navigation from "../Navigation";
import styles from './Header.css';

class Header extends Component {

    render() {
        return (
            <div>
                <img className={styles.logo} src={this.props.logo} alt="Logo"/>
                <Navigation menu={this.props.menu}/>
            </div>
        );
    }
}

export default Header;