import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Panel from "./features/Panel/Panel";
const router = createBrowserRouter([
  {
    element: (
      <div>
        <AppLayout />
      </div>
    ),
    errorElement: <div>%APP_ERROR_ELEMENT</div>,
    children: [
      {
        path: "/",
        element: <div>%APP_CONTENT</div>,
      },
      { path: "login", element: <div>%Login</div> },
      { path: "home", element: <div>%home</div> },
      { path: "panel", element: <Panel /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
