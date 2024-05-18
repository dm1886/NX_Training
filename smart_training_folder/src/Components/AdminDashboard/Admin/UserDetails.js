import React from 'react';
import { Card, Grid, Typography, Avatar } from '@mui/material';
import Licenses from './Licenses';

const UserDetails = ({ user }) => {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
    <Typography variant="h4" gutterBottom>User Details</Typography>
    <Grid container spacing={2}>
      {/* Top Left Box */}
      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, height: '100%', boxShadow: 3 }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={user.avatarUrl} // Assuming 'avatarUrl' is the field where the image URL is stored
            alt={user.name}
          />
          <div>
            <Typography variant="h6">{user.name}</Typography>
            <Typography color="text.secondary">{user.rank}</Typography>
          </div>
        </Card>
      </Grid>
      {/* Top Right Box */}
    <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ p: 2, height: '100%', boxShadow: 3 }}>
            <Typography variant="subtitle1">Staff Number: {user.staff_number}</Typography>
            <Typography variant="subtitle1">Access Level: {user.access_level}</Typography>
            <Typography variant="subtitle1">Name: {user.name}</Typography>
            <Typography variant="subtitle1">Surname: {user.surname}</Typography>
            <Typography variant="subtitle1">Email: {user.email}</Typography>
            <Typography variant="subtitle1">Instructor Type: {user.instructor_type === 0 ? 'nil' : user.instructor_type === 1 ? 'Ground Instructor' : user.instructor_type === 2 ? 'Line Training Captain' : user.instructor_type === 4 ? 'Sim Instructor' : 'Examiner'}</Typography>
        </Card>
    </Grid>
      {/* Bottom Box */}
      <Grid item xs={12}>
        {/* <Card variant="outlined" sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="subtitle1">Licenses</Typography> */}
          <Licenses userId={user.id} />
        {/* </Card> */}
      </Grid>
    </Grid>
  </div>
);
};

export default UserDetails;
