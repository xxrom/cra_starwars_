import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, SkeletonText } from '@chakra-ui/react';
import { useStore } from '../hooks/useStore/useStore';
import { Pagination, PersonCard } from '../components';

export const People = memo(() => {
  const initRef = useRef(false);

  const { openedPage, isLoading, pagesMap, getPageByPeopleIDs, loadPage } =
    useStore();

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
      <div>{`People size = ${people.length}`}</div>

      <Box padding="6" boxShadow="lg" bg="white">
        {(people.length > 0 ? people : Array(10).fill(0)).map(
          (personProps, index) => (
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
          )
        )}
      </Box>

      <Pagination />
    </>
  );
});
