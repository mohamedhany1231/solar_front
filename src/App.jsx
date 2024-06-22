import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Panel from "./pages/Panel";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import { useDarkMode } from "./context/DarkModeContext";
import Warnings from "./pages/Warnings";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import Profile from "./ui/Profile";
import Settings from "./pages/Settings";
import Panels from "./pages/Panels";
import MangeAccess from "./pages/MangeAccess";
import Overview from "./pages/Overview";
import ErrorFallback from "./ui/ErrorFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import AllPanels from "./pages/AllPanels";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    element: (
      <div>
        <AppLayout />
      </div>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "panels", element: <Panels /> },
      { path: "admin-panels", element: <AllPanels /> },
      { path: "panel/:id/:year?/:month?/:day?", element: <Panel /> },
      { path: "analytics/:id/:year?/:month?/:day?", element: <Analytics /> },
      {
        path: "mange-access/:id/:year?/:month?/:day?",
        element: <MangeAccess />,
      },
      { path: "warnings", element: <Warnings /> },
      { path: "add-user", element: <AddUser /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "overview", element: <Overview /> },
    ],
  },
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
]);
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
