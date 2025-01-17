import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, FormControlLabel, Grid, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import User from "../../models/User";
import { cadastroUsuario } from "../../services/Service";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import './CadastroUsuario.css';
import { toast } from "react-toastify";

interface State {
  password: string;
  showPassword: boolean;
}


function Cadastrar() {

  let navigate = useNavigate()
  const [confirmarSenha, setConfirmarSenha] = useState<String>('')
  const [userCadastrar, setUserCadastrar] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(event.target.value)
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>){
    setUserCadastrar({
      ...userCadastrar,
      [event.target.name]: event.target.value
    })
  }

  async function conectar(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault();
    if(confirmarSenha === userCadastrar.senha && userCadastrar.senha.length >= 8){
      try {
        await cadastroUsuario('usuarios/cadastrar', userCadastrar, setUserResult);
        toast.success('Usuário criado com sucesso!!! Efetue o Login.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined, 
        } ); 
      } catch (error) {
        toast.error('Falha ao cadastrar o usuário. Por favor, confira os campos', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined, 
        } ); 
      }
    } else {
      toast.error('Senhas divergentes, ou menores que 8 caracteres. Por favor, verifique os campos.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined, 
      } ); 
    }
  }

  useEffect(() => {
    if(userResult.id !== 0){
      navigate('/login')
    }
  }, [userResult])
const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <>
      <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={6} style={{
        backgroundImage: ``,
        backgroundRepeat: 'no-repeat', width: '90vh', minHeight: '90vh', backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
    </Grid>

    <Grid item xs={6} alignItems="center" justifyContent="center">
          <Box padding={10}>
            <form onSubmit={conectar}>
              <Typography variant="h2">Cadastre-se</Typography>
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.nome}
                id="nome"
                name="nome"
                label='Digite seu Nome'
                variant="outlined"
                fullWidth
                margin="normal"/>
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.usuario}
                id="usuario"
                name="usuario"
                label="Usuário"
                variant="outlined"
                fullWidth
                margin="normal"
              />

<FormControl fullWidth margin='normal' variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                     <OutlinedInput
                      type={values.showPassword ? 'text' : 'password'}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.senha}
                id="senha"
                name="senha"
                label="Senha"
                endAdornment={
<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth margin='normal' variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirmar Senha</InputLabel>
                     <OutlinedInput
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                      value={confirmarSenha}
                id="confirmarSenha"
                name="confirmarSenha"
                label="Confirmar a Senha"
                endAdornment={
<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box className="botao">
                <Link to='/login' className='text-decorator-none'>
                  <Button variant='contained' color='secondary' className='btnCancelar'>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" variant="contained" color="primary">
                  Cadastrar
                </Button>
            </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Cadastrar;
             