import React from 'react'
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
                    <CModalTitle>Supplier Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="PT. Rahmat Tuhan Lestari" value={props.name} onChange={(e)=> props.setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alamat</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.address} onChange={(e)=> props.setAddress(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. Telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="phone" value={props.phone} onChange={(e)=> props.setPhone(e.target.value)} />
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
