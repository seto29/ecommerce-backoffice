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
function AddModal(props) {
        
    return (
        <>
        <CModal
            show={props.large}
            onClose={() => props.setLarge(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Karyawan Baru</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Nama</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" placeholder="Denden" value={props.name} onChange={(e)=> props.setName(e.target.value)} />
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
                                    onChange={(e) => props.setRoleID(e.target.value)}
                                />
                            </CCol>
                        </CFormGroup> */}
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Username</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" value={props.email} onChange={(e)=> props.setEmail(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Password</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" value={props.password} onChange={(e)=> props.setPassword(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                    </CForm>

                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setLarge(false)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default AddModal
