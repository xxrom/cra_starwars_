import { Box, Button } from '@chakra-ui/react';
import React, { memo, useCallback } from 'react';
import { useStore } from '../hooks';

export const Pagination = memo(() => {
  const { openedPage, loadPage, pagesMap } = useStore();

  const pages = Object.keys(pagesMap).map(Number);

  const loadMore = useCallback(
    (loadPageNumber = 1) =>
      () =>
        loadPage(loadPageNumber),
    [loadPage]
  );

  return (
    <Box px="6" py="3" mt="3" boxShadow="lg" bg="white">
      <div>{`pages: ${openedPage}`}</div>

      <div>
        <Button ml="3" display="inline-flex" onClick={loadMore(1)}>
          First
        </Button>

        <Button ml="3" display="inline-flex" onClick={loadMore(openedPage - 1)}>
          Prev
        </Button>

        {pages.map((key) => (
          <span key={key} onClick={loadMore(key)}>
            {` -${key}- `}
          </span>
        ))}

        <Button ml="3" display="inline-flex" onClick={loadMore(openedPage + 1)}>
          Next
        </Button>

        <Button
          ml="3"
          display="inline-flex"
          onClick={loadMore(pages.length + 1)}
        >
          Load More
        </Button>
      </div>
    </Box>
  );
});
