import React, { memo } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PersonType } from '../hooks/useStore/useStore';

export type PersonCardType = PersonType;

export const PersonCard = memo(({ id, name, height, mass }: PersonCardType) => {
  return (
    <Box
      display="flex"
      alignContent="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <div>{`id: ${id} / name: ${name} / height: ${height} / mass: ${mass}`}</div>

      <Link to={`/${id}`}>
        <Button ml="2" size="sm">
          Edit
        </Button>
      </Link>
    </Box>
  );
});
