import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
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
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import SetCookie from '../hooks/setcookie'; // Import SetCookie
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from '../assets/login-image.jpg';
import encryptString from '../helpers/hashAlgorithm'; // Import encryption helper
import { SECRET_KEY } from '../helpers/constants'; // Import secret key for encryption

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    useremail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); // Add state for feedback messages
  const navigate = useNavigate(); // Use useNavigate for navigation

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

    if (!formData.useremail) {
      newErrors.useremail = 'Useremail cannot be empty.';
    }

    if (!formData.password) {
      newErrors.password = 'Password cannot be empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
        // Make login request to backend
        const response = await axios.post('http://localhost:9090/api/login', {
          email: formData.useremail,
          password: formData.password,
        });
        // console.log("🚀 ~ handleSubmit ~ response:", response)
  
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.status === 401) {
            setMessage('Unauthorized! Incorrect useremail or password.');
          } else {
            // Hash the useremail before storing it in the cookie
            const hashedUseremail = encryptString(formData.useremail, SECRET_KEY);
            
            // Set the hashed useremail in the cookie
            SetCookie('userEmail', hashedUseremail);
            
            setMessage('Login successful!');
            setIsLoggedIn(true); // Set login status in state
            localStorage.setItem('isLoggedIn', 'true'); // Persist login status in localStorage
  
            // Navigate to profile page on success
            navigate('/');
          }
        } else {
          setMessage('Login failed. Please enter correct email or password.');
        }
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage('Unauthorized! Incorrect useremail or password.');
        } else {
          setMessage('Login failed.');
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
                name="useremail"
                label="User Email"
                value={formData.useremail}
                onChange={handleChange}
                error={!!errors.useremail}
                helperText={errors.useremail}
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
            {message && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: 'center', marginTop: '10px', color: 'red' }}
              >
                {message}
              </Typography>
            )}
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
Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;

