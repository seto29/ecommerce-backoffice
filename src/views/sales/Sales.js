import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import Select from 'react-select';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  CFormText,
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
import {getAll,getDetails,getProducts,getShops,fDelete,fInsert} from '../../services/Sales'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import Toaster from '../components/Toaster';

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
const fields = ['name', 'registered', 'role', 'status']


const d = new Date();
var month = ("0" + (d.getMonth() + 1)).slice(-2); 
var date = ("0" + d.getDate()).slice(-2); 
var datestringNow = d.getFullYear()  + "-" + month + "-" + date;
var datebefore = ("0" + (d.getDate() - 7 < 0 ? 1 : d.getDate() - 7)).slice(-2);
var datestringFrom = d.getFullYear()  + "-" + month + "-" + datebefore;
var monthBefore = ("0" + (d.getMonth())).slice(-2);
var initdateMin = d.getFullYear()  + "-" + monthBefore + "-" + date;
function Sales({ }) {

  let newDate = new Date()
  let date = Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long"
  }).format(Date.parse(newDate))
  let fileName = "Data Penjualan Hiji per " + date;
  const positions = [
    'top-right',
  ]
  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position, setPosition] = useState('top-right')
  const [autohide, setAutohide] = useState(true)
  const [autohideValue, setAutohideValue] = useState(1000)
  const [closeButton, setCloseButton] = useState(true)
  const [fade, setFade] = useState(true)
  const [paidOff, setPaidOff] = useState(false)
  const [isDelivery, setIsDelivery] = useState(false)
  const [payments, setPayments] = useState([])
  const [ dateTo, setDateTo] = useState(datestringNow)
  const [ dateFrom, setDateFrom] = useState(datestringFrom)
  const dateMin = useState(initdateMin)
  const dateMax = useState(datestringNow)
  const [sales, setSales] = useState([])
  const [details, setDetails] = useState([])
  const [products, setProducts] = useState([])
  const [shops, setShops] = useState([])
  const [inputList, setInputList] = useState([{ "product": {}, "productName": "", "qty": 0, "unit_price": 0 }]);
  const [id, setID] = useState("")
  const [don, setDON] = useState("")
  const [date2, setDate2] = useState(new Date())
  const [dod, setDOD] = useState(date2.toISOString().substr(0, 10))
  const [notes, setNotes] = useState("Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan")
  const [sID, setSID] = useState("")
  const [selected, setSelected] = useState({})
  const [sName, setSName] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [idUpdate, setIDUpdate] = useState("")
  const [nameUpdate, setNameUpdate] = useState("")
  const [phoneUpdate, setPhoneUpdate] = useState("")
  const [addressUpdate, setAddressUpdate] = useState("")
  const [large, setLarge] = useState(false)
  const [edit, setEdit] = useState(false)
  let number = 0
  let priceTot = 0;
  let bayar = 0;
  let i = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleSelect = (e) => {
    setSelected(e)
    setSID(e.target.value)
  };

  const handleSelectChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index]['product'] = e.target
    list[index]['productID'] = e.target.value
    list[index]['productName'] = e.target.label;
    list[index]['unit_price'] = e.unit_price;
    list[index]['qty'] = 1;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { "productName": "", "qty": 0, "unit_price": 0 }]);
  };

  let tableData = sales && sales.map(({ id, code, created_at, sName, eName, itemCount, qtySum, total, totQty, totP, tot, paid_off }) => {
    number++
    const data = {
      no: number,
      id: id,
      code: code,
      sName: sName,
      eName: eName,
      received: Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(Date.parse(created_at)),
      itemCount: itemCount,
      qtySum: qtySum,
      total: total,
      pTotal: <NumberFormat value={tot} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
      totQty: totQty,
      totP: totP,
      paid: paid_off === "1" ? "Lunas": "Belum Lunas",
    }
    return data;
  });

  let number3 = 0;
  let dQty = 0;
  let detailTotal = 0;
  let tableDetailData = details && details.map(({ id, qty, pName, unit_price }) => {
    number3++
    dQty += parseInt(qty)
    detailTotal += (qty * unit_price)
    const data = {
      no: number3,
      id: id,
      qty: qty,
      unitPrice: unit_price,
      subtotal: unit_price * qty,
      pName: pName,
      pUnitPrice: <NumberFormat value={unit_price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
      pSubtotal: <NumberFormat value={unit_price * qty} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
    }
    return data;
  });

  function editModal(id) {
    fetchDetails(id)
    setIDUpdate(id)

    setEdit(!edit)

  }
  async function fetchSales(dateTo, dateFrom) {
    const response = await getAll(dateTo, dateFrom)
        if(response['success']===1){
            response['success'] !== '0' || response['sales'][0]['id'] !== null ? setSales(response['sales']) : setSales(null)
        }else{
          setSales([])
        }
      }

  async function fetchDetails(id) {
    const response = await getDetails(id)
    if(response['success']===1){
        setDetails(response['details'])
    }else{
      setDetails([])
    }
  }

  async function fetchProducts() {
    const response = await getProducts()
    setProducts(response)
  }

  async function fetchShops() {
    const response = await getShops()
    setShops(response)
  }

  useEffect(() => {
    fetchSales(dateTo, dateFrom)
    fetchProducts()
    fetchShops()
  }, [])

  async function insert(don, dod, sID, inputList,payments,isDelivery,paidOff,notes,bayar, priceTot) {
    console.log(don, dod, sID, inputList,payments,isDelivery,paidOff,notes,bayar, priceTot)
    const response = await fInsert(don, dod, sID, inputList,payments,isDelivery,paidOff,notes,bayar, priceTot)
    if (response['success'] === 1) {
      let url1 = "http://apis.jopex.id/snippets/prints/invoice.php?id=" + response['salesId']
      window.open(url1, 'sharer1', 'toolbar=0,status=0,width=400,height=600')
      // if (isDelivery === false) {
        let url = "http://apis.jopex.id/snippets/prints/delivery.php?id=" + response['delivId']
        window.open(url, 'sharer', 'toolbar=0,status=0,width=600,height=400')
      // }
      setDON("")
      setDOD(new Date().toISOString().substr(0, 10))
      setSID("")
      setSelected({})
      setInputList([{ "product": {}, "productName": "", "qty": 0, "unit_price": 0 }])
      setPayments([])
      setPaidOff(false)
      setNotes("Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan")
      bayar = 0
      priceTot = 0
      setName("")
      setAddress("")
      setPhone("")
      fetchSales(dateTo, dateFrom)
      setToastM('insert')
      setLarge(!large)
    }else{
      setToastM('failed')
    }
    addToast()
  }
  
  async function deleteCat() {
    const response = await fDelete(idUpdate)
    
    if (response['success'] === 1) {
      fetchSales(dateTo, dateFrom);
      setToastM('deleted')
      setEdit(!edit);
    }else{
      setToastM('failed')
    }
    addToast();
  }

  const handleScan = (data) => {
    let iL = [...inputList]
    let register = false

    products.forEach(product => {
      if (product.sku === data) {
        register = true

        let i = 0;
        let alreadyIn = false
        iL.forEach(element1 => {
          if (product.id === element1.productID) {
            iL[i]['qty'] = iL[i]['qty'] + 1
            alreadyIn = true
          }
          i += 1;
        });

        i = i - 1
        if (alreadyIn === false) {
          if (typeof iL[i]['productID'] !== "undefined") {
            let j = i + 1;
            let add = { "product": {}, "productName": "", "qty": 0, "unit_price": 0 }
            iL[j] = add
            iL[j]['product'] = product
            iL[j]['productID'] = product.id
            iL[j]['productName'] = product.label
            iL[j]['unit_price'] = product.unit_price
            iL[j]['qty'] = iL[j]['qty'] + 1
          }
          if (typeof iL[i]['productID'] === "undefined") {
            iL[i]['product'] = product
            iL[i]['productID'] = product.id
            iL[i]['productName'] = product.label
            iL[i]['unit_price'] = product.unit_price
            iL[i]['qty'] = iL[i]['qty'] + 1
          }
        }

      }
    });

    if (register === true) {
      setInputList(iL)
    } else {
      setTimeout(
        function () {
          alert("Kode Barang Tidak Terdaftar")
        }, 500
      )
    }
  }

  async function changeDateFrom(e) {
    setDateFrom(e)
    fetchSales(dateTo,e)
}

async function changeDateTo(e) {
    setDateTo(e)
    fetchSales(e,dateFrom)
}

  const handleError = (err) => {
    console.error(err)
  }

  const handleTerminInput = (e, i) => {
    let update = [...payments]
    update[i][e.target.name] = e.target.value

    setPayments(update);
  }

  const addArrayTermin = (index) => {

    let add1 = { "id": "new" + index, "amount": 0, "due_date": "" }
    setPayments(oldArray => [...oldArray, add1]);
  }

  const handleRemoveTermin = (e) => {
    setPayments(payments.filter(item => item.id !== e));
  };

  function handleRp(val) {
    let a = <NumberFormat displayType="text" thousandSeparator="." value={val || 0} decimalSeparator="," />
    return a
  }

  return (
    <>
      <AddModal
        large={large}
        setLarge={setLarge}
        handleError={handleError}
        handleScan={handleScan}
        shops={shops}
        selected={selected}
        handleSelect={handleSelect}
        paidOff={paidOff}
        setPaidOff={setPaidOff}
        dod={dod}
        setDOD={setDOD}
        notes={notes}
        inputList={inputList}
        products={products}
        handleSelectChange={handleSelectChange}
        i={i}
        handleInputChange={handleInputChange}
        handleAddClick={handleAddClick}
        handleRp={handleRp}
        edit={edit}
        payments={payments}
        handleRemoveClick={handleRemoveClick}
        handleTerminInput={handleTerminInput}
        addArrayTermin={addArrayTermin}
        insert={insert}
        don={don}
        sID={sID}
        isDelivery={isDelivery}
        
        />
      <UpdateModal
        idUpdate={idUpdate}
        edit={edit}
        setEdit={setEdit}
        tableIcons={tableIcons}
        tableDetailData={tableDetailData}
        number3={number3}
        dQty={dQty}
        deleteCat={deleteCat}
        detailTotal={detailTotal}
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
                  <h4>Penjualan</h4>
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
                      width: '5%',
                    },
                  },
                  { title: 'Kode transaksi', field: 'code' },
                  { title: 'Toko', field: 'sName' },
                  {
                    title: 'Jenis Barang', field: 'totP', cellStyle: {
                      width: '5%',
                    },
                  },
                  {
                    title: 'Jumlah Barang', field: 'totQty', cellStyle: {
                      width: '5%',
                    },
                  },
                  { title: 'Total', field: 'pTotal' },
                  { title: 'Status', 
                    field: 'paid',  
                    lookup: { 'Lunas': 'Lunas', 'Belum Lunas': 'Belum Lunas' 
                  }, 
                  },
                  { title: 'Diinput Oleh', field: 'eName', hidden: JSON.parse(Cookies.get('user')).role_id==='1'?false:true },
                  { title: 'Tanggal Input', field: 'received' },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => editModal(selectedRow.id))}
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

export default Sales
