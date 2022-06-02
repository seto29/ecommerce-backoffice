import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CLabel,
    CInput,
    CImg,
    CPopover,
    CButton
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
import { getAll, fDelete } from '../../services/Balances'
import Toaster from '../components/Toaster'
import DetailModal from './DetailModal'
import Download from './Downlaod'
import { parse } from 'filepond';
import { GetByDate} from '../../services/Orders'

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

function Balances({ }) {
    const [toastM, setToastM] = useState("")
    const [toasts, setToasts] = useState([])
    const [edit, setEdit] = useState(false)
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [balances, setBalances] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [expenseID, setExpenseID] = useState("")
    const [expenseDescription, setExpenseDescription] = useState("")
    const [nominal, setNominal] = useState("")
    const [date2] = useState(new Date())
    const [expenseDate, setExpenseDate] = useState(date2.toISOString().substr(0, 10))
    const [idUpdate, setIDUpdate] = useState("")
    const [ dateTo, setDateTo] = useState(datestringNow)
    const [ dateFrom, setDateFrom] = useState(datestringFrom)
    const dateMin = useState(initdateMin)
    const dateMax = useState(datestringNow)
    
    let number = 0
    let number1 = 0
    let number2 = 0
    let gtotal = 0
    let grand_total = 0
    let total_delivery_fee = 0
    let total_discount = 0
    let total_cogs = 0
    let total_qty = 0
    
    const addToast = () => {
        setToasts([
            ...toasts,
            { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    async function fetchOrders(dateFrom, dateTo) {
        await GetByDate(dateFrom, dateTo).then(({ orders }) => {

            setOrders(orders)


        })
    }

    const handleStatus=(st)=>{
        let str = ""
        if(st==="0"){
            str = "Belum Dibayar"
        }else if(st==="1"){
            str = "Diproses"
        }else if(st==="2"){
            str = "Dikirim"
        }else if(st==="3"){
            str = "Diterima"
        }else if(st==="4"){
            str = "Selesai"
        }else if(st==="5"){
            str = "Dibatalkan Customet"
        }else if(st==="6"){
            str = "Dibatalkan Admin"
        }
        return str
    }

    let tableData2 = orders && orders.map(({code, created_at, uName, total, discount, delivery_fee, point_payment, status}) => {
        let st = handleStatus(status)
        number2++
        let tots = parseInt(total)-parseInt(discount)
        const data = {
            no:number2,
            code:code,
            created_at:created_at,
            uName:uName,
            total:total,
            discount:discount,
            delivery_fee:delivery_fee,
            point_payment:point_payment,
            status:st,
            tots:tots
        }
        return data;
    });

    let tableData = balances && balances.map(({date, delivery_fee, discount, point, total}) => {
        number++
        gtotal = parseInt(total)-parseInt(discount)
        grand_total+=parseInt(total)
        total_delivery_fee+=parseInt(delivery_fee)
        total_discount+=parseInt(discount)
        const data = {
            no: number,
            delivery_fee: <NumberFormat value={delivery_fee} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            discount: <NumberFormat value={discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            total: <NumberFormat value={total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            point: <NumberFormat value={point} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} suffix={' Poin'} />,
            gtotal: <NumberFormat value={gtotal} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            date: Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(Date.parse(date)),
            rawDate: date
        }
        return data;
    });

    let tableData1 = products && products.map(({name, image, cogs, price, point_price, qty}) => {
        number1++
        total_cogs+=(parseInt(cogs)*parseInt(qty))
        total_qty+=parseInt(qty)
        const data = {
            no: number1,
            name:name,
            image:<CImg
                src={image}
                style={{width:'10vh'}}
                alt={name}
            />,
            cogs: <NumberFormat value={cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            price: <NumberFormat value={price} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            // raw_price: <NumberFormat value={price} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            point_price: <NumberFormat value={point_price} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            qty: qty,
            tot_cogs: <NumberFormat value={(parseInt(cogs)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            tot_price: <NumberFormat value={(parseInt(price)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            tot_point_price: <NumberFormat value={(parseInt(point_price)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} suffix={' Poin'} />,
           raw_tot_cogs: (parseInt(cogs)*parseInt(qty)),
           raw_tot_price: (parseInt(price)*parseInt(qty)),
           raw_tot_point_price: (parseInt(point_price)*parseInt(qty))
        }
        return data;
    });

    function editModal(id) {
        setIDUpdate(id)
        setEdit(!edit)
    }
    async function fetchBalances(dateTo,dateFrom) {
        const response = await getAll(dateTo,dateFrom)
        if(response.success===1){
            setBalances(response.report)
            setProducts(response.products)
        }
    }
    
    useEffect(() => {
        fetchOrders(dateFrom, dateTo)
        fetchBalances(dateTo,dateFrom)
    }, [])
    
    async function deleteBlnc() {
        const response = await fDelete(idUpdate)
        if (response['success'] === 1) {
            fetchBalances(dateTo,dateFrom)
            
        fetchOrders(dateFrom, dateTo)
            setToastM("delete")
            setEdit(!edit)
        }else{
            setToastM("failed")
        }
        addToast()
    }

    
    async function changeDateFrom(e) {
        setDateFrom(e)
        fetchBalances(dateTo,e)
        
        fetchOrders(e, dateTo)
    }

    async function changeDateTo(e) {
        setDateTo(e)
        fetchBalances(e,dateFrom)
        fetchOrders(dateFrom, e)
    }

    return (
        <>
            <DetailModal 
                edit={edit}
                setEdit={setEdit}
                idUpdate={idUpdate}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
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
                            <CRow className="align-items-right">
                                <CCol lg="12">
                                    
                                    <Download
                                        tableData1={tableData1}
                                        tableData2={tableData2}
                                        dateFrom={dateFrom}
                                        dateTo={dateTo}
                                    />
                                </CCol>
                            </CRow>
                            <CRow style={{marginTop:'5%'}}>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                            <CRow style={{ justifyContent: 'space-between', }}>


                                            <CCol>
                                            <CLabel htmlFor="name"><b>Total Pemasukan</b></CLabel>
                                            </CCol>
                                            {/* <CCol> */}
                                                <CPopover
                                                    content="total pemasukan adalah total penjualan dikurangi total diskon"
                                                    placement="top"
                                                    >
                                                    <CButton color="secondary">?</CButton>
                                                </CPopover>
                                            {/* </CCol> */}
                                            </CRow>
                                            <NumberFormat value={grand_total-total_discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                        <CRow style={{ justifyContent: 'space-between', }}>


                                            <CCol>
                                            <CLabel htmlFor="name"><b>Total Penjualan </b></CLabel>
                                            </CCol>
                                            {/* <CCol> */}
                                                <CPopover
                                                    content="total penjualan adalah total yang dibayarkan customer tidak termasuk diskon dan ongkir"
                                                    placement="top"
                                                    >
                                                    <CButton color="secondary">?</CButton>
                                                </CPopover>
                                            {/* </CCol> */}
                                            </CRow>
                                            <NumberFormat value={grand_total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                        <CRow style={{ justifyContent: 'space-between', }}>


                                        <CCol>
                                        <CLabel htmlFor="name"><b>Total Diskon</b></CLabel>
                                        </CCol>
                                        {/* <CCol> */}
                                            <CPopover
                                                content="total diskon adalah total potongan harga yang digunakan pengguna selama periode tertentu"
                                                placement="top"
                                                >
                                                <CButton color="secondary">?</CButton>
                                            </CPopover>
                                        {/* </CCol> */}
                                        </CRow>
                                            <NumberFormat value={total_discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                        <CRow style={{ justifyContent: 'space-between', }}>


                                        <CCol>
                                        <CLabel htmlFor="name"><b>Total Ongkir </b></CLabel>
                                        </CCol>
                                        {/* <CCol> */}
                                            <CPopover
                                                content="total ongkir adalah total biaya pengiriman yang dibayar oleh customer"
                                                placement="top"
                                                >
                                                <CButton color="secondary">?</CButton>
                                            </CPopover>
                                        {/* </CCol> */}
                                        </CRow>
                                            <NumberFormat value={total_delivery_fee} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <CRow style={{ marginBottom:'5%'}}>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                        <CRow style={{ justifyContent: 'space-between', }}>


                                        <CCol>
                                        <CLabel htmlFor="name"><b>Laba Kotor</b></CLabel>
                                        </CCol>
                                        {/* <CCol> */}
                                            <CPopover
                                                content="laba kotor adalah adalah total pemasukan dikurangi total modal"
                                                placement="top"
                                                >
                                                <CButton color="secondary">?</CButton>
                                            </CPopover>
                                        {/* </CCol> */}
                                        </CRow>
                                            <NumberFormat value={grand_total-total_discount-total_cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                            <CRow style={{ justifyContent: 'space-between', }}>


                                            <CCol>
                                                <CLabel htmlFor="name"><b>Total Modal </b></CLabel>
                                            </CCol>
                                            {/* <CCol> */}
                                                <CPopover
                                                    content="total modal adalah jumlah keselurahan modal dari barang yang telah laku"
                                                    placement="top"
                                                    >
                                                    <CButton color="secondary">?</CButton>
                                                </CPopover>
                                            {/* </CCol> */}
                                            </CRow>
                                            <NumberFormat value={total_cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                            <CRow style={{ justifyContent: 'space-between', }}>


                                            <CCol>
                                            <CLabel htmlFor="name"><b>Jenis Barang Terjual</b></CLabel>
                                            </CCol>
                                            {/* <CCol> */}
                                                <CPopover
                                                    content="Jenis Barang Terjual adalah jumlah jenis barang yang dibeli"
                                                    placement="top"
                                                    >
                                                    <CButton color="secondary">?</CButton>
                                                </CPopover>
                                            {/* </CCol> */}
                                            </CRow>
                                            {number1}
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs="3">
                                    <CCard>
                                        <CCardBody>
                                            <CRow style={{ justifyContent: 'space-between', }}>


                                            <CCol>
                                            <CLabel htmlFor="name"><b>Jumlah Barang Terjual</b></CLabel>
                                            </CCol>
                                            {/* <CCol> */}
                                                <CPopover
                                                    content="jumlah barang terjual adalah total kuantitas keseluruhan barang yang terjual"
                                                    placement="top"
                                                    >
                                                    <CButton color="secondary">?</CButton>
                                                </CPopover>
                                            {/* </CCol> */}
                                            </CRow>
                                            {total_qty}
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs='12' lg='6'>
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
                                                title: 'Tanggal', field: 'date', cellStyle: {
                                                    width: '15%',
                                                },
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
                                                title: 'Penjualan-Diskon', field: 'gtotal'
                                            },

                                        ]}
                                        data={tableData}
                                        onRowClick={((evt, selectedRow) => editModal(selectedRow.rawDate))}
                                        options={{
                                            filtering: true
                                        }}
                                    />
                                </CCol>
                                <CCol xs='12' lg='6'>
                                    <MaterialTable
                                        icons={tableIcons}
                                        title="Transaksi per Barang"
                                        columns={[
                                            {
                                                title: 'No', field: 'no', cellStyle: {
                                                    width: '5%',
                                                },
                                            },
                                            {
                                                title: 'Nama', field: 'name', cellStyle: {
                                                    width: '15%',
                                                },
                                            },
                                            {
                                                title: 'Jumlah', field: 'qty'
                                            },
                                            {
                                                title: 'Total Modal', field: 'tot_cogs'
                                            },
                                            {
                                                title: 'Total Penjualan', field: 'tot_price'
                                            },
                                            {
                                                title: 'Poin', field: 'tot_point_price'
                                            },

                                        ]}
                                        data={tableData1}
                                        // onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.cName, selectedRow.description, selectedRow.debit, selectedRow.credit, selectedRow.dateRaw))}
                                        options={{
                                            filtering: true
                                        }}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default Balances
