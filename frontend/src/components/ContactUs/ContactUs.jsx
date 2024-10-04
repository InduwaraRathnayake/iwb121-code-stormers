import React from 'react';

const ContactUsComp = () => {
  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <div style={inputHafStyle2}>
          <h2 style={{ textAlign: 'center' }}>Contact Details</h2>
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
          <h3 style={{ textAlign: 'center' }}>Opening Hours</h3>
          <p><strong>Monday-Friday :</strong> 08:30 - 17:30</p>
          <p><strong>Saturday :</strong> 08:30 - 17:30</p>
        </div>
      </div>

      <div style={rightSectionStyle}>
        <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
        <form style={formStyle}>
          <input style={inputStyle} type="text" placeholder="Subject *" />
          
          <div style={flexContainer}>
            <input style={inputHalfStyle1} type="text" placeholder="First Name *" />
            <input style={inputHalfStyle2} type="text" placeholder="Last Name *" />
          </div>
          <div style={flexContainer}>
            <input style={inputHalfStyle1} type="text" placeholder="Mobile No *" />
            <input style={inputHalfStyle2} type="email" placeholder="Email Address *" />
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
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',  
  padding: '20px',
  backgroundColor: '#125488', 
};

const leftSectionStyle = {
  flex: '1 1 45%', 
  padding: '20px',
  color: 'white',
  minWidth: '300px', 
};

const rightSectionStyle = {
  flex: '1 1 45%', 
  padding: '20px',
  color: 'white',
  minWidth: '300px',
  maxWidth: '100%', 
  overflow: 'hidden', 
  wordWrap: 'break-word', 
  boxSizing: 'border-box',
};


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
};



const inputStyle = {
  fontSize: '16px',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  padding: '8px',
  margin: '4px 0',  
  color: 'black',
  boxSizing: 'border-box', 
};

const inputHalfStyle1 = {
  padding: '9px',
  marginBottom: '10px',
  fontSize: '16px',
  width: '50%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  margin:'0',
  color: 'black',
  display:'flex',
  justifyContent:'center',
  flex: 1, 
  
};
const inputHalfStyle2 = {
  padding: '9px',
  marginBottom: '10px',
  fontSize: '16px',
  width: '50%', 
  borderRadius: '5px',
  border: '1px solid #ccc',
 margin:'0',
  color: 'black',
  display:'flex',
  justifyContent:'center',
  flex: 1, 
};

const inputHalStyle1 = {
  flex: '1 1 45%',
  fontSize: '16px',
  width: '100%',
  borderRadius: '5px',
  display: 'flex',
  flexWrap: 'wrap',
  color: 'white',
};

const inputHafStyle2 = {
  flex: '1 1 45%',
  marginBottom: '10px',
  fontSize: '16px',
  width: '100%',
  borderRadius: '5px',
  color: 'white',
};


const flexContainer = {
  margin: '4px 0',  
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: '100%',  
  boxSizing: 'border-box', 
};



const textareaStyle = {
  padding: '10px',
  margin: '4px 0',  
  fontSize: '16px',
  width: '100%',  
  borderRadius: '5px',
  border: '1px solid #ccc',
  height: '100px',
  color: 'black',
  boxSizing: 'border-box',  
};


const buttonStyle = {
  backgroundColor: '#f77f00',
  color: '#fff',
  padding: '10px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',  
  margin: '4px 0',  
  boxSizing: 'border-box', 
};

// Media query to handle layout for smaller screens
const mediaQuery = `
  @media (max-width: 768px) {
    ${containerStyle} {
      flex-direction: column; // Stack on smaller screens
    }

    ${leftSectionStyle}, ${rightSectionStyle} {
      flex: 1 1 100%; // Full width for both sections
    }
  }
`;

export default ContactUsComp;
