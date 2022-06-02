import React, { useEffect, useState, forwardRef } from 'react'
import Cookies from 'js-cookie';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CCardFooter,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
} from '@coreui/react'
import Toaster from '../components/Toaster'
import {fUpdate, getByID} from '../../services/Employees'

function Settings({ }) {
  const [toastM, setToastM] = useState("")
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const[idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("")
  const [passwordUpdate, setPasswordUpdate] = useState("")
  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  useEffect(() => {
    setNameUpdate(JSON.parse(Cookies.get('user')).name)
    setEmailUpdate(JSON.parse(Cookies.get('user')).email)
  }, [])

  async function update(){
    const response = await fUpdate(JSON.parse(Cookies.get('user')).id, nameUpdate, emailUpdate, JSON.parse(Cookies.get('user')).role_id, passwordUpdate)
    if (response['success'] === 1) {
      const response1 = await getByID(JSON.parse(Cookies.get('user')).id)
      if (response1['success'] === 1) {
        Cookies.set('user', response1['msg'][0]);
        Cookies.set('role', response1['msg'][0]['role_id']);
       }
      setToastM("update")
    }else{
      setToastM("failed")
    }
    addToast()
  }

    return (
        <>
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                          <CRow className="align-items-center">
                            <CCol col="10"  className="mb-3 mb-xl-0">
                              <h4>Pengaturan Akun</h4>
                            </CCol>
                          </CRow>
                        </CCardHeader>
                        <CCardBody>
                          <CCol xs="20" md="10">
                            <CForm action="" method="post" className="form-horizontal">
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="name">Nama</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="hidden" value={idUpdate}/>
                                            <CInput type="text" placeholder="Denden" value={nameUpdate} onChange={(e)=> setNameUpdate(e.target.value)} />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="name">Email</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="email" value={emailUpdate} onChange={(e)=> setEmailUpdate(e.target.value)} />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="name">Password</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="password" value={passwordUpdate} onChange={(e)=> setPasswordUpdate(e.target.value)} />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel>*Jangan isi password jika tidak ingin mengubah password</CLabel>
                                        </CCol>
                                    </CFormGroup>
                                </CForm>
                            </CCol>
                        </CCardBody>
                        <CCardFooter>
                          <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '}
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default Settings
