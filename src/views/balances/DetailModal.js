import React, { useEffect, useState, forwardRef } from 'react'
import NumberFormat from 'react-number-format';

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
import { GetByDate} from '../../services/Transactions'
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
function DetailModal(props) {
    const [transactions, setTransactions] =useState([])
    let number = 0

    async function fetchBalances() {
        const response = await GetByDate(props.idUpdate)
        if(response.success===1){
            setTransactions(response['orders']);
        }
    }
    
    let tableData = transactions && transactions.map(({code, uName, total, delivery_fee, discount}) => {
        // let st = handleStatus(status)
        number++
        let tots = parseInt(total)-parseInt(discount)
        const data = {
            no:number,
            code:code,
            uName:uName,
            total:<NumberFormat value={total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            discount:<NumberFormat value={discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            delivery_fee:<NumberFormat value={delivery_fee} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            tots: <NumberFormat value={tots} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
        }
        return data;
    });

    useEffect(()=>{
        fetchBalances()
    },[props])
        
    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Detail Keuangan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="10">
                        
                    <MaterialTable
                                        icons={tableIcons}
                                        title="Transaksi Harian"
                                        columns={[
                                            {
                                                title: 'No', field: 'no', cellStyle: {
                                                    width: '5%',
                                                },
                                            },
                                            {
                                                title: 'Nama Pengguna', field: 'uName'
                                            },
                                            {
                                                title: 'Penjualan', field: 'total'
                                            },
                                            {
                                                title: 'Ongkos Kirim', field: 'delivery_fee'
                                            },
                                            {
                                                title: 'Diskon', field: 'discount'
                                            },
                                            {
                                                title: 'Penjualan-Diskon', field: 'tots'
                                            },

                                        ]}
                                        data={tableData}
                                        // onRowClick={((evt, selectedRow) => editModal(selectedRow.rawDate))}
                                        options={{
                                            filtering: true
                                        }}
                                    />
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                    <CButton color="danger" onClick={() => props.deleteBlnc()}>Hapus</CButton>{' '}
                </CModalFooter>
            </CModal>
        </>
    )
};

export default DetailModal
