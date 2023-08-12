import { Button } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const mockTimeout = (timeout = 1000) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });

export type PersonType = {
  name: string;
  birth_year: string;
  gender: string;
  mass: string;
  height: string;
};

export type PersonCardType = {
  index: number;
} & PersonType;

const PersonCard = ({ index, name = 'name' }: PersonCardType) => {
  return <div>{`${index + 1} / PersonCard ${name}`}</div>;
};

export const ListOfPersons = () => {
  const initRef = useRef(false);
  const [people, setPeople] = useState<Array<PersonType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async (page = 1) => {
    setIsLoading(true);

    const { results = [] } = await fetch(
      `https://swapi.dev/api/people/?page=${page}`
    ).then((res) => res.json());

    await mockTimeout();

    console.log('Data', results);

    setIsLoading(false);
    setPeople((current) => [...current, ...results]);
  }, []);

  useEffect(() => {
    // Fetch Data only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    if (typeof initRef?.current !== 'undefined') {
      initRef.current = true;
    }

    getData();
  }, [getData]);

  const loadMore = useCallback(() => getData(2), [getData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{`Persons size = ${people.length}`}</div>

      {people.map((personProps, index) => (
        <PersonCard
          key={`${index}${personProps?.name}`}
          index={index}
          {...personProps}
        />
      ))}

      <Button onClick={loadMore}>Load More </Button>
    </div>
  );
};
