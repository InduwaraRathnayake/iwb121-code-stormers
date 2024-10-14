import { useState } from 'react';
import PropTypes from 'prop-types'; 
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
import axios from 'axios';
import SetCookie from '../hooks/setcookie'; 
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/login-image.jpg';
import encryptString from '../helpers/hashAlgorithm'; 
import { SECRET_KEY } from '../helpers/constants'; 

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    useremail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({}); 
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
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
       
        const response = await axios.post('http://localhost:9090/api/login', {
          email: formData.useremail,
          password: formData.password,
        });
  
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.status === 401) {
            setMessage('Unauthorized! Incorrect useremail or password.');
          } else {
            const hashedUseremail = encryptString(formData.useremail, SECRET_KEY);
            
            SetCookie('userEmail', hashedUseremail);
            
            setMessage('Login successful!');
            setIsLoggedIn(true); 
            localStorage.setItem('isLoggedIn', 'true'); 
  
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

