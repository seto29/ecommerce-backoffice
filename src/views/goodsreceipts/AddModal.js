import React from 'react'
import Select from 'react-select';
import BarcodeReader from 'react-barcode-reader'
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
    CFormText
} from '@coreui/react'
function AddModal(props) {
        
    return (
        <>
        
        <CModal
                show={props.large}
                onClose={() => props.setLarge(false)}
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Barang Masuk Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <BarcodeReader
                    onError={props.handleError}
                    onScan={(e)=>props.handleScan(e)}
                  />
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Surat Jalan</CLabel>
                                    <CFormText>Opsional</CFormText>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="0123456789" value={props.don} onChange={(e)=> props.setDON(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            {/* <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Supplier</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={props.suppliers}
                                        placeholder="Pilih supplier"
                                        onChange={(e) => props.setSID(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup> */}
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Pengiriman</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={props.dod} onChange={(e)=> props.setDOD(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Data Barang</CLabel>
                                </CCol>
                                <CCol xs="9" md="9">

                          {props.inputList.map((x, i) => {
                            return (
                              <CCol>
                                <CRow>
                                <CCol xs="5" md="5">
                                <Select
                                    name="productName"
                                    options={props.products}
                                    placeholder="Pilih produk"
                                    value={x.product}
                                    onChange={(e) =>props. handleSelectChange(e, i)}
                                />
                                </CCol>
                                <CCol xs="2" md="2">
                                  <CInput
                                  className="ml10"
                                  name="qty"
                                  placeholder="Stok"
                                  type="number"
                                  value={x.qty}
                                  onChange={e => props.handleInputChange(e, i)}
                                  />
                                </CCol>
                                <CCol xs="1" md="1">
                                  <div className="btn-box">
                                  {props.inputList.length !== 1 && <CButton
                                    color="danger"
                                    onClick={() => props.handleRemoveClick(i)}>-</CButton>}
                                  
                                </div>
                                <div style={{height: '1%'}}>&nbsp;</div>
                                </CCol>
                                </CRow>
                                <CCol xs="12" md="9">
                                  {props.inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={props.handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                                </CCol>
                              </CCol>
                            );
                          })}
                          </CCol>
                            </CFormGroup>

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
