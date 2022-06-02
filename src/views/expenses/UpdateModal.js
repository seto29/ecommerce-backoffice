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
function UpdateModal(props) {

    return (
        <>
        
        <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Pengeluaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="hidden" value={props.idUpdate} />
                                    <Select
                                        options={props.categories}
                                        placeholder="Pilih Kategori"
                                        value={{ label: props.categoryNameUpdate, value: props.categoryIDUpdate }}
                                        onChange={(e) => props.setCategoryIDUpdate(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={props.date3Update} onChange={(e) => props.setDate3Update(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Keterangan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.descriptionUpdate} onChange={(e) => props.setDescriptionUpdate(e.target.value)} />

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
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={props.nominalUpdate} onChange={(e) => props.setNominalUpdate(e.target.value)} />
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
                    <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
                    <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
