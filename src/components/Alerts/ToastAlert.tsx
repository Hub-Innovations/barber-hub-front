import React from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProps {
  messageTitle?: string;
  messageText?: string;
  toastStatus: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
  duration?: number;
}

function ToastALert({
  messageTitle,
  messageText,
  toastStatus,
  duration,
}: ToastProps) {
  const toast = useToast();

  // mensagem padrão de erro para toda a plataforma
  if (
    toastStatus === 'error' &&
    messageText === 'default' &&
    messageTitle === 'default'
  ) {
    messageText =
      'Ops! Parece que ocorreu um erro, durante a sua requisição, tente novamente ou entre com contato com o suporte.';
    messageTitle = 'Um erro aconteceu';
  } else if (
    toastStatus === 'success' &&
    messageText === 'default' &&
    messageTitle === 'default'
  ) {
    messageText = 'Todas as suas mudanças, foram salvas, com sucesso!';
    messageTitle = 'Mudanças salvas com sucesso!';
  }

  return (
    <>
      {toast({
        title: messageTitle,
        description: messageText,
        status: toastStatus,
        duration: duration ? duration : 4000,
        position: 'top-right',
        isClosable: true,
      })}
    </>
  );
}

export default ToastALert;
