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
    let fileName = "Data Laba Bersih Hiji per "+date;
            
    return (
        <>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={props.exportData} name="Laba Bersih">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Nama" value="name"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
        </>
    )

};

export default Download
