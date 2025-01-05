import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { InitialFormValuesProvider } from './contexts/InitialValueContext'
import { StepsProvider } from './contexts/StepsContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
// import { Home } from './pages/Home/Home'
// import { Filed } from './pages/EndProces/FIled'


const root = createRoot(document.getElementById('root'))



root.render(
  <ChakraProvider value={defaultSystem}>
    <InitialFormValuesProvider>
      <AuthProvider>

        <StepsProvider>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true, }}
          />
        </StepsProvider>
      </AuthProvider>
    </InitialFormValuesProvider>
  </ChakraProvider>
)