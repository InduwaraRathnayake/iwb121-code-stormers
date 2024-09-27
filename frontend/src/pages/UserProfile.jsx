import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  Avatar,
  CardContent,
} from "@mui/material";
import { CardButton, TitleBox} from "../components/Card"; 

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

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5}}>
      <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px',textAlign: 'center', color: '#034c81' }}>
            User Profile
          </Typography>
        </TitleBox>
      
      <Card variant="outlined" sx={{ padding: 3 }}>
        <CardContent>
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
                <CardButton type="button" onClick={handleEditToggle} >
                  Save Changes
                </CardButton>
                <CardButton type="button" onClick={handleEditToggle}>
                  Cancel
                </CardButton>
              </Box>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              {/* Avatar showing the first letter of the username */}
              <Avatar sx={{ background: "linear-gradient(45deg, #1089D3 0%, #12B1D1 100%)", color: "white", margin: '0 auto', width: 120, height: 120 }}>
                {userData.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ lineHeight: '2', marginTop: '10px' }}>
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
              <CardButton type="submit" onClick={handleEditToggle}>
                Edit Profile
              </CardButton>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;