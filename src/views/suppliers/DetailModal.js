import React from 'react'
import MaterialTable from 'material-table';
import {
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

function DetailModal(props) {
    return (
        <>
        <CModal
            show={props.detail}
            onClose={() => props.setDetail(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Detail {props.nameDetail}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                <MaterialTable
                    icons={props.tableIcons}
                    // other props
                    title=""
                    columns={[
                        {
                            title: 'No', field: 'no', cellStyle: {
                                width: '10%',
                            },
                        },
                        { title: 'Kategori', field: 'cName' },
                        { title: 'Nama', field: 'name' },
                    ]}
                    data={props.tableDetailData}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
                        }),
                        filtering: true
                    }}
                />
                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => props.setDetail(false)}>Tutup</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default DetailModal