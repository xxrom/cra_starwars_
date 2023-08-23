import React, { memo, useCallback } from 'react';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';
import { useStore } from '../hooks';

//export type SearchPeopleType = {};

export const SearchPeople = memo(() => {
  const { actionsSearch } = useStore();
  const { setSearch } = actionsSearch;

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value;

      setSearch(value);
    },
    [setSearch]
  );

  return (
    <InputGroup mb="3">
      <InputLeftAddon
        p="2"
        borderLeftRadius="6"
        borderRight="0"
        minWidth="110px"
        fontSize="lg"
        backgroundColor="gray.600"
        borderColor="gray.600"
        color="white"
      >
        {`Filter by name:`}
      </InputLeftAddon>

      <Input
        type="text"
        display="flex"
        width="100%"
        minWidth="100px"
        borderRadius="6"
        borderColor="gray.100"
        borderLeft="0"
        fontSize="lg"
        onChange={onChange}
      />
    </InputGroup>
  );
});
