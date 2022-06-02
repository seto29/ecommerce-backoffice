import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import MuiTableCell from '@material-ui/core/TableCell';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CImg
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
import BarcodeReader from 'react-barcode-reader'
import Toaster from '../components/Toaster'
import { fDelete, fUpdate, fInsert} from '../../services/Products'
import {getAll} from '../../services/Discussions'
import {getDropdown} from '../../services/Categories'

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
const TableCell = withStyles(theme => ({
    root: {
      height: 10,
      padding:0
    }
  }))(MuiTableCell);
const Products = () => {
  const history = useHistory()
  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sku, setSKU] = useState("")
  const [idUpdate, setIDUpdate] = useState("")
  const [nameUpdate, setNameUpdate] = useState("")
  const [cIDUpdate, setCIDUpdate] = useState("")
  const [cNameUpdate, setCNameUpdate] = useState("")
  const [cogsUpdate, setCOGSUpdate] = useState("")
  const [priceUpdate, setPriceUpdate] = useState("")
  const [stockUpdate, setStockUpdate] = useState("")
  const [skuUpdate, setSKUUpdate] = useState("")
  const [large, setLarge] = useState(false)
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)

  let number = 0

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let tableData = products && products.map(({ id,product_name, user_name, content }) => {
        number++
        const data = {
            no: number,
            id: id,
            product_name: product_name,
            user_name: user_name,
            content: content,
        }
        return data;
    });
  
    function editModal(id, sku, cID, cName, name, cogs, price, stock){
      setIDUpdate(id)
      setSKUUpdate(sku)
      setCIDUpdate(cID)
      setCNameUpdate(cName)
      setNameUpdate(name)
      setCOGSUpdate(cogs)
      setPriceUpdate(price)
      setStockUpdate(stock)
  
      setEdit(!edit);

    }

    function updateCID(e) {
      setCNameUpdate(e.target.label);
      setCIDUpdate(e.target.value);
    }

    async function fetchProducts() {
      const response = await getAll()
      if(response.success===1){
        setProducts(response.discussions)
      }
    }
    
    async function fetchCategories() {
        const response = await getDropdown()
        setCategories(response)
    }

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])



    async function update(){
        let skuRegistered = false
        products.forEach(element => {
            if(sku===element.sku && idUpdate!==element.id){
                skuRegistered = true
            }
        });
        if(skuRegistered===false){
            var bodyFormData = new FormData();
            bodyFormData.append('id',idUpdate);
            bodyFormData.append('sku', skuUpdate)
            bodyFormData.append('cID', cIDUpdate)
            bodyFormData.append('name', nameUpdate)
            bodyFormData.append('cogs', cogsUpdate)
            bodyFormData.append('price', priceUpdate)
            bodyFormData.append('stock', stockUpdate)
            const response = await fUpdate(idUpdate, nameUpdate, skuUpdate, cIDUpdate, cogsUpdate, priceUpdate, stockUpdate)
            if(response.success ===1) {
                setIDUpdate("")
                setNameUpdate("")
                setCIDUpdate("")
                setCOGSUpdate("")
                setPriceUpdate("")
                setStockUpdate("")
                fetchProducts();
                setToastM("update")
                setEdit(false);
            }else{
                setToastM("failed")
            }
            addToast()
        }else{
            alert("SKU SUDAH TERDAFTAR")
        }
    }
    function add(){
        history.push('/add-product');
    }
    function edita(id){
        history.push('/reply-product-discussions/'+id);
    }
    async function deleteCat(){
        const response = await fDelete(idUpdate)
        if(response.success === 1){
            fetchProducts();
            setToastM("delete")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast();
    }

    const handleError=(err)=>{
        console.error(err)
    }

    const handleScan=(data)=>{
        setSKUUpdate(data)
    }

    return (
        <>
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
                                    <h4>Diskusi Produk</h4>
                                    
                                    <BarcodeReader
                                        onError={handleError}
                                        onScan={(e)=>handleScan(e)}
                                    />
                                </CCol>
                                {/* <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => add()} className="mr-1">Tambah Data</CButton>
                                </CCol> */}
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
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
                                    { title: 'Nama Product', field: 'product_name' },
                                    { title: 'Nama Pengguna', field: 'user_name' },
                                    { title: 'Diskusi', field: 'content' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => edita(selectedRow.id) )}
                                options={{
                                    rowStyle: rowData => ({
                                        backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
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

export default Products
