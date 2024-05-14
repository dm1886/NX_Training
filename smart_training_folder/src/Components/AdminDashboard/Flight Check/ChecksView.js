import React from 'react'
import { Typography, Card, CardContent, CardActions, Button, Grid, Container, Breadcrumbs, Link , Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function ChecksView({ onReportSelect }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Container sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        {/* Section Title and Subtitle */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Digital Report Form
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            This is to generate an inflight check report
          </Typography>
        </Box>

      {/* Cards in a flex box */}
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: 'auto', justifyContent: 'space-evenly' }}>
          {/* Card 1 */}
          <Grid item>
            <Card sx={{ width: 250, height: 300, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ height: '1/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6">Line Check Form</Typography>
                </Box>
                <Divider sx={{ margin: '10px' }} />
                <Box sx={{ flex: 1, overflow: 'auto', padding: 1 }}>
                  <Typography variant="body2" noWrap={false} sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" color="success"  onClick={() => onReportSelect('Line Check Form')}>
                  Go to Fill Report
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* Additional cards can be similarly hardcoded for each type */}
          {/* Repeat for Card 2, Card 3, Card 4 */}
          {/* This example shows one card, replicate this structure for the other three with different content if necessary */}
        </Grid>

        {/* Breadcrumbs Navigation at bottom left */}
        <Box sx={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" >
              Reports
            </Link>
            <Typography color="textPrimary">Digital Reports List</Typography>
          </Breadcrumbs>
        </Box>

      </Container>
    </Box> 
  )
}

export default ChecksView