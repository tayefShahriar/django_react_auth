import { Typography, TextField, Button, Box, Alert } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChangeUserPasswordMutation } from "../../services/userAuthApi"
import { getToken } from "../../services/LocalStorageService"
import { useSelector } from "react-redux"

const ChangePassword = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [changepassword] = useChangeUserPasswordMutation()
  const {access_token} = getToken()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    const res = await changepassword({actualData, access_token})
    if(res.error){
      setServerMsg({})
      setServerError(res.error.data)
    }
    if(res.data){
      setServerError({})
      setServerMsg(res.data)
      document.getElementById("password-change-form").reset()
    }
  }
  const myData = useSelector(state => state.user)
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4}}>
          <h1>Reset Password</h1>
          <Box component='form' noValidate sx={{ mt: 1 }} id='password-change-form' onSubmit={handleSubmit}>
            <TextField margin="normal" required fullWidth id='password' name='password' label='New Password' type="password" />
            {server_error.password?<Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password[0]}</Typography>:""}
            <TextField margin="normal" required fullWidth id='password2' name='password2' label='Confirm New Password' type="password" />
            {server_error.password2?<Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password2[0]}</Typography>:""}
            <Box textAlign='center'>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}>Update</Button>
            </Box>
            {server_error.non_field_errors?<Alert severity="error">{server_error.non_field_errors[0]}</Alert>:""}
            {server_msg.msg?<Alert severity="success">{server_msg.msg}</Alert>:""}
          </Box>
      </Box>
    </>
  )
}

export default ChangePassword