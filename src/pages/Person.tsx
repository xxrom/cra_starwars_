import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from '@chakra-ui/react';
import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../hooks';
import type { PersonType } from '../hooks/useStore/useStore';

type PersonInputType = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder: string | number;
  value: string | number;
  type: HTMLInputTypeAttribute;
  isDisabled?: boolean;
};
const PersonInput = ({
  onChange,
  placeholder,
  value,
  label,
  type,
  isDisabled = false,
}: PersonInputType) => (
  <InputGroup mt="3">
    <InputLeftAddon
      p="2"
      borderLeftRadius="6"
      minWidth="150px"
      fontSize="lg"
      backgroundColor="gray.600"
      color="white"
    >
      {`${label}:`}
    </InputLeftAddon>

    <Input
      isDisabled={isDisabled}
      type={type}
      display="flex"
      width="100%"
      minWidth="100px"
      p="2"
      borderRadius="6"
      size="lg"
      placeholder={String(placeholder)}
      defaultValue={value}
      onChange={onChange}
      backgroundColor={isDisabled ? 'gray.400' : 'gray.100'}
    />
  </InputGroup>
);

const personKeys: Array<
  {
    key: keyof PersonType;
  } & Pick<PersonInputType, 'type' | 'isDisabled'>
> = [
  {
    key: 'id',
    type: 'text',
    isDisabled: true,
  },
  {
    key: 'name',
    type: 'text',
  },
  {
    key: 'height',
    type: 'number',
  },
  {
    key: 'mass',
    type: 'number',
  },
  {
    key: 'birth_year',
    type: 'text',
  },
  {
    key: 'eye_color',
    type: 'text',
  },
  {
    key: 'homeworld',
    type: 'url',
  },
];
export const Person = memo(() => {
  const { personId = '' } = useParams();
  const { peopleMap, updatePerson } = useStore();

  const person = useMemo(() => peopleMap[personId] ?? {}, []);

  const onChange = useCallback(
    (key: string): ChangeEventHandler<HTMLInputElement> =>
      (event) => {
        const value = event.target.value;

        updatePerson({
          ...person,
          [key]: value,
        });
      },
    [person, updatePerson]
  );

  return (
    <Box
      p="5"
      mt="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow="lg"
      borderRadius="8"
      bg="white"
    >
      {personKeys.map(({ key, ...rest }) => (
        <PersonInput
          key={key}
          label={key}
          onChange={onChange(key)}
          placeholder={person[key]}
          value={person[key]}
          {...rest}
        />
      ))}
    </Box>
  );
});
