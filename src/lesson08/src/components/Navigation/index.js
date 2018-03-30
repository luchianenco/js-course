import React, { Component } from 'react';
import styles from './Navigation.css';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.renderMenu = this.renderMenu.bind(this);
    }

    renderMenu() {
        return this.props.menu.map(item => {
            return <a className={styles.link} key={item.key} href={item.link}>{item.name}</a>
        });
    }

    render() {
        return (
            <div className={styles.navbar}>
                {this.renderMenu()}
            </div>
        );
    }
}

export default Navigation;