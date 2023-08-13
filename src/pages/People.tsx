import React, { memo, useEffect, useRef } from 'react';
import { Box, SkeletonText } from '@chakra-ui/react';
import { PersonType, useStore } from '../hooks/useStore/useStore';
import { Pagination, PersonCard } from '../components';

const PeopleList = memo(({ people }: { people: Array<PersonType> }) => {
  const { openedPage, isLoading } = useStore();

  const peopleList = people.length > 0 ? people : Array(10).fill(0);

  if (openedPage > 1 && people.length === 0) {
    return <Box py="14">Page is empty.</Box>;
  }

  return (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="8">
      {peopleList.map((personProps, index) => (
        <SkeletonText
          key={index}
          isLoaded={!isLoading}
          mt="4"
          noOfLines={1}
          spacing="4"
          skeletonHeight="8"
          startColor="pink.500"
          endColor="orange.500"
        >
          <PersonCard
            key={`${index}${personProps?.name}`}
            index={index}
            {...personProps}
          />
        </SkeletonText>
      ))}
    </Box>
  );
});

export const People = memo(() => {
  const initRef = useRef(false);

  const { openedPage, pagesMap, getPageByPeopleIDs, loadPage } = useStore();

  const currentPageIDs = pagesMap[openedPage] ?? [];
  const people = getPageByPeopleIDs(currentPageIDs);

  useEffect(() => {
    // Fetch Data only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    if (typeof initRef?.current !== 'undefined') {
      initRef.current = true;
    }

    loadPage(1);
  }, [loadPage]);

  return (
    <>
      <PeopleList people={people} />

      <Pagination />
    </>
  );
});
