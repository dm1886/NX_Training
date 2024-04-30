import React from 'react';

const AdminDashboard = ({ userinfo }) => {
    // Your component logic goes here

    return (
        <div>
            {/* Your JSX code goes here */}
            Hello, {userinfo.name}! You are an admin.
        </div>
    );
};

export default AdminDashboard;