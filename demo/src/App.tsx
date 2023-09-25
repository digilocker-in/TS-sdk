import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './components/Login';
import DocumentsPage from './components/Documents';
import { DigilockerProvider } from './context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/documents',
    element: <DocumentsPage />,
  },
]);

const App = () => {
  return (
    <DigilockerProvider>
      <RouterProvider router={router} />
    </DigilockerProvider>
  );
};

export default App;
