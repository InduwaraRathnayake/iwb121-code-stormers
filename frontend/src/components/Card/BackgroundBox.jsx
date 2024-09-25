import { styled } from '@mui/system';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const StyledBackgroundBox = styled(Box)(({ backgroundImg }) => ({
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', // Change text color for better visibility
}));

const BackgroundBox = ({ backgroundImg, children }) => {
    return (
        <StyledBackgroundBox backgroundImg={backgroundImg}>
            {children}
        </StyledBackgroundBox>
    );
};

BackgroundBox.propTypes = {
    backgroundImg: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default BackgroundBox;