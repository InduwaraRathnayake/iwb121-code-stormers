import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Card,
} from "@mui/material";
import { CardButton } from "../components/Card"; // Assuming CardButton is a custom component

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  
  // Password fields state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // State to control password change option
  const [changePassword, setChangePassword] = useState(false);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(userData); // Reset form data when editing is canceled
      setCurrentPassword(""); // Reset current password field
      setNewPassword(""); // Reset new password field
      setChangePassword(false); // Reset change password option
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and update user data
    setUserData(formData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    // Here you would typically validate the current password
    if (currentPassword === "correct_password") { // Replace with actual validation
      // Update password logic here
      console.log("Password changed successfully!");
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      alert("Current password is incorrect.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 900,
          fontSize: "50px",
          color: "#034c81",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        User Profile
      </Typography>
      
      <Card variant="outlined" sx={{ padding: 3 }}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            {/* Checkbox to toggle password change fields */}
            <Box mb={2}>
              <label>
                <input 
                  type="checkbox" 
                  checked={changePassword} 
                  onChange={() => setChangePassword(!changePassword)} 
                />
                Change Password
              </label>
            </Box>

            {changePassword && (
              <>
                <Typography variant="h6" gutterBottom>
                  Change Password:
                </Typography>
                <Box mb={3}>
                  <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
              </>
            )}

            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
                Save Changes
              </Button>
              <Button type="button" variant="outlined" onClick={handleEditToggle}>
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
              <strong>Username:</strong> {userData.username}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
              <strong>First Name:</strong> {userData.firstName}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
              <strong>Last Name:</strong> {userData.lastName}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
              <strong>Email:</strong> {userData.email}
            </Typography>
            
            {/* Add space after Edit Profile button */}
            <CardButton variant="contained" color="primary" onClick={handleEditToggle} sx={{ marginTop: 2, marginBottom: 2 }}>
              Edit Profile
            </CardButton>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default UserProfile;