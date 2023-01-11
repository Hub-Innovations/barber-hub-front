import type { AppProps } from 'next/app';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { theme } from '../styles/theme';
import 'styles/BigCalendar/style.css';
import 'styles/DatePicker/style.css';

export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = React.useState(() => new QueryClient());
  const [showUnauthorizedToast, setShowUnauthorizedToast] =
    React.useState(false);
  const toast = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // lógica para mostrar o toast quando ter 401 na requisição
  React.useEffect(() => {
    const unauthorized = localStorage.getItem('unauthorized');

    if (unauthorized === 'true') {
      setShowUnauthorizedToast(true);
      localStorage.removeItem('unauthorized');

      setTimeout(() => {
        setShowUnauthorizedToast(false);
      }, 100);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        {showUnauthorizedToast &&
          toast({
            status: 'error',
            title: 'Não autorizado',
            description: 'Você não possui autorização para essa requisição',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          })}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
