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
    let fileName = "Data Pelanggan Hiji per "+date;
            
    return (
        <>
        
        <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
            <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                <ExcelSheet data={props.tableData} name="Karyawan">
                    <ExcelColumn label="No." value="no"/>
                    <ExcelColumn label="Nama" value="name"/>
                    <ExcelColumn label="No. Telp" value="phone"/>
                    <ExcelColumn label="Email" value="email"/>
                    <ExcelColumn label="Tanggal Lahir" value="rawBirthdate"/>
                    <ExcelColumn label="Tanggal Bergabung" value="rawBirthdate"/>
                </ExcelSheet>
            </ExcelFile>
        </CCol>
        </>
    )

};

export default Download
