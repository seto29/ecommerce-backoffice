import React from 'react'
import ReactExport from "react-data-export";
import {
    CCol,
    CButton,
} from '@coreui/react'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Download(props) {

    let newDate = new Date()
    let date = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long"
    }).format(Date.parse(newDate))
    let fileName = "Data Barang Masuk Jopex per "+date;
            
    return (
        <>
        
        
        <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={props.tableData} name="Barang Masuk">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="No. Surat Jalan" value="don"/>
                                          <ExcelColumn label="Tanggal Pengiriman" value="dod"/>
                                          <ExcelColumn label="Supplier" value="sName"/>
                                          <ExcelColumn label="Diterima Oleh" value="eName"/>
                                          <ExcelColumn label="Tanggal Input" value="received"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
        </>
    )

};

export default Download
