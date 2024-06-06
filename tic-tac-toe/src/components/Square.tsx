import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const MotionBox = motion(Box);

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const textColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.500");

  return (
    <MotionBox
      as="button"
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="36px"
      width="100px"
      height="100px"
      borderWidth="1px"
      borderColor={borderColor}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      backgroundColor={bgColor}
      color={textColor}
    >
      {value}
    </MotionBox>
  );
};

export default Square;
