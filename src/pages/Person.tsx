import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

export const Person = memo(() => {
  const { personId } = useParams();

  return (
    <>
      <div>{`Person : ${personId}`}</div>
    </>
  );
});
