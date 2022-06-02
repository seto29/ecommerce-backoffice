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
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
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
                <CModalTitle>Pengeluaran Baru</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Kategori</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <Select
                                    options={props.categories}
                                    placeholder="Pilih Kategori"
                                    onChange={(e) => props.setCategoryID(e.target.value)}
                                />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Tanggal</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="date" value={props.date3} onChange={(e) => props.setDate3(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Keterangan</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Nominal</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                    <CInputGroupPrepend>
                                        <CInputGroupText>Rp</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput id="appendedPrependedInput" size="12" type="number" value={props.nominal} onChange={(e) => props.setNominal(e.target.value)} />
                                    <CInputGroupAppend>
                                        <CInputGroupText>.00</CInputGroupText>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setLarge()}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default AddModal
