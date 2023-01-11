import { ToastPosition } from '@chakra-ui/react';

export const successDefaultToast = {
  title: 'Mudanças salvas com sucesso!',
  description: 'Todas as suas mudanças, foram salvas, com sucesso!',
  duration: 5000,
  position: 'top-right' as ToastPosition,
  isClosable: true,
};

export const errorDefaultToast = {
  title: 'Um erro aconteceu',
  description:
    'Ops! Parece que ocorreu um erro, durante a sua requisição, tente novamente ou entre com contato com o suporte.',
  duration: 5000,
  position: 'top-right' as ToastPosition,
  isClosable: true,
};
