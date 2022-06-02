import React, { useEffect, useState,forwardRef } from 'react'
import MaterialTable from 'material-table';
import Select from 'react-select';
import {Link} from 'react-router-dom'
import 'filepond/dist/filepond.min.css'
import {reCreate} from '../../services/Token'
import {fUpload} from '../../services/FileManager'
import Toaster from '../components/Toaster'
import NumberFormat from 'react-number-format';
import Moment from 'moment';


import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
    CTextarea,
    CFormText,
    CCardFooter,
    CBadge,
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
import {fInsert} from '../../services/Products'
import {getAll} from '../../services/Warranty'
import {getByUserID} from '../../services/Transactions'
import {getDetails, getByID, fUpdatePnt, fUpdateDB} from '../../services/Customers'
import AddPoint from './AddPoint'
import AddDiscountBalance from './AddDiscountBalance'
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
const CustomerDetails = (props) => {
    let today = new Date();
    let dayBefore = new Date(today + 1000 * 60 * 60 * 24 * 30);
    
    let dayBeforeMonth = dayBefore.getMonth()+1 ;
    let dayBeforeYear = dayBefore.getFullYear();
    let dayBeforeDate = dayBefore.getDate();
    let defaultExp = dayBeforeYear+"-"+dayBeforeMonth+"-"+dayBeforeDate;
    const [toastM, setToastM] = useState("")
    const [toasts, setToasts] = useState([])
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [AP, setAP] = useState(false)
    const [AP1, setAP1] = useState(false)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [pnt, setPnt] = useState(0)
    const [desc, setDesc] = useState("")
    const [exp, setExp] = useState(Moment(defaultExp).format('YYYY-MM-DD'))

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }
    let number =0
    let grandTotal = 0
    let tableData = transactionDetails && transactionDetails.map(({ id, name, phone, email, created_at }) => {
        number++
        const data = {
            no: number,
            id: id,
            name: name,
            phone: phone,
            email: email,
            joinDate: created_at,
          
        }
        return data;
      });
    
    // async function insert(bool){
        
    //     setButtonDisable(true)
    //     setButtonTitle("Sedang Di Proses")
    //     await uploadImage().then((urlsTemp)=>{
    //         console.log(urlsTemp)
    //         fInsert(JSON.stringify(urlsTemp), sku, selectedCategory.value, name, description, cogs, price, point, stock, selectedWarranty.value, selectedWeight.value, weight, length, width, height).then(({status})=>{
    //             if(status===200){
    //                 setToastM('insert')
    //                 addToast()
    //                 if(bool===false){
    //                     setFiles([])
    //                     setSKU('')
    //                     setName('')
    //                     setDescription('')
    //                     setCOGS('')
    //                     setPrice('')
    //                     setPoint('')
    //                     setStock('')
    //                     setWeight('')
    //                     setWidth('')
    //                     setLength('')
    //                     setHeight('')
    //                     setSelectedCategory({})
    //                     setSelectedWarranty({})
    //                     setSelectedWeight({})
                        
    //                     setButtonDisable(false)
    //                     setButtonTitle("Simpan")
    //                 }else{
    //                     setTimeout(
    //                         function () {
    //                             props.history.push('/products')
    //                         }, 1000
    //                     )
    //                 }
    //             }else if(status===401){
    //                 reCreate().then(({status})=>{
    //                     if(status===200){
    //                         insert(bool)
    //                     }
    //                   })
    //             }else{
    //                 setToastM('failed')
    //                 addToast()
    //                 setButtonDisable(false)
    //                 setButtonTitle("Simpan")
    //             }
    //         })
    //     })
    // }

  
    async function updatePnt() {
        await fUpdatePnt(props.match.params.id, pnt).then(({ status }) => {
            if (status === 401) {
                reCreate().then(({ status }) => {
                    if (status === 200) {
                        updatePnt()
                    }
                })
            }

            if (status === 200) {
                setPnt(0)
                setToastM("update")
                
        fetchUserDetail(props.match.params.id)
        fetchTransactionDetails(props.match.params.id)
                setAP(false)
            } else {
                setToastM("failed")
            }
            addToast()
        })
    }

    async function updateDB() {
        await fUpdateDB(props.match.params.id, pnt, desc, exp).then(({ status }) => {
            if (status === 401) {
                reCreate().then(({ status }) => {
                    if (status === 200) {
                        updateDB()
                    }
                })
            }

            if (status === 200) {
                setPnt(0)
                setDesc("")
                setExp(Moment(defaultExp).format('YYYY-MM-DD'))
                setToastM("update")
                
        fetchUserDetail(props.match.params.id)
        fetchTransactionDetails(props.match.params.id)
                setAP1(false)
            } else {
                setToastM("failed")
            }
            addToast()
        })
    }

    async function fetchUserDetail(id) {
        await getByID(id).then(({status, customerDetail})=>{
            if(status===401){
              reCreate().then(({status})=>{
                if(status===200){
                    fetchUserDetail()
                }
              })
            }
            if(status===200){
                setUserDetail(customerDetail[0])
            }
        })
    }
    async function fetchTransactionDetails(id) {
        await getByUserID(id).then(({status, transaction})=>{
            if(status===401){
              reCreate().then(({status})=>{
                if(status===200){
                    fetchTransactionDetails()
                }
              })
            }
            if(status===200){
                setTransactionDetails(transaction)
            }
        })
    }
  

    useEffect(() => {
        fetchUserDetail(props.match.params.id)
        fetchTransactionDetails(props.match.params.id)
    }, [props.match.params.id])


    // async function insert(bool){
    //     let skuRegistered = false
    //     products.forEach(element => {
    //         if(sku===element.sku){
    //             skuRegistered = true
    //         }
    //     });

    //     if(skuRegistered===false){
    //         const response = await fInsert(name, sku, cID, cogs, price, stock)
    //         if(response.success ===1) {
    //             setSKU("")
    //             setName("")
    //             setCID("")
    //             setCOGS("")
    //             setPrice("")
    //             setStock("")
    //             setCName("")
    //             setToastM("insert")
    //         }else{
    //             setToastM("failed")
    //         }
    //         addToast()
    //     }else{
    //         alert("SKU SUDAH TERDAFTAR")
    //     }
    // }


    return (
       <>
       <AddPoint
            AP={AP}
            setAP={setAP}
            pnt={pnt}
            setPnt={setPnt}
            updatePnt={updatePnt}

            />
       <AddDiscountBalance
            AP1={AP1}
            setAP1={setAP1}
            pnt={pnt}
            setPnt={setPnt}
            desc={desc}
            setDesc={setDesc}
            exp={exp}
            setExp={setExp}
            updateDB={updateDB}

            />
       <Toaster
            toaster={toasts}
            toastM={toastM}
        />
        <CCard>
            <CCardHeader>
            <CRow>
                <CCol>
                    <h5>Detail Pelanggan</h5>
                </CCol>
                <CCol>
                    <Link to="/customers"><a href="">Kembali ke daftar pelanggan</a></Link>
                </CCol>
            </CRow>    
            </CCardHeader>
            <CCardBody>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Nama</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {userDetail.name}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">No. HP</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {userDetail.phone}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {userDetail.email}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Tanggal Bergabung</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {userDetail.created_at}
                    {/* {Intl.DateTimeFormat("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        }).format(Date.parse(userDetail.created_at))} */}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Saldo Diskon</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <NumberFormat value={userDetail.discount_balance} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                        
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Poin</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {userDetail.point}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Jumlah Transaksi</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        {transactionDetails.length}
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="name">Nominal Transaksi</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        { transactionDetails.map((value, index)=>{
                            grandTotal+=Number(value.total)
                            
                        })
                    }
                    <NumberFormat value={grandTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                    </CCol>
                </CFormGroup>
            </CCardBody>
            <CCardFooter>
                <CButton color="primary" onClick={() => setAP(true)}>Tambah Poin</CButton>{' '}
                <CButton color="primary"  onClick={() => setAP1(true)}>Tambah Saldo Diskon</CButton>{' '}
            </CCardFooter>
        </CCard>
       {/* <CCard>
            <CCardHeader>
                <h5>Daftar Transaksi</h5>
            </CCardHeader>
            <CCardBody>
            <MaterialTableW
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
                                { title: 'No. HP', field: 'phone' },
                                { title: 'Email', field: 'email'},
                                { title: 'Tanggal Gabung', field: 'joinDate'},
                         
                            ]}
                            data={tableData}
                            
                            // onRowClick={((evt, selectedRow) => details(selectedRow.id))}
                            options={{
                                rowStyle: rowData => ({
                                    backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
                                }),
                                filtering: true
                            }}
                          />
            </CCardBody>
            <CCardFooter>
               as
            </CCardFooter>
        </CCard>
         */}
        </>
    )
};

export default CustomerDetails
