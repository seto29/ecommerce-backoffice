import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import ReactExport from "react-data-export";
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
    CFormText,
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import axios from '../../axios';
import { Description } from '@material-ui/icons';
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

function Incomes({ }) {

    let newDate = new Date()
    let date = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long"
    }).format(Date.parse(newDate))
    let fileName = "Data Pemasukan Hiji per " + date;
    const positions = [
        'top-right',
    ]
    const [toasts, setToasts] = useState([])
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)

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
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")

    const [id, setID] = useState("")
    const [date2, setDate2] = useState(new Date())
    const [date3, setDate3] = useState(new Date().toISOString().substr(0,10))
    const [date3Update, setDate3Update] = useState(new Date().toISOString().substr(0,10))
    
    const [description, setDescription] = useState("")
    const [categoryID, setCategoryID] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [nominal, setNominal] = useState("")
    const userID = JSON.parse(Cookies.get('user')).id
    const [idUpdate, setIDUpdate] = useState("")
    const [date2Update, setDate2Update] = useState("")
    const [descriptionUpdate, setDescriptionUpdate] = useState("")
    const [categoryIDUpdate, setCategoryIDUpdate] = useState("")
    const [categoryNameUpdate, setCategoryNameUpdate] = useState("")
    const [nominalUpdate, setNominalUpdate] = useState("")

    let number = 0
    let tableData = incomes && incomes.map(({ id, delivery_id, good_receipt_id, sales_id, created_by, eName, category_id, description, debit, date, cName }) => {
        number++
        const data = {
            no: number,
            id:id,
            cID:category_id,
            incomeDate: Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric"
            }).format(Date.parse(date)),
            rawDate : date,
            description: description,
            nominal: debit,
            fNominal: <NumberFormat value={debit} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
            eName: eName,
            cName: cName,
        }
        return data;
    });
    let number2 = 0
    let exportData = incomes && incomes.map(({ id, name, phone, address }) => {
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
    function editModal(id, rawDate, categoryName, cID, description, nominal) {
        setIDUpdate(id)
        setDescriptionUpdate(description)
        setDate3Update(rawDate)
        setCategoryIDUpdate(cID)
        setCategoryNameUpdate(categoryName)
        setNominalUpdate(nominal)
        setEdit(!edit)

    }
    async function fetchIncomes() {
        const response = await axios.get('/incomes/GetAll.php')
        response['data']['success'] !== 0 ? setIncomes(response['data']['incomes']) : setIncomes([])
        return response
    }
    let list2 = [];
    async function fetchCategories() {
        const response = await axios.get('/incomes/GetCategories.php')
        let i = 0;
        response['data']['categories'].map(value => {
            list2[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setCategories(list2)
    }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchIncomes()
        fetchCategories()
    }, ['/incomes/GetAll.php'])

    async function insert() {
        var bodyFormData = new FormData()
        bodyFormData.append('cID', categoryID)
        bodyFormData.append('tgl', date3)
        bodyFormData.append('description', description)
        bodyFormData.append('debit', nominal)
        bodyFormData.append('cBy', userID)
        const response = await axios({
            method: 'post',
            url: '/incomes/Insert.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setCategoryID("")
            setDate2("")
            setDescription("")
            setNominal("")
            fetchIncomes()
            setLarge(!large)
        }
        return response;
    }
    async function update() {
        var bodyFormData = new FormData()
        bodyFormData.append('id', idUpdate)
        bodyFormData.append('cID', categoryIDUpdate)
        bodyFormData.append('tgl', date3Update)
        bodyFormData.append('description', descriptionUpdate)
        bodyFormData.append('debit', nominalUpdate)
        bodyFormData.append('cBy', userID)
        const response = await axios({
            method: 'post',
            url: '/incomes/Update.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            setCategoryIDUpdate("")
            setDate3Update("")
            setDescriptionUpdate("")
            setNominalUpdate("")
            fetchIncomes()
            setEdit(!edit)
        }
        return response;
    }
    async function deleteCat() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', idUpdate);
        const response = await axios({
            method: 'post',
            url: '/incomes/Delete.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            fetchIncomes();
            setEdit(!edit);
            addToast();
        }
        return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    <h4>Pemasukan</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                        <ExcelSheet data={exportData} name="Pemasukan">
                                            <ExcelColumn label="No." value="no" />
                                            <ExcelColumn label="Nama" value="name" />
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
                                    { title: 'Tanggal', field: 'incomeDate' },
                                    { title: 'Kategori', field: 'cName' },
                                    { title: 'Keterangan', field: 'description' },
                                    { title: 'Jumlah', field: 'fNominal' },
                                    { title: 'Diinput Oleh', field: 'eName' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.rawDate, selectedRow.cName, selectedRow.cID, selectedRow.description, selectedRow.nominal))}
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
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pemasukan Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={categories}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => setCategoryID(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={date3} onChange={(e) => setDate3(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Keterangan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nominal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={nominal} onChange={(e) => setNominal(e.target.value)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>.00</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
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
                    <CModalTitle>Ubah Pemasukan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="hidden" value={idUpdate} />
                                    <Select
                                        options={categories}
                                        placeholder="Pilih Kategori"
                                        value={{ label: categoryNameUpdate, value: categoryIDUpdate }}
                                        onChange={(e) => setCategoryIDUpdate(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={date3Update} onChange={(e) => setDate3Update(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Keterangan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={descriptionUpdate} onChange={(e) => setDescriptionUpdate(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nominal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={nominalUpdate} onChange={(e) => setNominalUpdate(e.target.value)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>.00</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => deleteCat()}>Hapus</CButton>
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

export default Incomes
