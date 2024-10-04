import { Typography, Card, CardContent } from "@mui/material";

const ContactUsComp = () => {
  return (
    <div className="flex flex-wrap justify-between items-start p-5 ">
       <Card
        sx={{
          flex: 1,
          p: 5,
          minWidth: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Set background with opacity
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
            Contact details
          </Typography>
          <div className="text-[#125488] ">
          <p className="text-lg font-semibold">
            <strong>Head Office:</strong> <br /> University of Moratuwa
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
                <strong>Email:</strong> wellness360@gmail.com
              </p>
              <p className="text-lg font-semibold">
                <strong>Email (Marketing):</strong> wellness360official@gmail.com
              </p>
            </div>
            <div className="w-full mb-4">
              <p className="text-lg font-semibold">
                <strong>Telephone:</strong> (+94) 112 456 789
              </p>
              <p className="text-lg font-semibold">
                <strong>Fax:</strong> (+94) 112 456 789
              </p>
            </div>

            <iframe
              title="University of Moratuwa Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.360533155476!2d79.9637754162171!3d6.780373092672246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25dada6fbd83b%3A0x2c3f3f70dcfb94c6!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1638971349918!5m2!1sen!2slk"
              width="100%"
              height="250"
              style={{ border: 2 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex-1 p-5 text-[#125488] min-w-[300px] max-w-full overflow-hidden">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: "24px",
            color: "#034c81",
            textAlign: "center",
            marginBottom: "20px",
            mb:5
          }}
        >
          Contact Us
        </Typography>
        <form className="flex flex-col">
          <input
            className="text-black rounded-md border border-gray-300 p-2 mb-4"
            type="text"
            placeholder="Subject *"
          />

          <div className="flex mb-4">
            <input
              className="text-black rounded-md border border-gray-300 p-2 w-1/2 mr-2"
              type="text"
              placeholder="First Name *"
            />
            <input
              className="text-black rounded-md border border-gray-300 p-2 w-1/2"
              type="text"
              placeholder="Last Name *"
            />
          </div>
          <div className="flex mb-4">
            <input
              className="text-black rounded-md border border-gray-300 p-2 w-1/2 mr-2"
              type="text"
              placeholder="Mobile No *"
            />
            <input
              className="text-black rounded-md border border-gray-300 p-2 w-1/2"
              type="email"
              placeholder="Email Address *"
            />
          </div>

          <textarea
            className="text-black rounded-md border border-gray-300 p-2 mb-4 h-30"
            rows="6"
            placeholder="Your Message *"
          ></textarea>
          
          <button className="bg-[#125488] text-white p-2 rounded-md cursor-pointer w-full mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsComp;
