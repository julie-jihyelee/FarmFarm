import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from './PageTitle';
import axios from 'axios';
import DaumPost from './DaumPost';
import { Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        FarmFarm
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography : {
    fontFamily : [
      'SUIT-regular', 'SUIT-Bold'
    ]
  }
});

export default function Myinfo() {

  const [form, setForm] = useState({ user_id: "", user_password: "" });
  useEffect(()=>{
    setForm({...form, user_id : sessionStorage.getItem('user_id')})
  },[])
 
  const [message, setMessage] = useState(''); //DB 응답 결과

  const nav = useNavigate();

  const loginUrl = 'http://192.168.70.237:5022/login';
  const changeUrl = 'http://192.168.70.237:5022/change';

  const infoSending = async () => {
    try {
     
      console.log('유저정보',form)
      const response = await axios.post(loginUrl, { form });
      const responseData = response.data;
      console.log('응답 데이터:', responseData); 
      if (!responseData ){
        alert('회원정보가 일치하지 않습니다. 회원 정보를 다시 확인해주세요')
      }else{
        try{
          const res = await axios.post(changeUrl, {user_id : form.user_id})
          const info = res.data[0]
          console.log('보낼유저정보', info)
          nav('/mypage',{state :{info}})
        } catch(error){
          console.error('통신 실패:', error);
          alert('서버에 문제가 발생하였습니다. 다시 한 번 시도해주세요!')
        } 
       
      }
      
      // nav('/mypage', {state:{responseData}})
      
      
    } catch (error) {
      console.error('통신 실패:', error);
      alert('서버에 문제가 발생하였습니다. 다시 한 번 시도해주세요!')
    }
  };



  return (
    <>
    <PageTitle data={'마이페이지'} num={3}/>
  <ThemeProvider theme={defaultTheme}>
    <Typography sx={{ marginTop : '100px', marginBottom : '-50px', textAlign : 'center'}}> 회원 정보 수정을 위해 비밀번호를 한 번 더 입력해주세요</Typography>
      <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
      <Box component="form"  noValidate sx={{ mt: 1 }}>
            {/* <TextField
              color = "success"
              margin="normal"
              required
              fullWidth
              id="user_id"
              value={form.user_id}
              label="아이디"
              name="id"
              autoComplete="email"
              autoFocus
              onChange={(e)=> {setForm({...form, user_id : e.target.value})}}
            /> */}
            <TextField
              color = "success"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={form.user_password}
              autoComplete="current-password"
              onChange={(e)=> {setForm({...form, user_password : e.target.value})}}
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    "&:checked": {
                      background: "red"
                    }
                  }} />
                }
              label="아이디 저장하기"
            /> */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              component={Link}
              to="/"
              type="submit"
              sx={{
                '&:hover': {
                  background: "#00C897"
                },
                background: "#05AC7B",
                borderRadius: "20px",
                marginTop : '40px',
                width: "180px"
              }}
              onClick={infoSending}
            >
              로그인
            </Button>
            </Box>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Box xs={{
          height : '300px'
        }}></Box>
      </Container>
      </ThemeProvider>
   
    </>
  );
}
