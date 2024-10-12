import { Typography } from "@mui/material";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";

const teamMembers = [
  {
    name: "Induwara Rathnayake",
    title: "Department of Computer Science & Engineering, University of Moratuwa",
    description: "induwarar.22@cse.mrt.ac.lk",
    image: profile1,
  },
  {
    name: "Pathumi Ranasinghe",
    title: "Department of Computer Science & Engineering, University of Moratuwa",
    description: "pathumi.22@cse.mrt.ac.lk",
    image: profile2,
  },
  {
    name: "Sanuji Samarakoon",
    title: "Department of Computer Science & Engineering, University of Moratuwa",
    description: "sanuji.22@cse.mrt.ac.lk",
    image: profile3,
  },
  {
    name: "Shanthisha Jayathunga",
    title: "Department of Computer Science & Engineering, University of Moratuwa",
    description: "shanthisha.22@cse.mrt.ac.lk",
    image: profile4,
  },
];

const About = () => {
  return (
    <div className="p-5 text-center">
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
      <h1 className="mb-2 text-2xl font-bold text-blue-800">
        Meet our team of creators, designers, and world-class problem solvers
      </h1>
      <p className="mb-5 italic text-gray-700 text-lg">
        To be the company our customers want us to be, it takes an eclectic
        group of passionate operators. Get to know the people leading the way.
      </p>
      <br />

      <div className="flex flex-col gap-5">
        {teamMembers.map((member, index) => {
          const isLeftAligned = index % 2 === 0;
          const cardAlignmentStyle = isLeftAligned
            ? "lg:flex-row lg:mr-auto lg:ml-20"
            : "lg:flex-row-reverse lg:ml-auto lg:mr-20";

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex ${cardAlignmentStyle} items-center w-full lg:w-[650px] h-auto lg:h-[200px] p-5 bg-[rgba(153,255,255,0.2)] shadow-[0_4px_10px_rgba(0,0,0,0.1)] lg:rounded-[100px] border-2 border-[rgba(10,116,218,0.5)] mb-[-20px]`}
            >
              <div className={`flex flex-col text-center flex-1 mb-3`}>
                <h3 className="text-[1.4em] font-bold text-[#034c81] mb-[5px]">
                  {member.name}
                </h3>
                <p className="text-[#0a2472] text-[1em] mb-[10px]">
                  {member.title}
                </p>
                <p className="text-[#123499] text-[0.9em]">
                  {member.description}
                </p>
              </div>
              <div className={`${isLeftAligned ? 'ml-[20px]' : 'mr-[20px]'} lg:ml-5 lg:mr-5`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[150px] h-[150px] rounded-full object-cover border-2 border-[#0A74DA]"
                />
              </div>
            </div>
          );
        })}
        <br></br>
      </div>
    </div>
  );
};

export default About;