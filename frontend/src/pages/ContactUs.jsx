import{ useState } from 'react';
import { Typography, Card, CardContent, TextField, Box } from "@mui/material";
import axios from 'axios';
import { CardButton } from '../components/Card';

const ContactUsComp = () => {
  const [formData, setFormData] = useState({
    subject: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    message: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/api/contactUs', formData);
      if (response.status === 200) {
        setMessage('Form submitted successfully!');
        //clear form data
        setFormData({
          subject: '',
          firstName: '',
          lastName: '',
          mobileNo: '',
          email: '',
          message: '',
        });
      } else {
        setMessage('Failed to submit form.');
      }
    } catch {
      setMessage('Failed to submit form.');
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-start p-5 ">
      <Card
        sx={{
          flex: 1,
          p: 7,
          paddingBottom: "0px",
          minWidth: "300px",   
           backgroundColor: "rgba(255, 255, 255, 0.7)", 

                borderRadius: "10px",
                borderColor: "#125488",
                borderWidth: "1px",
                marginRight: "20px",
              }}
              >
              <CardContent>
                <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: "24px",
                  color: "#034c81",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                >
                Contact Details
                </Typography>
                <div className="text-[#125488] ">
                <p className="text-lg font-semibold">
                  <strong>🏢 Head Office:</strong> <br /> University of Moratuwa
                </p>
                <p className="text-lg font-semibold">
                  Bandaranayake Mawatha
                </p>
                <p className="text-lg font-semibold">
                  Moratuwa 10400, Sri Lanka
                </p>

                <div className="flex flex-wrap mb-4">
                  <div className="w-full mb-4">
                  <p className="text-lg font-semibold">
                    <strong>📧 Email:</strong> wellness360@gmail.com
                  </p>
                  <p className="text-lg font-semibold">
                    <strong>📧 Email (Marketing):</strong> wellness360official@gmail.com
                  </p>
                  </div>
                  <div className="w-full mb-4">
                  <p className="text-lg font-semibold">
                    <strong>📞 Telephone:</strong> (+94) 112 456 789
                  </p>
                  <p className="text-lg font-semibold">
                    <strong>📠 Fax:</strong> (+94) 112 456 789
                  </p>
                  </div>

                  <iframe
                  title="University of Moratuwa Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.360533155476!2d79.9637754162171!3d6.780373092672246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25dada6fbd83b%3A0x2c3f3f70dcfb94c6!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1638971349918!5m2!1sen!2slk"
                  width="100%"
                  height="250"
                  style={{ border: 2, marginTop: "20px", marginBottom: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  ></iframe>
                </div>
                </div>
              </CardContent>
              </Card>

              <Card
              sx={{
                flex: 1,
                p: 7,
                minWidth: "300px",
                backgroundColor: "rgba(255, 255, 255, 0.7)", 
          borderRadius: "10px",
          borderColor: "#125488",
          borderWidth: "1px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: "24px",
              color: "#034c81",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="subject"
              label="Subject *"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                name="firstName"
                label="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                name="lastName"
                label="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                name="mobileNo"
                label="Mobile No *"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                name="email"
                label="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="message"
              label="Your Message *"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={6}
            />
            <CardButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </CardButton>
          </form>
          {message && (
            <Typography
              variant="body2"
              color="red"
              sx={{ textAlign: 'center', marginTop: '10px' }}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsComp;