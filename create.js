import React, { useState } from 'react';
import axios from 'axios';
// Optional for styling

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            image: files ? files[0] : formData.image
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (formData.image) data.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:4000/user/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Create;
