import React from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const OpponentSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (opponent: string) => {
    navigate(`/game?opponent=${opponent}`);
  };

  return (
    <Box textAlign="center" mt={5}>
      <Text mb={8} fontSize="2xl">Select Player 2</Text>
      <VStack spacing={4}>
        <Button onClick={() => handleStartGame('cpu')} width="200px">
          CPU
        </Button>
        <Button onClick={() => handleStartGame('human')} width="200px">
          Player
        </Button>
      </VStack>
    </Box>
  );
};

export default OpponentSelection;
