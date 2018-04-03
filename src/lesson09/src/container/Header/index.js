import React from 'react';
import style from './Header.css';

class Header extends React.Component {

    render() {
        return (
            <div className={style.header}>
                Weather App
            </div>
        );
    }
}

export default Header;