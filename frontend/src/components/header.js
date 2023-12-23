import React, { } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

const Header = () => {
    // const { user } = useContext(AuthContext);

    return (
        <header style={styles.header}>
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ ...styles.navList, display: 'flex', alignItems: 'center' }}>
            <li style={{ ...styles.navItem, ...styles.navItems }}>
           
                Welcome
           
            </li>
        </ul>
        <ul style={styles.navList}>
            <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>
                    Sign Up
                </Link>
            </li>
            <li style={styles.navItem}>
                <Link to="/login" style={styles.navLink}>
                    Login
                </Link>
            </li>
            {/* {user && (
                <li style={styles.navItem}>
                    Logged in as: {user.userName}
                </li>
            )} */}
        </ul>
    </nav>
</header>

    );
};

const styles = {
    header: {
        background: '#333',
        color: '#fff',
        padding: '1rem',
        marginBottom: '20px'
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    navItem: {
        marginLeft: '1.5rem',
    },
    navItems: {
        marginLeft: '100px',

    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '1.2rem',
    },
};

export default Header;
