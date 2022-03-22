import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@utils/QueryClient';

const HomePage = React.lazy(() => import('@containers/Modules/HomePage'));

export default function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <React.Suspense
            fallback={
              <div className="loading">
                <p>Page is Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
