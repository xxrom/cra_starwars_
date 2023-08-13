import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, SkeletonText } from '@chakra-ui/react';
import { useStore } from '../hooks/useStore/useStore';
import { PersonCard } from '../components';

const mockTimeout = (timeout = 400) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });

export const People = memo(() => {
  const initRef = useRef(false);

  const { openedPage, setOpenedPage, pagesMap, addPage, getPageByPeopleIDs } =
    useStore();
  const [isLoading, setIsLoading] = useState(false);

  const currentPageIDs = pagesMap[openedPage] ?? [];
  const people = getPageByPeopleIDs(currentPageIDs);

  const getData = useCallback(
    async (fetchPage: number) => {
      if (pagesMap[fetchPage]) {
        return;
      }

      setIsLoading(true);

      const { results = [] } = await fetch(
        `https://swapi.dev/api/people/?page=${fetchPage}`
      ).then((res) => res.json());

      await mockTimeout();

      addPage(fetchPage, results);

      setIsLoading(false);
      setOpenedPage(fetchPage);
    },
    [pagesMap, addPage, setOpenedPage]
  );

  useEffect(() => {
    // Fetch Data only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    if (typeof initRef?.current !== 'undefined') {
      initRef.current = true;
    }

    getData(1);
  }, [getData]);

  const loadMore = useCallback(
    () => getData(openedPage + 1),
    [getData, openedPage]
  );

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

      <div>{`pages: ${openedPage}`}</div>

      <Button onClick={loadMore}>Load More </Button>
    </>
  );
});
