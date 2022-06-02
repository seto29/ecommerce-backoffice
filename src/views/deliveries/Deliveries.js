import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import Select from 'react-select';
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
import Cookies from 'js-cookie'
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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import axios from '../../axios';
import { element, elementType } from 'prop-types';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

function Goodsreceipts({ }) {
  
  let newDate = new Date()
  let date = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Barang Keluar Hiji per "+date;
  const positions = [
    'top-right',
  ]

  const [toasts, setToasts] = useState([])

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
    const [goodsreceipts, setGoodsreceipts] = useState([])
    const [details, setDetails] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [inputList, setInputList] = useState([{ "product": {} ,"productName": "", "qty": 0 }]);
    const [id, setID] = useState("")
    const [don, setDON] = useState("")
    const [date2, setDate2] = useState(new Date())
    const [dod, setDOD] = useState(date2.toISOString().substr(0,10))
    const [sID, setSID] = useState("")
    const [sName, setSName] = useState("")
    
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [idUpdate, setIDUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")

    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
    const handleSelectChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index]['product'] = e.target
      list[index]['productID'] = e.target.value
      list[index]['productName'] = e.target.label;
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
      setInputList([...inputList, { "productName": "","qty": 0 }]);
    };

    let number = 0
    // SELECT gr.*, s.name AS sName, e.name as eName
    let tableData = goodsreceipts && goodsreceipts.map(({ id, delivery_order_number, delivery_order_date, created_at, sName, eName }) => {
        number++
        const data = {
            no: number,
            id: id,
            don: delivery_order_number,
            sName: sName,
            eName: eName,
            // received: created_at,
            dod: Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(Date.parse(delivery_order_date)),
            received: Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(Date.parse(created_at)),
        }
        return data;
    });
    let number2 = 0
    let exportData = goodsreceipts && goodsreceipts.map(({ id, name, phone, address }) => {
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
  let number3 = 0;
  let tableDetailData = details && details.map(({ id, qty, pName}) => {
    number3++
    const data = {
        no: number3,
        id: id,
        qty: qty, 
        pName: pName,
    }
    return data;
});
    // function deleteModal(id){
    //   setID(id);
    // }
    function editModal(id){
      fetchDetails(id)
      setIDUpdate(id)
  
      setEdit(!edit)

    }
    async function fetchGoodsreceipts() {
      const response = await axios.get('/deliveries/GetAll.php')
      setGoodsreceipts(response['data']['goodsreceipts'])
      return response
  }
  async function fetchDetails(id) {
    const response = await axios.get('/deliveries/GetDetailByID.php?id='+id)
    setDetails(response['data']['details'])
    return response
}
  let list = [];
  async function fetchProducts() {
      const response = await axios.get('/products/GetAll.php')
      let i = 0;
      response['data']['products'].map(value => {
          list[i] = {
              id: value.id, value: value.name, label: value.name, sku: value.sku,
              target: { type: 'select', name: 'list', value: value.id, label: value.name }
          }
          i++;
          return i;
      })
      setProducts(list)
  }
  let list2 = [];
  async function fetchShops() {
      const response = await axios.get('/shops/GetDropdown.php')
      let i = 0;
      response['data']['shops'].map(value => {
          list2[i] = {
              id: value.id, value: value.name, label: value.name+" "+value.address,
              target: { type: 'select', name: 'list', value: value.id, label: value.name+"-"+value.address }
          }
          i++;
          return i;
      })
      setShops(list2)
  }
    useEffect(() => {
        fetchGoodsreceipts()
        fetchProducts()
        fetchShops()
    }, ['/goodsreceipts/deliveries.php'])

    async function insert(){
      let insertData = {
        "don": don,
        "dod": dod,
        "sID": sID,
        "createdBy":JSON.parse(Cookies.get('user')).id,
        "details": JSON.stringify(inputList)
      }
      const response = await axios({
        method: 'post',
        url: '/deliveries/HandleJSON.php',
        data: JSON.stringify(insertData),
        headers: {'Content-Type': 'multipart/form-data' }
        });
        if(response['data']['success'] ===1) {
          let url = "http://apis.jopex.id/snippets/prints/delivery.php?id="+response['data']['id']
          window.open(url, 'sharer', 'toolbar=0,status=0,width=600,height=400')
          setName("")
          setAddress("")
          setPhone("")
          fetchGoodsreceipts()
          setLarge(!large)
          
        }
        return response;
    }
    async function update(){
      var bodyFormData = new FormData()
      bodyFormData.append('id',idUpdate)
      bodyFormData.append('name', nameUpdate)
      bodyFormData.append('address', addressUpdate)
      bodyFormData.append('phone', phoneUpdate)
      const response = await axios({
        method: 'post',
        // url: '/goodsreceipts/Update.php',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        });
        
        if(response['data']['success'] ===1) {
          setNameUpdate("")
          setAddressUpdate("")
          setPhoneUpdate("")
          fetchGoodsreceipts()
          setEdit(!edit)
        }
        return response;
    }
    async function deleteCat(){
      var bodyFormData = new FormData();
      bodyFormData.append('id',idUpdate);
      const response = await axios({
        method: 'post',
        url: '/deliveries/Delete.php',
        data: bodyFormData,
        headers: {'Content-Type' : 'multipart/form-data'}
      });
      
      if(response['data']['success'] === 1){
        fetchGoodsreceipts();
        setEdit(!edit);
        addToast();
      }
      return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const handleScan=(data)=>{
      let iL = [...inputList]
      let register = false
      
      products.forEach(product => {
        if(product.sku===data){
          register=true
          
          let i =0;
          let alreadyIn = false
          iL.forEach(element1 => {
            if(product.id===element1.productID){
              iL[i]['qty']=iL[i]['qty']+1
              alreadyIn=true
            }
            i+=1;
          });

            i=i-1
            if(alreadyIn===false){
              if(typeof iL[i]['productID'] !== "undefined"){
                let j = i+1; 
                let add = { "product": {} ,"productName": "", "qty": 0 }
                iL[j] = add
                iL[j]['product']=product
                iL[j]['productID']=product.id
                iL[j]['productName']=product.label
                iL[j]['qty']=iL[j]['qty']+1
              }
              if(typeof iL[i]['productID'] === "undefined"){
                iL[i]['product']=product
                iL[i]['productID']=product.id
                iL[i]['productName']=product.label
                iL[i]['qty']=iL[i]['qty']+1
              }
          }

          }
      });
      
      if(register===true){
        setInputList(iL)
      }else{
        setTimeout(
          function () {
              alert("Kode Barang Tidak Terdaftar")
          }, 500
      )
      }
    
    }

    const handleError=(err)=>{
      console.error(err)
    }

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    <h4>Barang Keluar</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={tableData} name="Barang Keluar">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="No. Surat Jalan" value="don"/>
                                          <ExcelColumn label="Tgl. Pengiriman" value="dod"/>
                                          <ExcelColumn label="Toko" value="sName"/>
                                          <ExcelColumn label="Dibuat Oleh" value="eName"/>
                                          
                                          <ExcelColumn label="Tanggal Input" value="received"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
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
                    { title: 'No. Surat Jalan', field: 'don' },
                    { title: 'Tanggal Pengiriman', field: 'dod' },
                    { title: 'Toko', field: 'sName' },
                    
                    { title: 'Dibuat Oleh', field: 'eName', hidden: JSON.parse(Cookies.get('user')).role_id==='1'?false:true },
                    { title: 'Tanggal Input', field: 'received' },
                ]}
                data={tableData}
                // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                onRowClick={((evt, selectedRow) => editModal(selectedRow.id))}
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
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Barang Keluar Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <BarcodeReader
                    onError={handleError}
                    onScan={(e)=>handleScan(e)}
                  />
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Toko</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={shops}
                                        placeholder="Pilih toko"
                                        onChange={(e) => setSID(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Pengiriman</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={dod} onChange={(e)=> setDOD(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                        </CForm>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Data Barang</CLabel>
                                </CCol>
                                <CCol xs="9" md="9">

                          {inputList.map((x, i) => {
                            return (
                              <CCol>
                                <CRow>
                                <CCol xs="5" md="5">
                                <Select
                                    name="productName"
                                    options={products}
                                    placeholder="Pilih produk"
                                    value={x.product}
                                    onChange={(e) => handleSelectChange(e, i)}
                                />
                                {/* <CInput
                                  name="productName"
                      placeholder="Enter First Name"
                                  value={x.productName}
                                  onChange={e => handleInputChange(e, i)}
                                /> */}
                                </CCol>
                                <CCol xs="2" md="2">
                                  <CInput
                                  className="ml10"
                                  name="qty"
                                  placeholder="Stok"
                                  type="number"
                                  value={x.qty}
                                  onChange={e => handleInputChange(e, i)}
                                  />
                                </CCol>
                                <CCol xs="1" md="1">
                                  <div className="btn-box">
                                  {inputList.length !== 1 && <CButton
                                    color="danger"
                                    onClick={() => handleRemoveClick(i)}>-</CButton>}
                                  
                                </div>
                                <div style={{height: '1%'}}>&nbsp;</div>
                                </CCol>
                                </CRow>
                                <CCol xs="12" md="9">
                                  {inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                                </CCol>
                              </CCol>
                            );
                          })}
                          </CCol>
                            </CFormGroup>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Batal</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                show={edit}
                onClose={() => setEdit(!edit)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Detail Barang Keluar</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
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
                            { title: 'Produk', field: 'pName' },
                            { title: 'Qty', field: 'qty' },
                        ]}
                        data={tableDetailData}
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
                <CButton color="secondary" ><a href={"http://apis.jopex.id/snippets/prints/delivery.php?id="+idUpdate} target="_blank">Print</a></CButton>
                <CButton color="danger" onClick={() => deleteCat()}>Hapus</CButton>
                    <CButton color="secondary" onClick={() => setEdit(!edit)}>Batal</CButton>
                </CModalFooter>
            </CModal>
            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                  position={toasterKey}
                  key={'toaster' + toasterKey}
                >
                  {
                    toasters[toasterKey].map((toast, key)=>{
                    return(
                      <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                      >
                        <CToastHeader closeButton={toast.closeButton} style={{backgroundColor:'red', color:'black'}} >
                          Berhasil
                        </CToastHeader>
                        <CToastBody>
                          {`Data Berhasil Dihapus`}
                        </CToastBody>
                      </CToast>
                    )
                  })
                  }
                </CToaster>
              ))}
        </>
    )
};

export default Goodsreceipts
