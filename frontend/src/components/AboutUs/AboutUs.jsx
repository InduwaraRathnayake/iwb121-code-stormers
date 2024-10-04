import React from 'react';

const teamMembers = [
  {
    name: 'Mia Ward',
    title: 'Founder & CEO',
    description: 'Mia leads the company with a passion for innovation.',
    image: '/Unui.jpg', 
  },
  {
    name: 'Phoenix Baker',
    title: 'Head of Engineering',
    description: 'Phoenix is responsible for engineering and technology.',
    image: '/Unui.jpg', 
  },
  {
    name: 'Lana Steiner',
    title: 'Chief Operating Officer',
    description: 'Lana oversees the company’s operations and strategy.',
    image: '/Unui.jpg', 
  },
  {
    name: 'Alex Johnson',
    title: 'Chief Marketing Officer',
    description: 'Alex drives our marketing and brand strategies.',
    image: '/Unui.jpg',
  },
];

const AboutUs = () => {
  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>About Us</h1>
      <h2 style={headerStyle}>
        Meet our team of creators, designers, and world-class problem solvers
      </h2>
      <p style={subHeaderStyle}>
        To be the company our customers want us to be, it takes an eclectic group of passionate operators. Get to know the people leading the way.
      </p>
      <br />

      <div style={gridContainerStyle}>
        {teamMembers.map((member, index) => {
          const isLeftAligned = index % 2 === 0; 
          const cardAlignmentStyle = isLeftAligned ? cardLeftStyle : cardRightStyle;
          const textAlignmentStyle = isLeftAligned ? textContainerStyle : textContainerStyleRight;
          const imageMarginStyle = isLeftAligned ? imageContainerStyle : imageContainerStyleRight;
          const cardMarginStyle = isLeftAligned
            ? { marginLeft: '0', marginRight: 'auto' }
            : { marginRight: '0', marginLeft: 'auto' };

          return (
            <div
              key={index}
              style={{ ...cardStyle, ...cardAlignmentStyle, ...cardMarginStyle }}
            >
              <div style={textAlignmentStyle}>
                <h3 style={nameStyle}>{member.name}</h3>
                <p style={titleStyle}>{member.title}</p>
                <p style={descriptionStyle}>{member.description}</p>
              </div>
              <div style={imageMarginStyle}>
                <img src={member.image} alt={member.name} style={avatarStyle} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#E0F7FA', 
};

const h1Style = {
  fontFamily: '"Arial", sans-serif',
  fontSize: '2.5em',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#0A74DA',
};

const headerStyle = {
    marginBottom: '20px',
    color: '#0A74DA',
  };

const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};


const subHeaderStyle = {
    marginBottom: '40px',
    fontStyle: 'italic',
    color: '#333', 
  };

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '600px',
  padding: '20px',
  backgroundColor: '#125488', 
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '20px', 
};

const cardLeftStyle = {
  flexDirection: 'row', 
};

const cardRightStyle = {
  flexDirection: 'row-reverse', 
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  flex: '1',
};

const textContainerStyleRight = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  flex: '1',
};

const imageContainerStyle = {
  marginLeft: '20px',
};

const imageContainerStyleRight = {
  marginRight: '20px',
};

const avatarStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '0',
  objectFit: 'cover',
  border: '2px solid #0A74DA',
};

const nameStyle = {
  fontWeight: 'bold',
  fontSize: '1.4em',
  margin: '0 0 5px',
  color: '#FFFFFF',
};

const titleStyle = {
  color: '#B0E5FF',
  fontSize: '1em',
  margin: '0 0 10px',
};

const descriptionStyle = {
  fontSize: '0.9em',
  color: '#B0E5FF',
};

export default AboutUs;
