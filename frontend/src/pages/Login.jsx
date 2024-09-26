import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import { CardButton } from '../components/Card';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
import backgroundImage from '../assets/login-image.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({}); // Clear errors on input change
  };

  const validateInput = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username cannot be empty.';
    }

    if (!formData.password) {
      newErrors.password = 'Password cannot be empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      // Handle login logic here
      console.log('Form Submitted:', formData);
    }
  };

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          height: '600px', // Adjust height as needed
          width: '1000px', // Adjust width as needed
        }}
      >
        <Box
          sx={{
            flex: '1',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />
        <Card
          sx={{
            padding: '40px',
            width: '450px', // Adjust width as needed
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: '30px',
                color: '#034c81',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Welcome Back!
            </Typography>
            <Typography
              variant="h1"
              component="h3"
              sx={{
                fontWeight: 900,
                fontSize: '20px',
                color: '#2ca3fa',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Please enter your details
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ marginBottom: '16px' }}
              />
              <CardButton type="submit">Login</CardButton>
            </form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Typography variant="body2" sx={{ marginRight: '8px' }}>
                Don&apos;t have an account?
              </Typography>
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign up
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
