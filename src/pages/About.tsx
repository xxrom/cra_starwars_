import React, { memo, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

export const About = memo(() => {
  const [md, setMd] = useState('');

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/xxrom/cra_starwars_/master/README.md'
    )
      .then((response) => response.text())
      .then((text) => setMd(text));
  }, []);

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
