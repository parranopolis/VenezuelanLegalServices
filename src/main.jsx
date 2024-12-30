import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { InitialFormValuesProvider } from './contexts/InitialValueContext'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { StepsContext, StepsProvider } from './contexts/StepsContext'
import { Filed } from './pages/EndProces/FIled'


const root = createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'filed',
    element: <Filed />
  }
],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_skipActionStatusRevalidation: true,
      v7_partialHydration: true,
    }
  },
)

root.render(
  <ChakraProvider value={defaultSystem}>
    <InitialFormValuesProvider>
      <StepsProvider>
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true, }}
        />
      </StepsProvider>
    </InitialFormValuesProvider>
  </ChakraProvider>
)