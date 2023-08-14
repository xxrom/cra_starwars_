import React, { memo } from 'react';
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

export const PersonInput = memo(
  ({
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
        borderRight="0"
        minWidth="110px"
        fontSize="lg"
        backgroundColor="gray.600"
        borderColor="gray.600"
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
        borderRadius="6"
        borderColor="gray.100"
        borderLeft="0"
        fontSize="lg"
        placeholder={String(placeholder)}
        defaultValue={value}
        onChange={onChange}
        backgroundColor={isDisabled ? 'gray.400' : 'gray.100'}
      />
    </InputGroup>
  )
);
