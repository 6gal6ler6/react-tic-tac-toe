import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => (
  <Grid templateColumns="repeat(3, 100px)" gap={2}>
    {squares.map((square, i) => (
      <GridItem key={i}>
        <Square value={square} onClick={() => onClick(i)} />
      </GridItem>
    ))}
  </Grid>
);

export default Board;
