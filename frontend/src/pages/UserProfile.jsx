import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  Avatar,
  CardContent,
} from "@mui/material";
import { CardButton, TitleBox } from "../components/Card";
import GetCookie from "../hooks/getcookie"; // Utility to get the email from cookies
import decryptHash from "../helpers/decrypting";
import { SECRET_KEY } from "../helpers/constants";

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Updated state for user data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const hashedemail = GetCookie("userEmail"); // Get email from cookies
    const email = decryptHash(hashedemail, SECRET_KEY);
    console.log("🚀 ~ useEffect ~ email:", email);
    if (email) {
      axios
        .post("http://localhost:9090/api/userByEmail", { email })
        .then((response) => {
          const { data } = response;
          setUserData(data);
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

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
    
    if (changePassword && currentPassword && newPassword) {
      // Handle password change
      axios
        .post("http://localhost:9090/api/forgotPassword", {
          email: userData.email,
          password: newPassword,
        })
        .then(() => {
          alert("Password changed successfully.");
          setCurrentPassword(""); // Reset password fields
          setNewPassword("");
          setChangePassword(false);
        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    } else {
      // Handle profile update
      axios
        .put("http://localhost:9090/api/changeName", {
          email: userData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .then(() => {
          alert("Profile updated successfully.");
          setUserData(formData); // Update the local state with the new data
          setIsEditing(false); // Exit editing mode
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5, marginBottom: 5 }}>
      <TitleBox>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', textAlign: 'center', color: '#034c81' }}>
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
                  disabled
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
                  fullWidth
                  disabled // Prevent editing email
                />
              </Box>

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

              <Box display="flex" justifyContent="center" gap={1}>
                <CardButton type="submit">
                  Save Changes
                </CardButton>
                <CardButton type="button" onClick={handleEditToggle}>
                  Cancel
                </CardButton>
              </Box>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Avatar sx={{ background: "linear-gradient(45deg, #1089D3 0%, #12B1D1 100%)", color: "white", margin: '0 auto', width: 120, height: 120 }}>
                {userData?.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ lineHeight: '2', marginTop: '10px' }}>
                <strong>Username:</strong> {userData?.username}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
                <strong>First Name:</strong> {userData?.firstName}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
                <strong>Last Name:</strong> {userData?.lastName}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ lineHeight: '2' }}>
                <strong>Email:</strong> {userData?.email}
              </Typography>

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
