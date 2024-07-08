import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { redirect } from 'react-router-dom'

interface User {
  name: string
  email: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContext {
  isAuthenticated: boolean
  token: string
  user: User
  signIn(email: string, passowrd: string): void
  logout(): void
}

const apiUrl = import.meta.env.VITE_API_URL

const AuthContext = createContext({} as IAuthContext)

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({} as User)

  async function signIn(email: string, password: string) {
    try {
      console.log('--- apiUrl ---', apiUrl)
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      })

      localStorage.setItem('user', JSON.stringify(response.data))

      const { access_token, user } = response.data

      setUser(user)
      setToken(access_token)
      setIsAuthenticated(true)
    } catch (error) {
      toast.error("E-mail e/ou senha inválidos");
      console.log(error)
    }
  }

  useEffect(() => {
    const result = localStorage.getItem('user')

    if (result) {
      const dataParsed = JSON.parse(result)


      axios.get(`${apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${dataParsed.access_token}`
        }
      }).then(() => {
        setUser(dataParsed.user)
        setToken(dataParsed.access_token)
        setIsAuthenticated(true)
      })

    }
  }, [])

  async function logout() {
    localStorage.removeItem('color-theme')
    localStorage.removeItem('user')
    setToken('')
    setIsAuthenticated(false)
    setUser({} as User)
    redirect('/')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        signIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
