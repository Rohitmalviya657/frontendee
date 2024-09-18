import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appp.css'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/get');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (email) => {
        try {
            await axios.post('http://localhost:4000/user/delete', { email });
            setUsers(users.filter(user => user.email !== email));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setUpdatedData({ name: user.name, email: user.email });
    };

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:4000/user/update', {
                email: editingUser.email, // Current email
                emaill: updatedData.email, // Updated email
                name: updatedData.name,    // Updated name
            });
            alert('User updated successfully!');
            setEditingUser(null);

        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="user-list-container">
            {/* <h2>User List</h2> */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.image && (
                                    <img
                                        style={{ marginTop: '15%' }}
                                        src={`http://localhost:4000/uploads/${user.image}`}
                                        alt="User"
                                        width="100"
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user.email)}>Delete</button>
                                <button onClick={() => handleEdit(user)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Show Update Form if a user is being edited */}
            {editingUser && (
                <div className="update-form">
                    <h3>Update User</h3>
                    <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        placeholder="Enter new name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        placeholder="Enter new email"
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserList;
