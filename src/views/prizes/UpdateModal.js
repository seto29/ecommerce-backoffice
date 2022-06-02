/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import { reCreate } from '../../services/Token'
import { fUpload } from '../../services/FileManager'
import {
    CCol,
    CRow,
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
    CInputFile,
    CImg,
    CFormText
} from '@coreui/react'

function UpdateModal(props) {
    console.log(props.idUpdate)
    const [files, setFiles] = useState([])
    const [files1, setFiles1] = useState()



    async function handleUpdate() {
        props.update("")
        props.setEdit(false)
    }

    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Hadiah Ulang Tahun</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >Minimal Transaksi</CLabel>
                                    <CInput type="hidden" value={props.idUpdate} />
                                    <CInput type="number" value={props.nameUpdate} onChange={(e) => props.setNameUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >Hadiah</CLabel>
                                    <CInput id="price" type="number" value={props.priceUpdate} onChange={(e) => props.setPriceUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>

                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
                    <CButton color="primary" onClick={() => handleUpdate()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
