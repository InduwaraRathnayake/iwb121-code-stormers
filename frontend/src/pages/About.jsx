import { Typography } from "@mui/material";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";

const teamMembers = [
  {
    name: "Induwara Rathnayake",
    title: "Department of Computer Science & Engineering, Universty of Moratuwa",
    description: "induwarar.22@cse.mrt.ac.lk",
    image: profile1,
  },
  {
    name: "Pathumi Ranasinghe",
    title: "Department of Computer Science & Engineering, Universty of Moratuwa",
    description: "pathumi.22@cse.mrt.ac.lk",
    image: profile2,
  },
  {
    name: "Sanuji Samarakoon",
    title: "Department of Computer Science & Engineering, Universty of Moratuwa",
    description: "sanuji.22@cse.mrt.ac.lk",
    image: "/Unui.jpg",
  },
  {
    name: "Shanthisha Jayathunga",
    title: "Department of Computer Science & Engineering, Universty of Moratuwa",
    description: "shanthisha.22@cse.mrt.ac.lk",
    image: "/Unui.jpg",
  },
];

const About = () => {
  return (
    <div style={containerStyle}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 900,
          fontSize: "40px",
          color: "#034c81",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        About Us
      </Typography>
      <h1 style={{ ...headerStyle, fontWeight: "bold" }}>
        Meet our team of creators, designers, and world-class problem solvers
      </h1>
      <p style={subHeaderStyle}>
        To be the company our customers want us to be, it takes an eclectic
        group of passionate operators. Get to know the people leading the way.
      </p>
      <br />

      <div style={gridContainerStyle}>
        {teamMembers.map((member, index) => {
          const isLeftAligned = index % 2 === 0;
          const cardAlignmentStyle = isLeftAligned
            ? cardLeftStyle
            : cardRightStyle;
          const textAlignmentStyle = isLeftAligned
            ? textContainerStyle
            : textContainerStyleRight;
          const imageMarginStyle = isLeftAligned
            ? imageContainerStyle
            : imageContainerStyleRight;
          const cardMarginStyle = isLeftAligned
            ? { marginLeft: "0", marginRight: "auto" }
            : { marginRight: "0", marginLeft: "auto" };

          return (
            <div
              key={index}
              style={{
                ...cardStyle,
                ...cardAlignmentStyle,
                ...cardMarginStyle,
              }}
            >
              <div style={textAlignmentStyle}>
                <h3 style={{ ...nameStyle, fontWeight: "bold" }}>{member.name}</h3>
                <p style={titleStyle}>{member.title}</p>
                <p style={descriptionStyle}>{member.description}</p>
              </div>
              <div style={imageMarginStyle}>
                <img src={member.image} alt={member.name} style={avatarStyle} />
              </div>
            </div>
          );
        })}
        <br></br>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  textAlign: "center",
};

const headerStyle = {
  marginBottom: "10px",
  color: "#0A74DA",
  fontSize: "1.5em",
};

const gridContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 0, // Reduced gap between cards to 5px
};

const subHeaderStyle = {
  marginBottom: "20px",
  fontStyle: "italic",
  color: "#333",
  fontSize: "1.2em",
};

const cardStyle = {
  display: "flex",
  alignItems: "center",
  width: "650px",
  height: "200px",
  padding: "20px",
  backgroundColor: "rgba(18, 84, 136, 0.5)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "100px",
  border: "2px solid rgba(10, 116, 218, 0.5)",
  marginBottom: "-20px", // Example of using a negative margin to pull cards closer
};


const cardLeftStyle = {
  flexDirection: "row",
};

const cardRightStyle = {
  flexDirection: "row-reverse",
};

const textContainerStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  flex: "1",
};

const textContainerStyleRight = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  flex: "1",
};

const imageContainerStyle = {
  marginLeft: "20px",
};

const imageContainerStyleRight = {
  marginRight: "20px",
  padding: "20px",
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%", // Make the image round
  objectFit: "cover",
  border: "2px solid #0A74DA",
  
};

const nameStyle = {
  fontSize: "1.4em",
  margin: "0 0 5px",
  color: "#FFFFFF",
  textAlign: "center",
};

const titleStyle = {
  color: "#0a2472",
  fontSize: "1em",
  margin: "0 0 10px",
  textAlign: "center",
};

const descriptionStyle = {
  fontSize: "0.9em",
  color: "#123499",
  textAlign: "center",
  
};

export default About;
