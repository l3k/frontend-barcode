import React from 'react';
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mt-10 flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mb-4 text-8xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">Página não encontrada</p>
        <button
          onClick={() => navigate('/')}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        >
          Voltar
        </button>
      </div>
    </div>
  )
}

export default NotFound