import { Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BmiBannerCard from './bmi-banner'; 
import WHRCard from './WHR-banner'; 

const CalculatorsCard = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      rotateY: direction === 'left' ? 75 : -75, 
      x: direction === 'left' ? '-50%' : '50%', 
    }),
    visible: {
      opacity: 1,
      rotateY: 0, 
      x: 0, 
      transition: { duration: 1.5 },
    },
  };

  return (
    <Container ref={ref}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minHeight="100vh"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }} 
      >
        <motion.div
          custom="left"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          style={{ flex: 1, marginRight: { xs: 0, md: 2 } }}
        >
          <WHRCard /> {/* WHR card on the left */}
        </motion.div>
        <motion.div
          custom="right"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          style={{ flex: 1, marginLeft: { xs: 0, md: 2 } }}
        >
          <BmiBannerCard /> {/* BMI card on the right */}
        </motion.div>
      </Box>
    </Container>
  );
};

export default CalculatorsCard;
