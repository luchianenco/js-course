import React, { Component } from 'react';
import styles from './Content.css';

class Content extends Component {
    render() {
        return (
            <div className={styles.main}>
                {this.props.children}
            </div>
        );
    }
}

export default Content;