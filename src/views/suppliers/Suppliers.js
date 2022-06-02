import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
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
import CIcon from '@coreui/icons-react';
import {getAll, fDelete, fUpdate, fInsert} from '../../services/Suppliers'
import {GetBySupplierID} from '../../services/Products'
import Download from './Download';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import DetailModal from './DetailModal';
import Toaster from '../components/Toaster'

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

function Suppliers({ }) {
  
  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position, setPosition] = useState('top-right')
  const [autohide, setAutohide] = useState(true)
  const [autohideValue, setAutohideValue] = useState(1000)
  const [closeButton, setCloseButton] = useState(true)
  const [fade, setFade] = useState(true)

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }


  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [idUpdate, setIDUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")
    const [idDetail, setIDDetail] = useState("")
    const [nameDetail, setNameDetail] = useState("")
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [detail, setDetail] = useState(false)
    let number = 0

    let tableData = suppliers && suppliers.map(({ id, name, phone, address }) => {
        number++
        const data = {
            no: number,
            id: id,
            name: name,
            phone: phone,
            address: address,
            button: <CButton block color="primary" onClick={() =>editModal(id, name, address, phone)}>
            <CIcon name="cil-settings" />
        </CButton>
        }
        return data;
    });
    let tableDetailData = products && products.map(({ name, cName }) => {
        number++
        const data = {
            name: name,
            cName: cName,
        }
        return data;
    });
    
    function editModal(id, name, address, phone){
        setIDUpdate(id)
        setNameUpdate(name)
        setAddressUpdate(address)
        setPhoneUpdate(phone)
        
        setEdit(!edit)
    }

    function detailModal(id, name){
        setIDDetail(id)
        setNameDetail(name)
        fetchProducts(id)
        setDetail(true)
    }
    async function fetchSuppliers() {
      const response = await getAll()
      if(response.success===1){
        setSuppliers(response.suppliers)
    }else{
        setSuppliers([])
      }
      return response
  }
    async function fetchProducts(id){
      const response = await GetBySupplierID(id)
      if(response.success===1){
        setProducts(response.supplierproducts)
    }else{
        setProducts([])
    }
      return response
    }
    
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchSuppliers()
    }, [])

    async function insert(){
        const response = await fInsert(name, address, phone)
        if(response.success ===1) {
            setName("")
            setAddress("")
            setPhone("")
            fetchSuppliers()
            setLarge(!large)
            setToastM('insert')
        }else{
            setToastM('failed')   
        }
        addToast()
    }
    async function update(){
        const response = await fUpdate(idUpdate, nameUpdate, addressUpdate, phoneUpdate)
        if(response.success ===1) {
            setNameUpdate("")
            setAddressUpdate("")
            setPhoneUpdate("")
            fetchSuppliers()
            setEdit(!edit)
            setToastM('update')
        }else{
            setToastM('failed')
        }
        addToast()
    }
    async function deleteCat(){
      const response = await fDelete(idUpdate)
        if(response.success === 1){
            fetchSuppliers();
            setEdit(!edit);
            setToastM('delete')
        }else{
            setToastM('failed')
        }
        addToast()
    }
    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                phone={phone}
                setPhone={setPhone}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                setDetail={setDetail}
                idUpdate={idUpdate}
                nameUpdate={nameUpdate}
                setNameUpdate={setNameUpdate}
                addressUpdate={addressUpdate}
                setAddressUpdate={setAddressUpdate}
                phoneUpdate={phoneUpdate}
                setPhoneUpdate={setPhoneUpdate}
                deleteCat={deleteCat}
                update={update}
            />
            <DetailModal
                detail={detail}
                setDetail={setDetail}
                nameDetail={nameDetail}
                tableIcons={tableIcons}
                tableDetailData={tableDetailData}
                setProducts={setProducts}
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
                                    <h4>Supplier</h4>
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
                                    { title: 'Nama', field: 'name' },
                                    { title: 'Alamat', field: 'address' },
                                    { title: 'No. Telepon', field: 'phone' },
                    
                                    { title: 'Aksi', field: 'button', 
                                        cellStyle: {
                                            width: '5%',
                                        },
                                    }
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => detailModal(selectedRow.id, selectedRow.name))}
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

export default Suppliers
