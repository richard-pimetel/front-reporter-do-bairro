// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react"

// Tipo do usuário (ajuste conforme sua estrutura real de dados)
type User = {
  id: string
  name: string
  email: string
  // adicione mais campos conforme necessário
}

// Tipo do contexto
type AuthContextType = {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoggedIn: boolean
}

// Cria o contexto com tipo genérico ou valor inicial nulo
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Tipo dos props do AuthProvider
type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
