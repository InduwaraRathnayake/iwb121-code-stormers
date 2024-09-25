import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledTitleBox = styled(Box)(() => ({
    marginBottom: '30px',
}));

const TitleBox = ({ children }) => {
    return <StyledTitleBox>{children}</StyledTitleBox>;
};
TitleBox.propTypes = {
    children: PropTypes.node
};
export default TitleBox;