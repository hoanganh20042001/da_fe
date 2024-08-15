// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// ** Menu Items Array
import navigation1 from '@src/navigation/vertical1'
import navigation2 from '@src/navigation/vertical2'
import navigation3 from '@src/navigation/vertical3'
import { getMe } from '@store/action/profile'

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])
  
  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  // const dispatch = useDispatch()
  // const dataUser = useSelector((state) => {
  //   return state.profile.dataUser
  // })
  
  // useEffect(() => {

  //   dispatch(getMe())
  // }, [dispatch])
  const role = localStorage.getItem('role')
  // console.log(role)

  if (role === 'admin') {
    return (
      <Layout menuData={navigation1} {...props}>
        <Outlet />
      </Layout>
    )
  } else if (role === 'doctor') {
    return (
      <Layout menuData={navigation2} {...props}>
        <Outlet />
      </Layout>
    )
  } else if (role === 'staff') {
    return (
      <Layout menuData={navigation3} {...props}>
        <Outlet />
      </Layout>
    )
  }

}

export default VerticalLayout
