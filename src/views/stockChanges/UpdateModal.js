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
                    <CModalTitle>Pilih Produk</CModalTitle>
                </CModalHeader>
                <CModalBody>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Produk</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={props.categories}
                                        placeholder="Pilih Produk"
                                        value={{ label: props.cNameUpdate, value: props.cIDUpdate }}
                                        onChange={(e) => props.updateCID(e)}
                                        
                                    />
                                </CCol>
                        </CFormGroup>
                            
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => props.edita(props.cIDUpdate)}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
