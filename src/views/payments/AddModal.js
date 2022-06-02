import React from 'react'
import Select from 'react-select';
import NumberFormat from 'react-number-format';
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
                onClose={() => props.setLarge(!props.large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pembayaran Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Invoice</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <Select
                                    options={props.notPaid}
                                    value={props.invoiceSelected}
                                    placeholder="Pilih Invoice"
                                    onChange={(e) => props.fetchDetails(e)}
                                />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Jumlah</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    {/* <CInput type="phone" readonly value={amount} /> */}
                                    <NumberFormat value={props.amount} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Toko</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" readonly value={props.sName} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Jatuh Tempo</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInput type="text" readonly value={props.dueDate} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => props.insert()}>Terima</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setLarge(!props.large)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
