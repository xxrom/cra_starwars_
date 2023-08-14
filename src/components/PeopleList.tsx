import React, { memo } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { PersonCard } from '.';
import { PersonType } from '../hooks/useStore/useStore';
import { useStore } from '../hooks';

export const PeopleList = memo(({ people }: { people: Array<PersonType> }) => {
  const { isLoading } = useStore();

  const peopleList = people.length > 0 ? people : Array(10).fill(0);

  if (people.length === 0 && !isLoading) {
    return <Box py="14">Page is empty.</Box>;
  }

  return (
    <Box padding="16px" boxShadow="lg" bg="white" borderRadius="8">
      <SimpleGrid minChildWidth="160px" spacing="16px">
        {peopleList.map((personProps, index) => (
          <PersonCard
            key={`${index}${personProps?.name}`}
            index={index}
            {...personProps}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
});
