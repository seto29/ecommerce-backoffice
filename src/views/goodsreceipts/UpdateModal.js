import React from 'react'
import Select from 'react-select';
import MaterialTable from 'material-table';
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
                    <CModalTitle>Detail Barang Masuk</CModalTitle>
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
                            { title: 'Produk', field: 'pName' },
                            { title: 'Qty', field: 'qty' },
                        ]}
                        data={props.tableDetailData}
                        // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                        options={{
                            rowStyle: rowData => ({
                                backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
                            }),
                        }}
                    />
                  </CCol>
                </CModalBody>
                <CModalFooter>
                <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
                    <CButton color="secondary" onClick={() => props.setEdit(!props.edit)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
