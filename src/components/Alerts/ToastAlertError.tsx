import React from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProps {
  messageTitle?: string;
  messageText?: string;
  toastStatus: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

function ToastAlertError({
  messageTitle,
  messageText,
  toastStatus,
}: ToastProps) {
  const toast = useToast();

  return (
    <>
      {toast({
        title: messageTitle,
        description: messageText,
        status: toastStatus,
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })}
    </>
  );
}

export default ToastAlertError;
