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
function UpdateModal(props) {

    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Toko</CModalTitle>
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
                                    <CInput type="text" placeholder="PT. Rahmat Tuhan Lestari" value={props.nameUpdate} onChange={(e)=> props.setNameUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alamat</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.addressUpdate} onChange={(e)=> props.setAddressUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. Telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="phone" value={props.phoneUpdate} onChange={(e)=> props.setPhoneUpdate(e.target.value)} />
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
