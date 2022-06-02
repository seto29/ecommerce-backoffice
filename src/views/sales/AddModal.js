import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import Select from 'react-select';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Cookies from 'js-cookie'
import {
  CCard,
  CCardBody,
  CCardHeader,
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
  CFormText,
  CToaster,
  CToast,
  CToastBody,
  CToastHeader
} from '@coreui/react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import BarcodeReader from 'react-barcode-reader'
function AddModal(props) {
    let priceTot = 0
    let bayar = 0
    let i = 0

    return (
        <>
        <CModal
            show={props.large}
            onClose={() => props.setLarge(false)}
            size="xl"
        >
            <CModalHeader closeButton>
            <CModalTitle>Penjualan Baru</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <BarcodeReader
                onError={props.handleError}
                onScan={(e) => props.handleScan(e)}
            />
            <CCol xs="20" md="10">
                <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                    <CCol md="3">
                    <CLabel htmlFor="name">Toko</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <Select
                        options={props.shops}
                        placeholder="Pilih Toko"
                        value={props.selected}
                        onChange={(e) => props.handleSelect(e)}
                    />
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                    <CLabel htmlFor="name">Pembayaran Lunas</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <FormControlLabel
                        value="delivery"
                        control={<Checkbox color="primary" checked={props.paidOff} onChange={(e) => props.setPaidOff(!props.paidOff)} />}
                    />
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                    <CLabel htmlFor="name">Tanggal Pengiriman</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CInput type="date" value={props.dod} onChange={(e) => props.setDOD(e.target.value)} />
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                    <CCol md="3">
                    <CLabel htmlFor="name">Catatan</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CInput type="text" value={props.notes} onChange={(e) => props.setNotes(e.target.value)} />
                    </CCol>
                </CFormGroup>
                </CForm>
                <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="name">Data Barang</CLabel>
                </CCol>
                <CCol xs="9" md="9">

                    {props.inputList.map((x, i) => {

                    priceTot = priceTot + (parseInt(x.unit_price) * parseInt(x.qty));
                    return (
                        <CCol>
                        <CRow>
                            <CCol xs="5" md="5">
                            <Select
                                name="productName"
                                options={props.products}
                                placeholder="Pilih produk"
                                value={x.product}
                                onChange={(e) => props.handleSelectChange(e, i)}
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

                            <CCol xs="3" md="3">
                            <CInput
                                className="ml10"
                                name="unit_price"
                                placeholder="Harga"
                                type="number"
                                value={x.unit_price}
                                onChange={e => props.handleInputChange(e, i)}
                            />
                            </CCol>

                            <CCol xs="1" md="1">
                            <div className="btn-box">
                                {props.inputList.length !== 1 && <CButton
                                color="danger"
                                onClick={() => props.handleRemoveClick(i)}>-</CButton>}

                            </div>
                            <div style={{ height: '1%' }}>&nbsp;</div>
                            </CCol>
                        </CRow>
                        <CCol xs="12" md="12">
                            {props.inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={props.handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                        </CCol>
                        </CCol>
                    );
                    })}
                    <CCol xs="12" md="12">

                    <Typography variant="h6">Total Rp{props.handleRp(priceTot)}</Typography>
                    </CCol>
                </CCol>
                </CFormGroup>


                {
                props.paidOff === false ?
                    <>
                    <Typography variant="h6" style={{ marginTop: "25px", marginBottom: '25px' }}>{props.edit ? "Pembayaran" : "Termin"}</Typography>
                    <Typography variant="caption" style={{ marginTop: "0px" }}>{props.edit ? 'Untuk Informasi dan Mengubah status pembayaran silahkan Menuju Menu Pembayaran' : ''}</Typography>
                    <br />
                    <Typography variant="caption" style={{ marginTop: "25px" }}>{props.edit ? 'Mohon untuk tidak mengubah atau menghapus termin yang sudah dibayar' : ''}</Typography>
                    <CCol>
                        <CRow>
                        <CCol xs="2" md="2">
                            <Typography fullHeight variant="subtitle2" color="black"><b>No</b></Typography>
                        </CCol>
                        <CCol xs="4" md="4">
                            <Typography variant="subtitle2" color="black">Nominal </Typography>
                        </CCol>
                        <CCol xs="4" md="4">
                            <Typography variant="subtitle2" color="black">Tanggal Jatuh Tempo</Typography>
                        </CCol>
                        <CCol xs="2" md="2">
                        </CCol>
                        </CRow>

                        {props.payments.map(({ id, amount, product, unit_price, due_date, is_paid_off }, index) => {
                        let a = due_date.slice(0, 10)
                        bayar = bayar + parseInt(amount);
                        i = index + 1;
                        return (
                            <CRow>
                            <CCol xs="2" md="2">
                                <Typography style={{ fontSize: '20px' }} color="black"><b>{i}</b></Typography>
                            </CCol>
                            <CCol xs="4" md="4">
                                <TextField fullWidth name="amount" size="small" variant="outlined" type="number" value={amount} onChange={(e) => { props.handleTerminInput(e, index) }} />
                            </CCol>
                            <CCol xs="4" md="4">
                                <TextField fullWidth name="due_date" size="small" variant="outlined" type="date" value={a} onChange={(e) => { props.handleTerminInput(e, index) }} />
                            </CCol>
                            <CCol xs="2" md="2">
                                <Button title="Delete" onClick={() => {
                                props.handleRemoveTermin(id)
                                }} type="button" variant="contained" fullWidth value="noexit" style={{ backgroundColor: 'red' }}>
                                <b style={{ color: 'white' }}>
                                    X
                                                    </b>
                                </Button>
                            </CCol>
                            </CRow>
                        )
                        })
                        }
                    </CCol>
                    <Grid container spacing={1} justify="center" align="center">
                        <Grid justify="center" align="right" item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h6">Total Rp{props.handleRp(bayar)}</Typography>
                        </Grid>
                        <Grid justify="center" align="center" item xs={6} sm={9} md={9} lg={9}>
                        </Grid>
                        <Grid justify="center" align="center" item xs={6} sm={3} md={3} lg={3}>
                        <CButton onClick={() => {
                            props.addArrayTermin(i - 1)
                        }} color="primary">
                            Tambah Termin
                                    </CButton>
                        </Grid>
                    </Grid>
                    </>
                    : ''
                }

            </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={() => props.insert(props.don, props.dod, props.sID, props.inputList,props.payments,props.isDelivery,props.paidOff,props.notes,bayar, priceTot)}>Simpan</CButton>{' '}
            <CButton color="secondary" onClick={() => props.setLarge(!props.large)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default AddModal
