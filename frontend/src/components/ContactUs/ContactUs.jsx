import React from 'react';

const ContactUsComp = () => {
  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <div style={inputHafStyle2}>
          <h2 >Contact Details</h2>
          <p><strong>Head Office :</strong> <br /> 160/16 Kirimandala Mawatha, Narahenpita, Colombo 5, Sri Lanka.</p>
        </div>
        <div style={inputHalStyle1}>
          <div style={inputHafStyle2}>
            <p><strong>Email :</strong> info@example.com</p>
            <p><strong>Email (Marketing) :</strong> marketing@example.com</p>
          </div>
          <div style={inputHafStyle2}>
            <p><strong>Telephone :</strong> (+94) 112 102 700</p>
            <p><strong>Fax :</strong> (+94) 112 368 010</p>
          </div>
        </div>
        <div style={inputHafStyle2}>
          <h3>Opening Hours</h3>
          <p><strong>Monday-Friday :</strong> 08:30 - 17:30</p>
          <p><strong>Saturday :</strong> 08:30 - 17:30</p>
        </div>
      </div>

      <div style={rightSectionStyle}>
        <h2>Contact Us</h2>
        <form style={formStyle}>
          <input style={inputStyle} type="text" placeholder="Subject *" />
          
          <div style={flexContainer}>
            <input style={inputHalfStyle} type="text" placeholder="First Name *" />
            <input style={inputHalfStyle} type="text" placeholder="Last Name *" />
          </div>
          <div style={flexContainer}>
            <input style={inputHalfStyle} type="text" placeholder="Mobile No *" />
            <input style={inputHalfStyle} type="email" placeholder="Email Address *" />
          </div>
          
          <textarea style={textareaStyle} placeholder="Your Message *"></textarea>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  backgroundColor: '#125488', // Updated background color
};

const leftSectionStyle = {
  flex: 1,
  padding: '20px',
  textAlign: 'left',
  color: 'white', // Changed font color to white
};

const rightSectionStyle = {
  flex: 1,
  padding: '20px',
  color: 'white', // Changed font color to white
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: 'white', // Changed font color to white
};

const inputStyle = {
  padding: '10px',
  margin: '4px',
  fontSize: '16px',
  width: '96%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: 'black', // Ensuring input text is readable
};

const inputHalfStyle = {
  padding: '9px',
  marginBottom: '10px',
  fontSize: '16px',
  width: '48%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  margin: '4px',
  color: 'black', // Ensuring input text is readable
};

const inputHalStyle1 = {
  fontSize: '16px',
  width: '100%',
  borderRadius: '5px',
  display: 'flex',
  color: 'white', // Changed font color to white
};

const inputHafStyle2 = {
  marginBottom: '10px',
  fontSize: '16px',
  width: '100%',
  borderRadius: '5px',
  color: 'white', // Changed font color to white
};

const flexContainer = {
  display: 'flex',
  justifyContent: 'space-between',
};

const textareaStyle = {
  padding: '10px',
  marginBottom: '10px',
  margin: '4px',
  fontSize: '16px',
  width: '96%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  height: '100px',
  color: 'black', // Ensuring textarea text is readable
};

const buttonStyle = {
  backgroundColor: '#f77f00', // Updated submit button color
  color: '#fff',
  padding: '10px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '99%',
  margin: '4px',
};

export default ContactUsComp;
