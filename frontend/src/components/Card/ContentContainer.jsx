import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContentContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    textAlign: 'center',
}));
const ContentContainer = ({ children }) => {
    return (
        <StyledContentContainer>
            {children}
        </StyledContentContainer>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.node
};

export default ContentContainer;
