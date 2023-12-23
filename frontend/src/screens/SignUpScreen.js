import React, { useState, useEffect } from 'react';
import "../App.css";

function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('Male');
    const [hearAbout, setHearAbout] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [isConnected, setIsConnected] = useState(navigator.onLine); // Initialize with current online status

    // useEffect(() => {
    //     const savedConnectivity = localStorage.getItem('isConnected');
    //     if (savedConnectivity) {
    //         setIsConnected(savedConnectivity === 'true');
    //     }

    //     const handleConnectivityChange = (isConnected) => {
    //         setIsConnected(isConnected);
    //         localStorage.setItem('isConnected', isConnected.toString());
    //     };

    //     window.addEventListener('online', () => handleConnectivityChange(true));
    //     window.addEventListener('offline', () => handleConnectivityChange(false));

    //     return () => {
    //         window.removeEventListener('online', () => handleConnectivityChange(true));
    //         window.removeEventListener('offline', () => handleConnectivityChange(false));
    //     };
    // }, []);


    useEffect(() => {
        const handleConnectivityChange = () => {
            setIsConnected(navigator.onLine); // Update online status
        };

        window.addEventListener('online', handleConnectivityChange);
        window.addEventListener('offline', handleConnectivityChange);

        return () => {
            window.removeEventListener('online', handleConnectivityChange);
            window.removeEventListener('offline', handleConnectivityChange);
        };
    }, []);





    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleHearAboutChange = (event) => {
        setHearAbout(event.target.value);
    };

    const handleSignup = async () => {
        if (!isConnected) {
            alert('Please enable Wi-Fi or Mobile Data');
            return;
        }

        const userData = {
            name,
            email,
            phone,
            gender,
            hearAbout,
            city,
            state,
            password,
        };

        try {
            const response = await fetch('/app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Signup successful:', responseData);
                window.location.href = `/home`;

            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200vh'  }}>
            <div style={{
                maxWidth: '550px', width: '100%', padding: '20px', display:"flex",boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',alignItems: 'center', flexDirection: 'column',borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}>
                {!isConnected && <p>Please enable Wi-Fi or Mobile Data</p>}
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Sign Up</h1>
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginBottom: '5px' }}>Name</label>
                    <input

                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='form-control'
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '500px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className='form-control'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Phone</label>
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        className='form-control'
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>

                <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginBottom: '10px' }}>Gender</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={handleGenderChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Male
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={handleGenderChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Female
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Other"
                                checked={gender === 'Other'}
                                onChange={handleGenderChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Other
                        </label>
                    </div>
                </div>


                <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginBottom: '20px' }}>How you hear about us</label>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="LinkedIn"
                                checked={hearAbout === 'LinkedIn'}
                                onChange={handleHearAboutChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            LinkedIn
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Friends"
                                checked={hearAbout === 'Friends'}
                                onChange={handleHearAboutChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Friends
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Job Portal"
                                checked={hearAbout === 'Job Portal'}
                                onChange={handleHearAboutChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Job Portal
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="Others"
                                checked={hearAbout === 'Others'}
                                onChange={handleHearAboutChange}
                                style={{ marginRight: '5px' }} // Add any custom styles for the radio input
                            />
                            Others
                        </label>
                    </div>
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>City</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='form-control'
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>

                <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>State</label>
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className='form-control'
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={handleSignup} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Sign Up</button>
                </div>
                <p>Already have an account?  
                <button onClick={() => { window.location.href = "/login" }} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
                 </p>
            </div>
        </div>
    );
}

export default SignupScreen;
