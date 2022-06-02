import React, { useState } from 'react'
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
    function handleCloseModal(e) {
        if (e.type === 'click') {
            props.setName('')
            props.setPrice(0)
            props.setShowAddModal(false)
        }
    }
    return (
        <>
            <CModal
                show={props.showAddModal}
                onClose={() => props.setShowAddModal(false)}
                size="lg"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Hadiah Ulang Tahun</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel>Minimal Transaksi</CLabel>
                                    <CInput type="number" value={props.name} onChange={(e) => props.setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel>Hadiah</CLabel>
                                    <CInput type="number" value={props.price} onChange={(e) => props.setPrice(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={(e) => handleCloseModal(e)}>Batal</CButton>{' '}
                    <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
