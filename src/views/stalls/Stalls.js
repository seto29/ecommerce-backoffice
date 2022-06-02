import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import Select from 'react-select';
import ReactExport from "react-data-export";
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

import axios from '../../axios';

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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
function Stalls({ }) {
    let newDate = new Date()
    let date2 = Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long"
            }).format(Date.parse(newDate))
    let fileName = "Data Kios APJ per "+date2;

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


    const toasters = (() => {
        return toasts.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    })()
    const [stalls, setStalls] = useState([]);
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    //get dropdown utama
    const [customers, setCustomers] = useState("");
    const [areas, setAreas] = useState("");
    const [electricities, setElectricities] = useState("");
    const [categories, setCategories] = useState("");

// buat dropdown
    const [customerIDInsert, setCustomerIDInsert] = useState("");
    const [customerIDUpdate, setCustomerIDUpdate] = useState("");
    const [areaIDInsert, setAreaIDInsert] = useState("");
    const [areaIDUpdate, setAreaIDUpdate] = useState("");
    const [electricitiesIDInsert, setElectricitiesIDInsert] = useState("");
    const [electricitiesIDUpdate, setElectricitiesIDUpdate] = useState("");
    const [categoryIDInsert, setCategoryIDInsert] = useState("");
    const [categoryIDUpdate, setCategoryIDUpdate] = useState("");

    // buat form
    const[nameInsert, setNameInsert] = useState("");
    const[lengthInsert, setLengthInsert] = useState("");
    const[widthInsert, setWidthInsert] = useState("");
    const[heightInsert, setHeightInsert] = useState("");
    const[statusInsert, setStatusInsert] = useState("");

    const[nameUpdate, setNameUpdate] = useState("");
    const[lengthUpdate, setLengthUpdate] = useState("");
    const[widthUpdate, setWidthUpdate] = useState("");
    const[heightUpdate, setHeightUpdate] = useState("");
    const[statusUpdate, setStatusUpdate] = useState("");

    //semua value
    const[length, setLength] = useState("");
    const[width, setWidth] = useState("");
    const[height, setHeight] = useState("");
    const[status, setStatus] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [areaID, setAreaID] = useState("");
    const [electricitiesID, setElectricitiesID] = useState("");
    const [categoryID, setCategoryID] = useState("");

    //buat name dropdown
    const [customerName, setCustomerName] = useState("");
    const [areaName, setAreaName] = useState("");
    const [electricitiesName, setElectricitiesName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    // status
    const statusOptions = [
        { value: 'Aktif', label: 'Aktif' },
        { value: 'Tidak Aktif', label: 'Tidak Aktif' },
      ]



    let number = 0
    let tableData = stalls && stalls.map(({ id, user_id, area_id, category_id, electricity_id, name, length, width, height, status, user, area, category, electricity, fName, aNo }) => {
        number++
        const data = {
            no: number,
            id: id,
            userID: user_id,
            areaID: area_id,
            categoryID: category_id,
            electricityID: electricity_id,
            name: name,
            length: length,
            width: width,
            height: height,
            status: status,
            user: user,
            area: fName+" Blok "+area + " No. " + aNo,
            category: category,
            electricity: electricity,
        }
        return data;
    });
    let number2 = 0
    let exportData = stalls && stalls.map(({ id, user_id, area_id, category_id, electricity_id, name, length, width, height, status, user, area, category, electricity, fName, aNo }) => {
      number2++
      const data = {
        no: number2,
        userID: user_id,
        areaID: area_id,
        categoryID: category_id,
        electricityID: electricity_id,
        name: name,
        length: length,
        width: width,
        height: height,
        status: status,
        user: user,
        area: fName+" Blok "+area + " No. " + aNo,
        category: category,
        electricity: electricity,
      }
      return data;
  });

    function editModal(id, customerID, user, areaID, area, electricitiesID, electricity, categoryID, category, name, length, width, height, status, edit) {
        setID(id);
        setCustomerIDUpdate(customerID);
        setCustomerName(user);
        setAreaIDUpdate(areaID);
        setAreaName(area);
        setElectricitiesIDUpdate(electricitiesID);
        setElectricitiesName(electricity);
        setCategoryIDUpdate(categoryID);
        setCategoryName(category);
        setNameUpdate(name);
        setLengthUpdate(length);
        setWidthUpdate(width);
        setHeightUpdate(height);
        setStatusUpdate(status);
        setEdit(!edit);
    }
    let list = [];
    async function fetchStalls() {
        const response = await axios.get('/stalls/GetAll.php')
        setStalls(response['data']['stalls'])
        return response
    }
    let list2 = [];
    async function fetchCustomers() {
        const response = await axios.get('/users/GetDropdown.php')
        let i = 0;
        response['data']['users'].map(value => {
            list2[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setCustomers(list2)
    }
    let list3 = [];
    async function fetchAreas() {
        const response = await axios.get('/areas/GetDropdown.php')
        let i = 0;
        response['data']['areas'].map(value => {
            list3[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setAreas(list3)
    }
    let list4 = [];
    async function fetchElectricities() {
        const response = await axios.get('/electricities/GetDropdown.php')
        let i = 0;
        response['data']['electricities'].map(value => {
            list4[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setElectricities(list4)
    }
    let list5 = [];
    async function fetchCategories() {
        const response = await axios.get('/categories/GetDropdown.php')
        let i = 0;
        response['data']['categories'].map(value => {
            list5[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setCategories(list5)
    }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchStalls()
    }, ['/stalls/GetAll.php'])
    async function insert() {
        var bodyFormData = new FormData();
        var lengthInsert2 = lengthInsert.replace(/\,/g,'.');
        var widthInsert2 = widthInsert.replace(/\,/g,'.');
        var heightInsert2 = heightInsert.replace(/\,/g,'.');        
        bodyFormData.append('ownerID', customerIDInsert);
        bodyFormData.append('areaID', areaIDInsert);
        bodyFormData.append('electricityID', electricitiesIDInsert);
        bodyFormData.append('categoryID', categoryIDInsert);
        bodyFormData.append('name', nameInsert);
        bodyFormData.append('length', lengthInsert2);
        bodyFormData.append('width', widthInsert2);
        bodyFormData.append('height', heightInsert2);
        bodyFormData.append('status', statusInsert);
        const response = await axios({
            method: 'post',
            url: '/stalls/Insert.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setCustomerIDInsert("");
            setAreaIDInsert("");
            setElectricitiesIDInsert("");
            setCategoryIDInsert("");
            setNameInsert("");
            setLengthInsert("");
            setWidthInsert("");
            setHeightInsert("");
            setStatusInsert("");
            fetchStalls();
            setLarge(!large);
        }
        return response;
    }
    async function update() {
        var bodyFormData = new FormData();
        var lengthUpdate2 = lengthUpdate.replace(/\,/g,'.');
        var widthUpdate2 = widthUpdate.replace(/\,/g,'.');
        var heightUpdate2 = heightUpdate.replace(/\,/g,'.');    
        bodyFormData.append('id', id);    
        bodyFormData.append('ownerID', customerIDUpdate);
        bodyFormData.append('areaID', areaIDUpdate);
        bodyFormData.append('electricityID', electricitiesIDUpdate);
        bodyFormData.append('categoryID', categoryIDUpdate);
        bodyFormData.append('name', nameUpdate);
        bodyFormData.append('length', lengthUpdate2);
        bodyFormData.append('width', widthUpdate2);
        bodyFormData.append('height', heightUpdate2);
        bodyFormData.append('status', statusUpdate);
        const response = await axios({
            method: 'post',
            url: '/stalls/Update.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            setName("");
            setPhone("");
            setUsername("");
            setEmail("");
            setID("");
            fetchStalls();
            setEdit(!edit);
        }
        return response;
    }
    async function deleteStalls() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        const response = await axios({
            method: 'post',
            url: '/stalls/Delete.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            fetchStalls();
            setEdit(!edit);
            addToast();
        }
        return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    function insertModal() {
        fetchElectricities();
        fetchCustomers();
        fetchAreas();
        fetchCategories();
        setLarge(!large);
    }
    function updateElectricityID(e) {
        setElectricitiesName(e.target.label);
        setElectricitiesIDUpdate(e.target.value);
    }
    function updateCustomerID(e) {
        setCustomerName(e.target.label);
        setCustomerIDUpdate(e.target.value);
    }
    function updateAreaID(e) {
        setAreaName(e.target.label);
        setAreaIDUpdate(e.target.value);
    }
    function updateCategoryID(e) {
        setCategoryName(e.target.label);
        setCategoryIDUpdate(e.target.value);
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    <h4>Data Kios</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Kios">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Pemilik" value="user"/>
                                          <ExcelColumn label="Kategori" value="category"/>
                                          <ExcelColumn label="Nama Kios" value="name"/>
                                          <ExcelColumn label="Panjang (m)" value="length"/>
                                          <ExcelColumn label="Lebar (m)" value="width"/>
                                          <ExcelColumn label="Tinggi (m)" value="height"/>
                                          <ExcelColumn label="Status" value="status"/>
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
                                            width: '5%',
                                        },
                                    },
                                    { title: 'Pemilik', field: 'user' },
                                    { title: 'Blok', field: 'area' },
                                    { title: 'Kategori', field: 'category' },
                                    { title: 'Nama Kios', field: 'name' },
                                    {
                                        title: 'Panjang (M)', field: 'length', cellStyle: {
                                            width: '5%',
                                        },
                                    },
                                    {
                                        title: 'Lebar (M)', field: 'width', cellStyle: {
                                            width: '5%',
                                        },
                                    },
                                    {
                                        title: 'Tinggi (M)', field: 'height', cellStyle: {
                                            width: '5%',
                                        },
                                    },
                                    {
                                        title: 'Status',
                                        field: 'status',
                                        lookup: { 'Aktif': 'Aktif', 'Tidak Aktif': 'Tidak Aktif' },
                                        cellStyle: {
                                            width: '5%',
                                        }
                                    },

                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.customerID, selectedRow.user, selectedRow.areaID, selectedRow.area, selectedRow.electricitiesID, selectedRow.electricity, selectedRow.categoryID, selectedRow.category, selectedRow.name, selectedRow.length, selectedRow.width, selectedRow.height, selectedRow.status, edit))}
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
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Kios Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Pemilik</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={customers}
                                        placeholder="Pilih pemilik"
                                        onChange={(e) => setCustomerIDInsert(e.target.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={areas}
                                        placeholder="Pilih blok"
                                        onChange={(e) => setAreaIDInsert(e.target.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode Meteran Listrik</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={electricities}
                                        placeholder="Pilih meteran listrik"
                                        onChange={(e) => setElectricitiesIDInsert(e.target.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={categories}
                                        placeholder="Pilih kategori"
                                        onChange={(e) => setCategoryIDInsert(e.target.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Kios</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Amanah Jaya" value={nameInsert} onChange={(e) => setNameInsert(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Panjang (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={lengthInsert} onChange={(e) => setLengthInsert(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Lebar (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={widthInsert} onChange={(e) => setWidthInsert(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tinggi (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={heightInsert} onChange={(e) => setHeightInsert(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Status</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={statusOptions}
                                        placeholder="Pilih Status"
                                        onChange={(e) => setStatusInsert(e.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                        </CForm>
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
                    <CModalTitle>Ubah Kios</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Pemilik</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="hidden" value={id} />
                                    <Select
                                        options={customers}
                                        placeholder="Pilih pemilik"
                                        value={{ label: customerName, value: customerIDUpdate }}
                                        onChange={(e) => updateCustomerID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={areas}
                                        placeholder="Pilih blok"
                                        value={{ label: areaName, value: areaIDUpdate }}
                                        onChange={(e) => updateAreaID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode Meteran Listrik</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={electricities}
                                        placeholder="Pilih meteran listrik"
                                        value={{ label: electricitiesName, value: electricitiesIDUpdate }}
                                        onChange={(e) => updateElectricityID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={categories}
                                        placeholder="Pilih kategori"
                                        value={{ label: categoryName, value: categoryIDUpdate }}
                                        onChange={(e) => updateCategoryID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Kios</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Amanah Jaya" value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Panjang (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={lengthUpdate} onChange={(e) => setLengthUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Lebar (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={widthUpdate} onChange={(e) => setWidthUpdate(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tinggi (m)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" step="0.01" placeholder="e.g. : 2" value={heightUpdate} onChange={(e) => setHeightUpdate(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Status</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={statusOptions}
                                        placeholder="Pilih Status"
                                        value={{ label: statusUpdate, value: statusUpdate }}
                                        onChange={(e) => setStatusUpdate(e.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => deleteStalls()}>Hapus</CButton>
                    <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setEdit(!edit)}>Batal</CButton>
                </CModalFooter>
            </CModal>
            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                    position={toasterKey}
                    key={'toaster' + toasterKey}
                >
                    {
                        toasters[toasterKey].map((toast, key) => {
                            return (
                                <CToast
                                    key={'toast' + key}
                                    show={true}
                                    autohide={toast.autohide}
                                    fade={toast.fade}
                                >
                                    <CToastHeader closeButton={toast.closeButton} style={{ backgroundColor: 'red', color: 'black' }} >
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

export default Stalls
