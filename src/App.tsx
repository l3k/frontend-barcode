import React, { Suspense, lazy, ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/auth';
import LoadingOrError from './components/LoadingOrError';
import { Toaster } from 'react-hot-toast';

const SignIn = lazy(() => import('./pages/SignIn'))
const Home = lazy(() => import('./pages/Home'))
const Associates = lazy(() => import('./pages/Associates'))
const Products = lazy(() => import('./pages/Products'))
const Orders = lazy(() => import('./pages/Orders'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>
};

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Suspense fallback={<LoadingOrError />}>
          <Routes>
            <Route index path="/" element={<SignIn />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/associates" element={<ProtectedRoute><Associates /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
