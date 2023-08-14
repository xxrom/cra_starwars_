import React, { memo, useEffect, useRef } from 'react';
import { useStore } from '../hooks/useStore/useStore';
import { Pagination, PeopleList } from '../components';

export const PeopleGrid = memo(() => {
  const initRef = useRef(false);
  console.log('Render PeopleGrid');

  const { openedPage, pagesMap, getPageByPeopleIDs, loadPage } = useStore(
    (store) => ({
      openedPage: store.openedPage,
      pagesMap: store.pagesMap,
      getPageByPeopleIDs: store.getPageByPeopleIDs,
      loadPage: store.loadPage,
    })
  );

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

    loadPage(openedPage);
  });

  return (
    <>
      <PeopleList people={people} />

      <Pagination />
    </>
  );
});
