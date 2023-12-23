import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DetailUser = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null); // Added state to store the image


    const location = useLocation();
    const path = location.pathname.split('/'); // Split the pathname
    const employeeId = path[path.length - 1]; // Get the last part of the pathname as employeeId

    console.log(employeeId, "uuuuuuuuu");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/app/users/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);

                // Fetch the image from local storage associated with the user
                const savedImage = localStorage.getItem(`userImage_${employeeId}`);
                if (savedImage) {
                    setImage(savedImage);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserDetails();
    }, [employeeId]);



    const handleUpdate = (employeeId) => {
        window.location.href = `/update/${employeeId}`;

    };

    const handleDelete = async (userId) => {
        const confirmation = window.confirm('Are you sure you want to delete this user?');
        if (confirmation) {
            try {
                const response = await fetch(`/app/users/${user._id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }



                const storedData = JSON.parse(localStorage.getItem('usersData'));

                const updatedData = storedData.filter(user => user.id !== userId);

                localStorage.setItem('usersData', JSON.stringify(updatedData));
                window.location.href="/home";
                // history.push('/home');


            } catch (error) {
                console.error('Error deleting user:', error);
            }
        } else {
            alert('Deletion cancelled');
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = () => {
        // Save the uploaded image to local storage
        if (image) {
            localStorage.setItem(`userImage_${employeeId}`, image);
        }
    };
    return (
        <div>
        <button onClick={() => {window.location.href="/home"}} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Go Back</button>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={styles.container}>
            <h2 style={styles.heading}>User Details</h2>
            {user ? (
                <div>
                    <p>User Name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p style={{marginBottom:"40px"}}>Phone: {user.phone}</p>
                    <div style={styles.btnContainer}>
                        <button style={styles.updateBtn} onClick={() => handleUpdate(employeeId)}>
                            Update
                        </button>
                        <button style={styles.deleteBtn} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                    <div >
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} />
                        <button onClick={handleSaveImage} style={styles.saveBtn}>
                            Save
                        </button>
                        
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}


        </div>
        {image && (
            <div style={{ position: 'absolute', right: 200 }}>
                <img src={image} alt={`Profile of ${user.userName}`} style={{ width: '100px', height: '100px' }} />
            </div>
        )}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: "25px",
    },
    updateBtn: {
        width: '48%', // Adjust as needed
        padding: 10,
        fontSize: 16,
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteBtn: {
        width: '48%', // Adjust as needed
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        marginBottom: 25, // Reduce the margin-bottom
    },
    saveBtn: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: 5, // Reduce the margin-bottom
    },
    saveBtnHover: {
        backgroundColor: '#1976d2',
    },
    uploadSection: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    uploadInput: {
        display: 'none',
    },
    uploadLabel: {
        padding: 10,
        fontSize: 16,
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        marginRight: 10,
        transition: 'background-color 0.3s ease',
    },
    uploadLabelHover: {
        backgroundColor: '#1976d2',
    }
};

export default DetailUser;
