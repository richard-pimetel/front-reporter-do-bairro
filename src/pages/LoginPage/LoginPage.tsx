import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import loginUser from '../../services/API/user/login'
import postUsuario from '../../services/API/user/postUsuario'
import './LoginPage.css'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    data_nascimento: '',
    bio: ''
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
       
      const response = await loginUser({ email: formData.email, senha: formData.password })

      if (response?.status && response.usuario) {
        login(response.usuario)
        setAuthSuccess(true)
        setTimeout(() => navigate('/'), 1500)
      } else {
        alert("Email ou senha incorretos.")
      }

    } else {
      console.log("Tentando cadastrar...")
      if (formData.password !== formData.confirmPassword) {
        alert("As senhas não coincidem.")
        return
      }

      const response = await postUsuario({
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
        data_nascimento: formData.data_nascimento,
        biografia: formData.bio
      })

      if (response?.status && response.usuario) {
        login(response.usuario)
        setAuthSuccess(true)
        setTimeout(() => navigate('/'), 1500)
      } else {
        alert("Erro ao cadastrar. Verifique os dados e tente novamente.")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="login-container">
      <div className="overlay" onClick={() => setAuthSuccess(false)}></div>

      <div className="login-box">
        <div className="header">
          <h2>{authSuccess ? 'Bem-vindo!' : (isLogin ? 'Login de Repórter' : 'Cadastro de Repórter')}</h2>
          <button onClick={() => setAuthSuccess(false)} className="close-button">
            <X size={24} />
          </button>
        </div>

        {authSuccess ? (
          <div className="auth-success">
            <div className="success-message">
              <CheckCircle size={48} className="icon" />
              <h3>Login realizado com sucesso!</h3>
              <p>Bem-vindo de volta, {formData.email.split('@')[0]}!</p>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="form">
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Nome completo</label>
                    <div className="input-wrapper">
                      <User size={20} className="icon" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="data_nascimento">Data de nascimento</label>
                    <div className="input-wrapper">
                      <input
                        type="date"
                        id="data_nascimento"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <div className="input-wrapper">
                  <Mail size={20} className="icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <Lock size={20} className="icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <div className="input-wrapper">
                    <Lock size={20} className="icon" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Repita sua senha"
                      required
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="submit-button">
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </button>

              <div className="switch-mode">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="switch-button">
                  {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
                </button>
              </div>
            </form>

            <div className="footer">
              <p>
                Ao se cadastrar, você concorda com nossos{' '}
                <a href="#" className="footer-link">Termos de Uso</a> e{' '}
                <a href="#" className="footer-link">Política de Privacidade</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginPage
