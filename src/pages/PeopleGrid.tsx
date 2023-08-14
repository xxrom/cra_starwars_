import React, { memo, useEffect, useRef } from 'react';
import { useStore } from '../hooks/useStore/useStore';
import { Pagination, PeopleList } from '../components';

export const PeopleGrid = memo(() => {
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
