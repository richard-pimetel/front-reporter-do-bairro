import { useNavigate } from 'react-router-dom'

type TaskSearch = {
  search: string
}

function useGoToHomePage(): () => void {
  const navigate = useNavigate()
  return () => {
    navigate('/')
  }
}

function useGoToLoginPage(): () => void {
  const navigate = useNavigate()
  return () => {
    navigate('/login')
  }
}

function useGoToSignUpPage(): () => void {
  const navigate = useNavigate()
  return () => {
    navigate('/signup')
  }
}

function useGoToProfilePage(): (name: string) => void {
  const navigate = useNavigate()
  return (name: string) => {
    navigate(`/${name}`)
  }
}

function useGoToSearchPage(): (task: TaskSearch) => void {
  const navigate = useNavigate()
  return (task: TaskSearch) => {
    const query = new URLSearchParams()
    query.set('s', task.search)
    navigate(`/search?${query.toString()}`)
  }
}

export {
  useGoToHomePage,
  useGoToLoginPage,
  useGoToSignUpPage,
  useGoToSearchPage,
  useGoToProfilePage,
}
