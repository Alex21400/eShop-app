import { useSelector } from 'react-redux'

const AdminOnlyRoute = ({children}) => {
  const { email } = useSelector(state => state.auth)

  if(email === 'krimiusma0@gmail.com' || email === 'saki.94@hotmail.com'){
    return children
  }else{
    return null
  }
}

export default AdminOnlyRoute