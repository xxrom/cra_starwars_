import React, { memo } from 'react';
import { Box, Button, SkeletonText, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PersonType, useStore } from '../hooks/useStore/useStore';

export type PersonCardType = PersonType;
export type InfoType = { title: string; text: string | number };

const Info = ({ title, text }: InfoType) => (
  <Box display="flex">
    <Text>{`${title}:`}</Text>
    <Text ml="1" as="b" isTruncated>
      {text}
    </Text>
  </Box>
);

export const PersonCard = memo(({ id, name, height, mass }: PersonCardType) => {
  const { isLoading } = useStore();

  if (isLoading) {
    return (
      <SkeletonText
        isLoaded={!isLoading}
        noOfLines={1}
        skeletonHeight="130px"
        startColor="purple.500"
        endColor="orange.500"
        borderRadius="6"
      />
    );
  }

  return (
    <Box
      p="8px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="6"
      fontSize="lg"
      boxShadow="lg"
    >
      <Box>
        <Info title="Name" text={name} />
        <Info title="Height" text={height} />
        <Info title="Mass" text={mass} />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Link to={`/${id}`}>
          <Button mt="1" size="sm">
            Edit
          </Button>
        </Link>
      </Box>
    </Box>
  );
});
