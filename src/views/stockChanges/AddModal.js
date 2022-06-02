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
                    <CModalTitle>Produk Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">SKU</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.sku} onChange={(e)=> props.setSKU(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={props.categories}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => props.setCID(e.target.value)}
                                    />
                                </CCol>
                        </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Baju anak, celana" value={props.name} onChange={(e)=> props.setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Modal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={props.cogs} onChange={(e) => props.setCOGS(e.target.value)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>.00</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Jual</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={props.price} onChange={(e) => props.setPrice(e.target.value)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>.00</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Stock</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" value={props.stock} onChange={(e)=> props.setStock(e.target.value)} />
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
