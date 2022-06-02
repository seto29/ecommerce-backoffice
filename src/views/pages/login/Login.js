import React, { useEffect, useState, forwardRef } from 'react'
import Cookies from 'js-cookie'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CToaster,
  CToast,
  CToastBody,
  CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from '../../../axios';

const Login = (props) => {
  const {history} = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(5000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)

  useEffect(() => {
  {
    Cookies.get('token')?
    history.push('/dashboard')
    :
    history.push('/login')
  }  
  }, [])

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()

  async function login() {
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    const response = await axios({
      method: 'post',
      url: '/auth/EmployeeLogin.php',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(response);
    if(response['data']['success'] === 1) {
      Cookies.set('token', response['data']['token'])
      history.push('/dashboard');
    }else{
      addToast();
    }
    return response;
  }

  return (
    <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sebagai Admin</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => setUsername(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password"  onChange={(e) => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" autofocus="true" className="px-4" onClick={() => login()} >Login</CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    {Object.keys(toasters).map((toasterKey) => (
      <CToaster
        position={toasterKey}
        key={'toaster' + toasterKey}
      >
        {
          toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={'toast' + key}
                show={true}
                autohide={toast.autohide}
                fade={toast.fade}
              >
                <CToastHeader closeButton={toast.closeButton} style={{ backgroundColor: 'red', color: 'black' }} >
                  Terjadi Kesalahan
                      </CToastHeader>
                <CToastBody>
                  {`Email atau password salah`}
                </CToastBody>
              </CToast>
            )
          })
        }
      </CToaster>
    ))}
    </>
  )
}

export default Login
