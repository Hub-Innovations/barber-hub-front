import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { theme } from '../styles/theme';
import ToastALert from 'components/Alerts/ToastAlert';

export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = React.useState(() => new QueryClient());
  const [showUnauthorizedToast, setShowUnauthorizedToast] =
    React.useState(false);

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
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        {showUnauthorizedToast && (
          <ToastALert
            toastStatus="error"
            messageText="Você não possui autorização para essa requisição"
            messageTitle="Não autorizado"
          />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
