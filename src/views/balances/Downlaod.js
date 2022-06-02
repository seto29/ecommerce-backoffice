import React from 'react'
import ReactExport from "react-data-export";
import {
    CCol,
    CButton,
    CRow
} from '@coreui/react'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Download(props) {
    let dateF = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(Date.parse(props.dateFrom))
    let dateT = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(Date.parse(props.dateTo))
    let fileName = "Data Keuangan " + dateF + " - " + dateT;
            
    return (
        <>
        <CRow className="align-items-center">
            <CCol col="12" sm="4" md="4" m className="mb-3 mb-xl-0">
            </CCol>
            <CCol col="12" sm="4" md="4" m className="mb-3 mb-xl-0">
            </CCol>
            <CCol col="12" sm="4" md="4" m className="mb-3 mb-xl-0">
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                    <ExcelSheet data={props.tableData2} name="Daftar Transaksi">
                        <ExcelColumn label="No." value="no" />
                        <ExcelColumn label="Kode" value="code" />
                        <ExcelColumn label="Tanggal" value="created_at" />
                        <ExcelColumn label="Nama Customer" value="uName" />
                        <ExcelColumn label="Pembayaran Point" value="point_payment" />
                        <ExcelColumn label="Diskon" value="discount" />
                        <ExcelColumn label="Ongkir" value="delivery_fee" />
                        <ExcelColumn label="Pembelian" value="total" />
                        <ExcelColumn label="Pemasukan" value="tots" />
                    </ExcelSheet>
                    <ExcelSheet data={props.tableData1} name="Penjualan Per Barang">
                        <ExcelColumn label="No." value="no" />
                        <ExcelColumn label="Nama" value="name" />
                        <ExcelColumn label="Kuantitas" value="qty" />
                        <ExcelColumn label="Total HPP" value="raw_tot_cogs" />
                        <ExcelColumn label="Total Penjualan" value="raw_tot_price" />
                        <ExcelColumn label="Total Point" value="raw_tot_point_price" />
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </CRow>
        </>
    )

};

export default Download
