import React from 'react'
import Select from 'react-select';
import {
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
} from '@coreui/react'
function UpdateModal(props) {

    return (
        <>
        <CModal
            show={props.edit}
            onClose={() => props.setEdit(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Karyawan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Nama</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="hidden" value={props.idUpdate}/>
                                <CInput type="text" placeholder="Denden" value={props.nameUpdate} onChange={(e)=> props.setNameUpdate(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        {/* <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Jabatan</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <Select
                                    options={props.roles}
                                    placeholder="Pilih jabatan"
                                    value={{ label: props.roleNameUpdate, value: props.roleIDUpdate }}
                                    onChange={(e) => props.updateRID(e)}
                                />
                            </CCol>
                        </CFormGroup> */}
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Username</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" value={props.emailUpdate} onChange={(e)=> props.setEmailUpdate(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Password</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" value={props.passwordUpdate} onChange={(e)=> props.setPasswordUpdate(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="12">
                                <CLabel>*Jangan isi password jika tidak ingin mengubah password</CLabel>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
              <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
