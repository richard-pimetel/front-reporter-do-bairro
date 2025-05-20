import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import './LoginPage.css'; // Importação do CSS separado

type FormData = {
  name: string;
  email: string;
  password: string;
  bio: string;
};

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setAuthSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div 
        className="overlay"
        onClick={() => setAuthSuccess(false)}
      ></div>
      
      <div className="login-box">
        {/* Header */}
        <div className="header">
          <h2>
            {authSuccess ? 'Bem-vindo!' : (isLogin ? 'Login de Repórter' : 'Cadastro de Repórter')}
          </h2>
          <button 
            onClick={() => setAuthSuccess(false)}
            className="close-button"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        {authSuccess ? (
          <div className="auth-success">
            <div className="success-message">
              <CheckCircle size={48} className="icon" />
              <h3>
                {isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!'}
              </h3>
              <p>
                {isLogin 
                  ? `Bem-vindo de volta, ${formData.email.split('@')[0]}!` 
                  : `Bem-vindo, ${formData.name}! Sua conta foi criada.`}
              </p>
            </div>
            <button
              onClick={() => setAuthSuccess(false)}
              className="continue-button"
            >
              Continuar
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="form">
              {!isLogin && (
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </button>

              <div className="switch-mode">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="switch-button"
                >
                  {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="footer">
              <p>
                Ao se cadastrar, você concorda com nossos{' '}
                <a href="#" className="footer-link">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="footer-link">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
