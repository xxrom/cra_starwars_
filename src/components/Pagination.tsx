import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useStore } from '../hooks';

const MIN_PAGES = 5;

export const Pagination = memo(() => {
  const openedPage = useStore((store) => store.openedPage);
  const loadPage = useStore((store) => store.loadPage);
  const pagesMap = useStore((store) => store.pagesMap);
  const clearAll = useStore((store) => store.clearAll);

  const [pages, setPages] = useState<Array<number>>([]);

  useEffect(() => {
    const allKeys = Object.keys(pagesMap).map(Number);
    const maxPageNum = Math.max(...allKeys);

    const maxNum = maxPageNum > MIN_PAGES ? maxPageNum : MIN_PAGES;
    const pageKeys = Array(maxNum)
      .fill(0)
      .map((_, index) => index + 1);

    setPages([...pageKeys]);
  }, [pagesMap]);

  const loadMore = useCallback(
    (loadPageNumber = 1) =>
      () =>
        loadPage(loadPageNumber),
    [loadPage]
  );

  return (
    <Box
      px="5"
      py="3"
      mt="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow="lg"
      borderRadius="8"
      bg="white"
    >
      <Box display="flex" alignItems="center">
        <Button
          mx="1"
          display="inline-flex"
          isDisabled={openedPage === 1}
          onClick={loadMore(openedPage - 1)}
        >
          {'<'}
        </Button>

        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          {pages.map((key) => (
            <Box
              px="1"
              display="inline-flex"
              background={key === openedPage ? 'gray.600' : 'transparent'}
              color={key === openedPage ? 'white' : 'black'}
              cursor="pointer"
              borderRadius="4"
              key={key}
              onClick={loadMore(key)}
            >
              {pagesMap[key] ? `_${key}_ ` : `~${key}~`}
            </Box>
          ))}
        </Box>

        <Button mx="1" display="inline-flex" onClick={loadMore(openedPage + 1)}>
          {'>'}
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" mt="3">
        <Button
          m="1"
          display="inline-flex"
          onClick={loadMore(pages.length + 1)}
        >
          Load
        </Button>

        <Button m="1" display="inline-flex" onClick={clearAll}>
          Clear
        </Button>
      </Box>
    </Box>
  );
});
