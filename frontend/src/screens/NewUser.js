import React, { useState } from 'react';

const NewUser = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const history = useHistory(); 

    const handleCreateUser = async () => {
        const userData = {
            userName,
            email,
            phone
        };

        try {
            // Simulating a fetch request as an example
            // Replace this with your actual API call to create a new user
            const response = await fetch('/app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log(response); // Log the response received from the API

            if (response.ok) {
                const storedData = localStorage.getItem('usersData')
                    ? JSON.parse(localStorage.getItem('usersData'))
                    : [];

                // Push the new user data
                storedData.push(userData);

                // Save the updated data back to localStorage
                localStorage.setItem('usersData', JSON.stringify(storedData));
        window.location.href = `/home`;
                
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (

        <div>
            
        <button onClick={() => {window.location.href="/home"}} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Go Back</button>

        
        <div style={styles.container}>

            <h2 style={styles.heading}>Employee Details</h2>

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
                onClick={handleCreateUser}
                style={styles.button}
                onMouseOver={(e) => (e.target.style = { ...styles.button, ...styles.buttonHover })}
                onMouseOut={(e) => (e.target.style = styles.button)}
            >
                Submit
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

export default NewUser;