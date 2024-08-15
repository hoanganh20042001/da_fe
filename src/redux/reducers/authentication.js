// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      console.log(action)
      state.userData = action.payload
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      // localStorage.setItem('userData', JSON.stringify(action.payload))
      // localStorage.setItem('email', action.payload.email)
      // localStorage.setItem('roleid', action.payload.roleid)
      localStorage.setItem(config.storageTokenKeyName, action.payload.data.access_token)
      // const dispatch = useDispatch()
      // const dataUser = useSelector((state) => {
      //   return state.profile.dataUser
      // })
      
      // useEffect(() => {
      //   console.log(2)
      //   dispatch(getMe())
      // }, [dispatch])
      // console.log(dataUser)
      console.log(action.payload.data.access_token)
      console.log(action.payload.data.role)
      localStorage.setItem('full_name', action.payload.data.full_name)
      // localStorage.setItem('email', dataUser.data.eamil)
      localStorage.setItem('role', action.payload.data.role)
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.data.refreshToken))
    },
    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      // localStorage.removeItem('user')
      // localStorage.removeItem('email')
      // localStorage.removeItem('role')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
