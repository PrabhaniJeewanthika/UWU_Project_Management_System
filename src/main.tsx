import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, createBrowserRouter } from "react-router"
import App from "./App"
import InternalLayout from "./components/layouts/InternalLayout"
import RouteConfigs from "./app-routes"

const router = createBrowserRouter([
  { path: "/app", Component: InternalLayout },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
