import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UpdateScreen = () => {
    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const location = useLocation();
    const path = location.pathname.split('/'); // Split the pathname
    const employeeId = path[path.length - 1]; // Get the last part of the pathname as employeeId

    console.log(employeeId, "uuuuuuuuu");

    useEffect(() => {
        setId(employeeId); // Set the ID from the route params

        const fetchUserData = async () => {
            try {
                const response = await fetch(`/app/users/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setUserName(data.userName);
                setEmail(data.email);
                setPhone(data.phone);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [employeeId]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/app/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, phone }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            window.location.href = `/home`;

        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    

    return (
        <div>
        <button onClick={() => {window.location.href="/home"}} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Go Back</button>

        <div style={styles.container}>
            <h2 style={styles.heading}>Update Employee Details</h2>

            <label style={styles.label}>UserName:</label>
            <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter UserName"
                style={styles.input}
            />

            <label style={styles.label}>Email:</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                style={styles.input}
            />
            <label style={styles.label}>Phone:</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone"
                style={styles.input}
            />
            <button
                onClick={handleUpdate}
                style={styles.button}
                onMouseOver={(e) => (e.target.style = { ...styles.button, ...styles.buttonHover })}
                onMouseOut={(e) => (e.target.style = styles.button)}
            >
                Update
            </button>
        </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 400,
        margin: 'auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        display: 'block',
        marginBottom: 5,
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
    },
    button: {
        display: 'block',
        width: '100%',
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#d32f2f',
    },
};

export default UpdateScreen;
