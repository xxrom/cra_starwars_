import React from 'react';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export type PersonInputType = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder: string | number;
  value: string | number;
  type: HTMLInputTypeAttribute;
  isDisabled?: boolean;
};

export const PersonInput = ({
  onChange,
  placeholder,
  value,
  label,
  type,
  isDisabled = false,
}: PersonInputType) => (
  <InputGroup>
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
