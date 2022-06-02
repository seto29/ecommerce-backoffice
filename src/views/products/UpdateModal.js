import React from 'react'
import Select from 'react-select'
import Barcode from 'react-barcode'
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
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
  const saveImage = () => {
        var name = 'BARCODE - ' + props.nameUpdate +' - '+ props.skuUpdate + '.png';
        domtoimage.toBlob(document.querySelector("#skuBarcode"))
        .then(function (blob) {
            saveAs(blob, name);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    return (
        <>
        
        <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Produk</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Barcode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <div id="skuBarcode">
                                        <center>
                                            <Barcode value={props.skuUpdate}/>
                                        </center>
                                    </div>
                                </CCol>
                            </CFormGroup>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">SKU</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="hidden" value={props.idUpdate}/>
                                    <CInput type="text" value={props.skuUpdate} onChange={(e)=> props.setSKUUpdate(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
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
                                        value={{ label: props.cNameUpdate, value: props.cIDUpdate }}
                                        onChange={(e) => props.updateCID(e)}
                                        
                                    />
                                </CCol>
                        </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Baju anak, celana" value={props.nameUpdate} onChange={(e)=> props.setNameUpdate(e.target.value)} />
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={props.cogsUpdate} onChange={(e) => props.setCOGSUpdate(e.target.value)} />
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={props.priceUpdate} onChange={(e) => props.setPriceUpdate(e.target.value)} />
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
                                    <CInput type="number" value={props.stockUpdate} onChange={(e)=> props.setStockUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => saveImage()}>Print Barcode</CButton>{' '}
                <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
                  <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
