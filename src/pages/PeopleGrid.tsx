import React, { memo, useEffect, useRef } from 'react';
import { ErrorBoundary, Pagination, PeopleList } from '../components';
import { useOpenedPage, usePagesActions, usePagesMap } from '../hooks';

export const PeopleGrid = memo(() => {
  const initRef = useRef(false);

  const openedPage = useOpenedPage();
  const pagesMap = usePagesMap();
  const { getPageByPeopleIDs, loadPage } = usePagesActions();

  const currentPageIDs = pagesMap[openedPage] ?? [];
  const people = getPageByPeopleIDs(currentPageIDs);

  useEffect(() => {
    // Init fetch data only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    // Mark first enter
    if (typeof initRef?.current !== 'undefined') {
      initRef.current = true;
    }

    loadPage(openedPage);
  }, [loadPage, openedPage]);

  return (
    <>
      <PeopleList people={people} />

      <Pagination />
    </>
  );
});
