import { useState } from 'react';

export const useThrowAsyncError = () => {
  const [, setState] = useState();

  return (error: Error) => {
    setState(() => {
      throw error;
    });
  };
};
