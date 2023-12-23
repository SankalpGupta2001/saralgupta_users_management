import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

const DashboardScreen = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    // const history = useHistory(); 


    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('/app/users');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                let data = await response.json();
                let storedData = JSON.stringify(data.users);
                let storageData = localStorage.getItem('usersData');
                if (!storageData) {
                    localStorage.setItem('usersData', storedData);
                }
                setUsersData(JSON.parse(storedData));
                setFilteredUsers(JSON.parse(storedData));
                console.log(JSON.parse(storedData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsersData();
    }, []);

    // useEffect(() => {
    //     const fetchUsersData = async () => {
    //         try {
    //             if (navigator.onLine) {
    //                 const response = await fetch('http://localhost:5000/app/users');
    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch data');
    //                 }
    //                 const data = await response.json();
    //                 const storedData = JSON.stringify(data.users);
    //                 localStorage.setItem('usersData', storedData);
    //                 setUsersData(data.users);
    //                 setFilteredUsers(data.users);
    //                 console.log(data.users);
    //             } else {
    //                 // Fetch data from local storage when offline
    //                 const storageData = localStorage.getItem('usersData');
    //                 if (storageData) {
    //                     const parsedData = JSON.parse(storageData);
    //                     setUsersData(parsedData);
    //                     setFilteredUsers(parsedData);
    //                     console.log(parsedData);
    //                 } else {
    //                     console.error('No offline data available.');
    //                     // Handle scenario when no offline data is available
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchUsersData();
    // }, []);


    useEffect(() => {
        applySorting();
    }, [sortOption, usersData]);

    const applySorting = () => {
        let sortedUsers = [...usersData];

        switch (sortOption) {
            case 'A-Z':
                sortedUsers.sort((a, b) => a.userName.localeCompare(b.userName));
                break;
            case 'Z-A':
                sortedUsers.sort((a, b) => b.userName.localeCompare(a.userName));
                break;
            case 'Last Modified':
                sortedUsers.sort((a, b) => b.lastModified - a.lastModified);
                break;
            case 'Last Inserted':
                sortedUsers.sort((a, b) => b.createdAt - a.createdAt);
                break;
            default:
                break;
        }

        if (searchQuery !== '') {
            sortedUsers = sortedUsers.filter(
                (user) =>
                    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredUsers(sortedUsers);
    };

    // const handleSearch = (query) => {

    //     setSearchQuery(query);


    //         const filtered = usersData.filter(
    //             (user) =>{
    //         const userNameLower = user.userName.toLowerCase();
    //         const emailLower = user.email.toLowerCase();
    //         const phoneLower = (user.phone || '').toString().toLowerCase(); 

    //         return (
    //             userNameLower.includes(query.toLowerCase()) ||
    //             emailLower.includes(query.toLowerCase()) ||
    //             phoneLower.includes(query.toLowerCase())
    //         );
    //             }
    //         );
    //         setFilteredUsers(filtered);
    //     // } else {
    //     //     setFilteredUsers(usersData);
    //     // }
    // };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase(); // convert input to lowercase for case-insensitive search
        setSearchQuery(query);

        // Filter users based on the search query
        const filtered = usersData.filter(
            (user) =>
                user.userName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    const handleSort = (option) => {
        setSortOption(option);

        // let sortedUsers = [...filteredUsers];

        // switch (option) {
        //     case 'A-Z':
        //         sortedUsers.sort((a, b) => a.userName.localeCompare(b.userName));
        //         break;
        //     case 'Z-A':
        //         sortedUsers.sort((a, b) => b.userName.localeCompare(a.userName));
        //         break;
        //     case 'Last Modified':
        //         // Assuming users have a 'lastModified' field
        //         sortedUsers.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        //         break;
        //     case 'Last Inserted':
        //         // Assuming users have a 'createdAt' field
        //         sortedUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        //         break;
        //     default:
        //         break;
        // }

        // setFilteredUsers(sortedUsers);
    };

    const handleUpdate = (employeeId) => {
        window.location.href = `/update/${employeeId}`;

    };

    const applyFilters = (savedSearchQuery, savedSortOption) => {
        let updatedFilteredUsers = [...usersData];

        // Apply search query filter
        if (savedSearchQuery) {
            const query = savedSearchQuery.toLowerCase();
            updatedFilteredUsers = updatedFilteredUsers.filter(
                (user) =>
                    user.userName.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.phone.toLowerCase().includes(query)
            );
        }

        // Apply sort option filter
        if (savedSortOption) {
            switch (savedSortOption) {
                case 'A-Z':
                    updatedFilteredUsers.sort((a, b) => a.userName.localeCompare(b.userName));
                    break;
                case 'Z-A':
                    updatedFilteredUsers.sort((a, b) => b.userName.localeCompare(a.userName));
                    break;
                case 'Last Modified':
                    updatedFilteredUsers.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
                    break;
                case 'Last Inserted':
                    updatedFilteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                default:
                    break;
            }
        }

        setFilteredUsers(updatedFilteredUsers);
    };


    useEffect(() => {
        const loadFilterSettings = async () => {
            try {
                const savedSearchQuery = localStorage.getItem('searchQuery');
                const savedSortOption = localStorage.getItem('sortOption');

                if (savedSearchQuery) setSearchQuery(savedSearchQuery);
                if (savedSortOption) setSortOption(savedSortOption);
                applyFilters(savedSearchQuery, savedSortOption);

            } catch (error) {
                console.error('Error loading filter settings:', error);
            }
        };

        loadFilterSettings();
    }, []);



    useEffect(() => {
        const saveFilterSettings = () => {
            try {
                localStorage.setItem('searchQuery', searchQuery);
                localStorage.setItem('sortOption', sortOption);
            } catch (error) {
                console.error('Error saving filter settings:', error);
            }
        };

        saveFilterSettings();
    }, [searchQuery, sortOption]);

    const handleDelete = async (userId) => {
        const confirmation = window.confirm('Are you sure you want to delete this user?');
        if (confirmation) {
            try {
                // Replace the fetch URL with your actual API endpoint
                const response = await fetch(`/app/users/${userId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                let storedData = localStorage.getItem('usersData');
                storedData = JSON.parse(storedData);
                storedData = storedData.filter((user) => user.id !== userId);
                localStorage.setItem('usersData', JSON.stringify(storedData));

                window.location.href = `/home`;

            } catch (error) {
                console.error('Error deleting user:', error);
            }
        } else {
            alert('Deletion cancelled');
        }
    };

    const handleDetails = (employeeId) => {
        window.location.href = `/detail/${employeeId}`;

    };

    const navigateToNewUser = () => {
        window.location.href = `/newuser`;

    };

    const buttonStyle = {
        marginLeft: "120px", marginRight: "100px"
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);

      // Logic to get current rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  // Logic to paginate
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


    return (
        <div>
            {/* <input
                type="text"
                placeholder="Search by name, email, or phone"
                value={searchQuery}
                onChange={handleSearch}
                style={{ padding: '10px', margin: '10px' }}
            />

            <button onClick={navigateToNewUser}>Add User</button> */}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={navigateToNewUser}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Add User
                </button>
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                    }}
                />


            </div>


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' ,marginBottom:"20px"}}>
                <div style={{
                    maxWidth: '200px', width: '100%', padding: '0px', display: "flex", boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', alignItems: 'center', flexDirection: 'column', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>User Details</h2>
                </div>
            </div>

            {currentUsers.length !== 0 ? (
                <div>

<div>
        <button onClick={() => handleSort('A-Z')} style={buttonStyle}>A-Z</button>
        <button onClick={() => handleSort('Z-A')} style={buttonStyle}>Z-A</button>
        <button onClick={() => handleSort('Last Modified')} style={buttonStyle}>Last Modified</button>
        <button onClick={() => handleSort('Last Inserted')} style={buttonStyle}>Last Inserted</button>
    </div>

<table style={{ borderCollapse: 'collapse', width: '90%', margin: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
    <thead style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
        <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>S.no</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>UserName</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Update</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Delete</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Details</th>
        </tr>
    </thead>
    <tbody>
        {currentUsers.map((employee, index) => (
            <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', padding: '10px' }}>
                <td style={{ padding: '12px' }}>{index + 1}</td>
                <td style={{ padding: '12px' }}>{employee.userName}</td>
                <td style={{ padding: '12px' }}>{employee.email}</td>
                <td style={{ padding: '12px' }}>{employee.phone}</td>
                <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleUpdate(employee._id)} style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>Update</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleDelete(employee._id)} style={{ padding: '10px 15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>Delete</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleDetails(employee._id)} style={{ padding: '10px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>Details</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>


                    <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} style={{ margin: '0 5px' }}>
                                <button onClick={() => paginate(index + 1)} style={{ padding: '8px 12px', background: currentPage === index + 1 ? '#f44336' : '#ddd', color: currentPage === index + 1 ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>

                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' ,marginBottom:"20px"}}>
                <div style={{
                    maxWidth: '200px', width: '100%', padding: '0px', display: "flex", boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', alignItems: 'center', flexDirection: 'column', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>No Data Found</h2>
                </div>
            </div>
            )}
        </div>
    );
};



const buttonStyle = {
    padding: '8px 12px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '5px',
  };
  

export default DashboardScreen;
