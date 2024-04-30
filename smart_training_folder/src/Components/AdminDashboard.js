import React from 'react';
import Button from '@mui/material/Button';


const AdminDashboard = ({ userinfo }) => {
    // Your component logic goes here

    return (
        <div>
            {/* Your JSX code goes here */}
            Hello, {userinfo.name}! You are an admin.
            <Button variant="contained">Hello world</Button>;
            
        </div>
    );
};

export default AdminDashboard;