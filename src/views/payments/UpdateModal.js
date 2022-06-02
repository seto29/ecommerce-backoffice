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
            onClose={() => props.setEdit(!props.edit)}
            size="lg"
        >
          
            <CModalHeader closeButton>
                <CModalTitle>Detail Pembayaran</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Nomor Invoice</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="hidden" value={props.idUpdate} />
                                <CInput type="text" value={props.invoiceNoUpdate} readonly />
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Nominal</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {props.pAmountUpdate}
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Diinput Oleh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="phone" value={props.eNameUpdate} readonly />
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" ><a href={"http://apis.jopex.id/snippets/prints/receipt.php?id=" + props.idUpdate} target="_blank">Print</a></CButton>
                <CButton color="danger" onClick={() => props.cancel()}>Batalkan</CButton>
                {/* <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '} */}
                <CButton color="secondary" onClick={() => props.setEdit(!props.edit)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
