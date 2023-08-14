import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useStore } from '../hooks';

const MIN_PAGES = 5;

export const Pagination = memo(() => {
  const { openedPage, loadPage, pagesMap, clearAll } = useStore();
  const [pages, setPages] = useState<Array<number>>([]);

  useEffect(() => {
    const allKeys = Object.keys(pagesMap).map(Number);
    const pagesSize = allKeys.length > MIN_PAGES ? allKeys.length : MIN_PAGES;
    const pageKeys = Array(pagesSize)
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

  const onClearAll = useCallback(() => clearAll(), [clearAll]);

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

        <Button m="1" display="inline-flex" onClick={onClearAll}>
          Clear
        </Button>
      </Box>
    </Box>
  );
});
