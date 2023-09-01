import React, { memo } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { ErrorBoundary, PersonCard, SearchPeople } from '.';
import { useLoadingIsLoading } from '../hooks';
import { PersonType } from '../hooks/useStore/peopleSlice';

export const SKELETON_ITEMS = 10;

export const PeopleList = memo(({ people }: { people: Array<PersonType> }) => {
  const isLoading = useLoadingIsLoading();

  const peopleList = people.length > 0 ? people : Array(SKELETON_ITEMS).fill(0);

  let Content = null;

  if (people.length === 0 && !isLoading) {
    Content = (
      <Box
        display="flex"
        justifyContent="center"
        py="16"
        px="2"
        boxShadow="lg"
        bg="white"
        borderRadius="6"
      >
        Page is empty.
      </Box>
    );
  } else {
    Content = (
      <SimpleGrid minChildWidth="200px" spacing="16px">
        {peopleList.map((personProps, index) => (
          <PersonCard
            key={`${index}${personProps?.name}`}
            index={index}
            {...personProps}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <ErrorBoundary>
      <Box
        padding="16px"
        boxShadow="lg"
        bg="white"
        backgroundColor="gray.100"
        borderRadius="6"
      >
        <SearchPeople />

        {Content}
      </Box>
    </ErrorBoundary>
  );
});
