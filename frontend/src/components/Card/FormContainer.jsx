import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledFormContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '600px',
    border: '2px solid #1089D3', // Add border for definition
    backdropFilter: 'blur(10px)', // Blur effect for a stylish look
}));

const FormContainer = ({ children }) => {
    return <StyledFormContainer>{children}</StyledFormContainer>;
};
FormContainer.propTypes = {
    children: PropTypes.node
};

export default FormContainer;