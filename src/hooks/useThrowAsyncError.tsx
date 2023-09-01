import { useState } from 'react';

export const useThrowAsyncError = () => {
  const [, setState] = useState();

  return (error: Error) => {
    console.log('>>> useThrowAsyncError', error);
    setState(() => {
      throw error;
    });
  };
};
