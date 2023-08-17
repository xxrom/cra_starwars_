import React, { memo, useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { mockTimeout } from '../helper';

export const About = memo(() => {
  const initRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [md, setMd] = useState('-/-');

  useEffect(() => {
    // Load only once
    if (typeof initRef?.current !== 'undefined' && initRef.current) {
      return;
    }

    initRef.current = true;
    setIsLoading(true);

    fetch(
      'https://raw.githubusercontent.com/xxrom/cra_starwars_/master/README.md'
    )
      .then((response) => response.text())
      .then(async (text) => {
        await mockTimeout(2000);
        return text;
      })
      .then((text) => {
        setMd(text);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box boxShadow="lg" padding="8" display="flex" justifyContent="center">
        <CircularProgress isIndeterminate color="gray.600" />
      </Box>
    );
  }
  return (
    <Box boxShadow="lg" padding="6">
      <Text mb="6">{`Rendered from 'Readme.md' file.`}</Text>

      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p style={{ margin: '1em 1em 1em 0' }}>{children}</p>
          ),
          a: ({ children, href }) => (
            <a href={href} style={{ color: 'blue' }}>
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <Text fontWeight="bold" py="2" fontSize="xl" color="gray.800">
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <Box pl="3" pb="3">
              {children}
            </Box>
          ),
        }}
      >
        {md}
      </ReactMarkdown>
    </Box>
  );
});
