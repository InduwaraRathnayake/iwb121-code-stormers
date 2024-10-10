import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Link,
} from '@mui/material';
import { CardButton } from '../components/Card';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import Axios
import backgroundImage from '../assets/signUp-image.jpeg';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); // For showing success/error messages
  const navigate = useNavigate(); // Use useNavigate to redirect after signup

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

    if (!formData.username) newErrors.username = 'Username cannot be empty.';
    if (!formData.firstName) newErrors.firstName = 'First Name cannot be empty.';
    if (!formData.lastName) newErrors.lastName = 'Last Name cannot be empty.';
    if (!formData.email) newErrors.email = 'Email cannot be empty.';
    if (!formData.password) newErrors.password = 'Password cannot be empty.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
        // Send the signup data to the backend
        const response = await axios.post('http://localhost:9090/api/signup', {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        console.log("🚀 ~ handleSubmit ~ response:", response)

        // Handle success (e.g., navigate to the login page)
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      } catch (error) {
        // Handle error (e.g., display an error message)
        if (error.response && error.response.data) {
          setMessage(`Signup failed: ${error.response.data.message}`);
        } else {
          setMessage('Signup failed: User already exits.');
        }
      }
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
          height: '600px',
          width: '1000px',
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
            width: '450px',
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
              Create Account
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <CardButton type="submit"> Sign Up </CardButton>
            </form>
            <Typography variant="body2" color="error" sx={{ marginTop: '20px' }}>
              {message}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Typography variant="body2" sx={{ marginRight: '8px' }}>
                Already have an account?
              </Typography>
              <Link component={RouterLink} to="/login" variant="body2">
                Login
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
