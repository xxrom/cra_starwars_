import React, { memo, useEffect, useRef } from 'react';
import { useStore } from '../hooks/useStore/useStore';
import { Pagination, PeopleList } from '../components';

export const PeopleGrid = memo(() => {
  const initRef = useRef(false);

  const openedPage = useStore((store) => store.openedPage);
  const pagesMap = useStore((store) => store.pagesMap);
  const getPageByPeopleIDs = useStore((store) => store.getPageByPeopleIDs);
  const loadPage = useStore((store) => store.loadPage);

  const currentPageIDs = pagesMap[openedPage] ?? [];
  const people = getPageByPeopleIDs(currentPageIDs);

  useEffect(() => {
    // Init fetch data only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    if (typeof initRef?.current !== 'undefined') {
      initRef.current = true;
    }

    loadPage(openedPage);
  });

  return (
    <>
      <PeopleList people={people} />

      <Pagination />
    </>
  );
});
