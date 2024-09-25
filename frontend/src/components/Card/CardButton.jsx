import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CardButton = ({ children, onClick, type = "button", ...props }) => {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, #1089D3 0%, #12B1D1 100%)",
        color: "white",
        padding: "15px",
        marginTop: "20px",
        borderRadius: "20px",
        boxShadow: "rgba(133, 189, 215, 0.878) 0px 20px 10px -15px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "rgba(133, 189, 215, 0.878) 0px 23px 10px -20px",
        },
        "&:active": {
          transform: "scale(0.95)",
          boxShadow: "rgba(133, 189, 215, 0.878) 0px 15px 10px -10px",
        },
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
CardButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default CardButton;
