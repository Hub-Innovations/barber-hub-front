import React from 'react';
import {
  Button,
  ButtonProps as ChackraButtonProps,
  Spinner,
} from '@chakra-ui/react';

interface ButtonProps extends ChackraButtonProps {
  text: string;
  loading: boolean;
}

function LoginButton({ text, loading, ...rest }: ButtonProps) {
  return (
    <Button
      disabled={loading}
      backgroundColor="#FFDD00"
      width="100%"
      color="#76520E"
      fontFamily="Roboto, sans-serif"
      fontWeight="400"
      textAlign="center"
      padding="16px"
      borderRadius="4px"
      border="1px solid"
      borderColor="#76520E"
      fontSize="18px"
      transition="0.2s"
      _hover={{
        backgroundColor: 'currentTarget',
        boxShadow: '0 0 0 2px #76520E',
      }}
      {...rest}
    >
      {loading ? <Spinner color="#181b23" /> : text}
    </Button>
  );
}

export default LoginButton;
