import React from 'react'
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import MaterialTable from 'material-table';
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
            size="xl"
        >
            <CModalHeader closeButton>
            <CModalTitle>Detail Penjualan</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CRow>
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
                    { title: 'Jumlah', field: 'qty' },
                    { title: 'Harga Satuan', field: 'pUnitPrice' },
                    { title: 'Subtotal', field: 'pSubtotal' },
                    ]}
                    data={props.tableDetailData}
                    // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                    options={{
                    rowStyle: rowData => ({
                        backgroundColor: (rowData.tableData.id % 2 === 0) ? '#EEE' : '#FFF'
                    }),
                    }}
                />
                </CCol>
                <CCol xs="20" md="10">
                Jenis Barang : {props.number3}
                </CCol>
                <CCol xs="20" md="10">
                Jumlah Barang : {props.dQty}
                </CCol>
                <CCol xs="20" md="10">
                Total : <NumberFormat value={props.detailTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                </CCol>
            </CRow>
            </CModalBody>
            <CModalFooter>
            <CButton color="secondary" ><a href={"http://apis.jopex.id/snippets/prints/invoice.php?id=" + props.idUpdate} target="_blank">Print</a></CButton>
            <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
            <CButton color="secondary" onClick={() => props.setEdit(!props.edit)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
