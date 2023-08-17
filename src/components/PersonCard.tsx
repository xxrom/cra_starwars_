import React, { memo } from 'react';
import { Box, Button, Skeleton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PersonType } from '../hooks/useStore/peopleSlice';
import { useLoadingIsLoading } from '../hooks';

export type PersonCardType = PersonType;
export type InfoType = { title?: string; text: string | number };

const Info = memo(({ title, text }: InfoType) => (
  <Box display="flex">
    {typeof title === 'string' && <Text mr="1">{`${title}:`}</Text>}

    <Text as="b" isTruncated>
      {text}
    </Text>
  </Box>
));

export const PersonCard = memo(({ id, name, height, mass }: PersonCardType) => {
  const isLoading = useLoadingIsLoading();

  if (isLoading) {
    return (
      <Skeleton
        isLoaded={!isLoading}
        noOfLines={1}
        height="149px"
        startColor="purple.500"
        endColor="gray.400"
        borderRadius="6"
        data-testid="PersonCard-Skeleton"
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
      data-testid="PersonCard-Box"
    >
      <Box>
        <Info text={name} />
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
