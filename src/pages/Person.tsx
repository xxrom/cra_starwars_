import React, { ChangeEventHandler, memo, useCallback, useMemo } from 'react';
import { List } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { PersonInput, PersonInputType } from '../components/PersonInput';
import { useStore, usePeopleActions } from '../hooks';
import { PersonType } from '../hooks/useStore/peopleSlice';

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
  const peopleMap = useStore((store) => store.peopleMap);
  const { updatePerson } = usePeopleActions();

  const personData = useMemo(
    () => peopleMap[personId] ?? {},
    [peopleMap, personId]
  );

  const onChange = useCallback(
    (key: string): ChangeEventHandler<HTMLInputElement> =>
      (event) => {
        const value = event.target.value;

        updatePerson({
          ...personData,
          [key]: value,
        });
      },
    [personData, updatePerson]
  );

  return (
    <List
      p="16px"
      mt="16px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow="lg"
      borderRadius="8"
      spacing="16px"
      overflow="scroll"
    >
      {personKeys.map(({ key, ...rest }) => (
        <PersonInput
          key={key}
          label={key}
          onChange={onChange(key)}
          placeholder={personData[key]}
          value={personData[key]}
          {...rest}
        />
      ))}
    </List>
  );
});
