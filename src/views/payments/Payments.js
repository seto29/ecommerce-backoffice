import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import NumberFormat from 'react-number-format';
import Select from 'react-select';
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
import {getAll, getNotYetPaid, fInsert, fCancel, getDetail} from '../../services/Payments'
import Toaster from '../components/Toaster'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

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

const d = new Date();
var month = ("0" + (d.getMonth() + 1)).slice(-2); 
var date = ("0" + d.getDate()).slice(-2); 
var datestringNow = d.getFullYear()  + "-" + month + "-" + date;
var datebefore = ("0" + (d.getDate() - 7 < 0 ? 1 : d.getDate() - 7)).slice(-2);
var datestringFrom = d.getFullYear()  + "-" + month + "-" + datebefore;
var monthBefore = ("0" + (d.getMonth())).slice(-2);
var initdateMin = d.getFullYear()  + "-" + monthBefore + "-" + date;

function Payments({ }) {
    const [toasts, setToasts] = useState([])
    const [toastM, setToastM] = useState("")
    const [position, setPosition] = useState('top-right')
    const [autohide, setAutohide] = useState(true)
    const [autohideValue, setAutohideValue] = useState(1000)
    const [closeButton, setCloseButton] = useState(true)
    const [fade, setFade] = useState(true)
    const [ dateTo, setDateTo] = useState(datestringNow)
    const [ dateFrom, setDateFrom] = useState(datestringFrom)
    const dateMin = useState(initdateMin)
    const dateMax = useState(datestringNow)
    
    const [payments, setPayments] = useState([])
    const [notPaid, setNotPaid] = useState([])
    const [id, setID] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [salesID, setSalesID] = useState("")

    const [idUpdate, setIDUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")
    const [invoiceNoUpdate, setInvoiceNoUpdate] = useState("")
    const [pAmountUpdate, setPAmountUpdate] = useState("")
    const [eNameUpdate, setENameUpdate] = useState("")
    const [invoiceSelected, setInvoiceSelected] = useState({})
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)

    const addToast = () => {
        setToasts([
            ...toasts,
            { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    const [amount, setAmount] = useState("")
    const [sName, setSName] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [code, setCode] = useState("")
    let currentID = 2;
    let number = 0
    let tableData = payments && payments.map(({ id, code, amount, eName }) => {
        number++
        const data = {
            no: number,
            id: id,
            invoiceNo: code,
            amount: amount,
            pAmount: <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
            eName: eName,
        }
        return data;
    });
    let number2 = 0
    let exportData = payments && payments.map(({ id, name, phone, address }) => {
        number2++
        const data = {
            no: number2,
            id: id,
            name: name,
            phone: phone,
            address: address,
        }
        return data;
    });
    function editModal(id, invoiceNo, pAmount, eName) {
        setIDUpdate(id)
        setInvoiceNoUpdate(invoiceNo)
        setPAmountUpdate(pAmount)
        setENameUpdate(eName)
        setEdit(!edit)

    }
    async function fetchPayments(dateTo, dateFrom) {
        const response = await getAll(dateTo, dateFrom)
        if(response['success']===1){
            setPayments(response['payments'])
        }else{
            setPayments([])
        }
    }
    async function fetchDetails(e){
        setID(e.target.value)
        setInvoiceSelected(e)
        const response = await getDetail(e.target.value)
        setSName(response['payments'][0]['sName'])
        setAmount(response['payments'][0]['amount'])
        setSalesID(response['payments'][0]['sales_id'])
        setCode(response['payments'][0]['code'])
        
        setDueDate(
        Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(Date.parse(response['payments'][0]['due_date'])))
        return response
    }

    async function fetchNotPaid() {
        const response = await getNotYetPaid()
        setNotPaid(response)
      }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchPayments(dateTo, dateFrom)
        fetchNotPaid()
    }, [])

    async function insert() {
        const response = await fInsert(id, currentID, salesID, amount,code )
        if (response['success'] === 1) {
            let url1 = "http://apis.jopex.id/snippets/prints/receipt.php?id=" + id
            window.open(url1, 'sharer1', 'toolbar=0,status=0,width=400,height=600')
            setAmount("")
            setID("")
            setSName("")
            setDueDate("")
            setInvoiceSelected({})
            fetchPayments(dateTo, dateFrom)
            fetchNotPaid()
            setToastM('insert')
            setLarge(!large)
        }else{
            setToastM('failed')
        }
        
        addToast()
    }
    
    async function cancel() {
        const response = await fCancel(idUpdate)
        if (response['success'] === 1) {
            fetchPayments(dateTo, dateFrom);
            setEdit(!edit);
            setToastM('delete')
        }else{
            setToastM('failed')
        }
        addToast();
    }
    async function changeDateFrom(e) {
        setDateFrom(e)
        fetchPayments(dateTo,e)
    }

    async function changeDateTo(e) {
        setDateTo(e)
        fetchPayments(e,dateFrom)
    }
    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                notPaid={notPaid}
                invoiceSelected={invoiceSelected}
                fetchDetails={fetchDetails}
                amount={amount}
                sName={sName}
                dueDate={dueDate}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                idUpdate={idUpdate}
                invoiceNoUpdate={invoiceNoUpdate}
                pAmountUpdate={pAmountUpdate}
                eNameUpdate={eNameUpdate}
                cancel={cancel}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    <h4>Pembayaran</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <Download
                                    tableData={tableData}
                                />
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-right">
                                <CCol lg="6">
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Dari</CLabel>
                                    <CInput type="date" value={dateFrom} onChange={(e) => changeDateFrom(e.target.value)}  min={dateMin} max={dateTo}/>
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Hingga</CLabel>
                                    <CInput type="date" value={dateTo} min={dateFrom} max={dateMax} onChange={(e) => changeDateTo(e.target.value)} />
                                </CCol>
                            </CRow>
                            <br/>
                            <MaterialTable
                                icons={tableIcons}
                                // other props
                                title=""
                                columns={[
                                    {
                                        title: 'No', field: 'no', cellStyle: {
                                            width: '10%',
                                        },
                                    },
                                    { title: 'Nomor Invoice', field: 'invoiceNo' },
                                    { title: 'Jumlah', field: 'pAmount' },
                                    { title: 'Diterima Oleh', field: 'eName', hidden: JSON.parse(Cookies.get('user')).role_id==='1'?false:true },
                                ]}
                                data={tableData}
                                // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.invoiceNo, selectedRow.pAmount, selectedRow.eName))}
                                options={{
                                    rowStyle: rowData => ({
                                        backgroundColor: (rowData.tableData.id % 2 === 0) ? '#EEE' : '#FFF'
                                    }),
                                    filtering: true
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default Payments
