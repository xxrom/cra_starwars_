import React, { memo } from 'react';
import { Box, Button, Skeleton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore/useStore';
import { PersonType } from '../hooks/useStore/peopleSlice';

export type PersonCardType = PersonType;
export type InfoType = { title: string; text: string | number };

const Info = memo(({ title, text }: InfoType) => (
  <Box display="flex">
    <Text>{`${title}:`}</Text>
    <Text ml="1" as="b" isTruncated>
      {text}
    </Text>
  </Box>
));

export const PersonCard = memo(({ id, name, height, mass }: PersonCardType) => {
  const isLoading = useStore((store) => store.isLoading);

  if (isLoading) {
    return (
      <Skeleton
        isLoaded={!isLoading}
        noOfLines={1}
        height="149px"
        startColor="purple.500"
        endColor="gray.400"
        borderRadius="6"
      />
    );
  }

  return (
    <Box
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="6"
      fontSize="lg"
      boxShadow="lg"
      backgroundColor="white"
    >
      <Box>
        <Info title="Name" text={name} />
        <Info title="Height" text={height} />
        <Info title="Mass" text={mass} />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Link to={`/person/${id}`}>
          <Button mt="1" size="sm">
            Edit
          </Button>
        </Link>
      </Box>
    </Box>
  );
});
