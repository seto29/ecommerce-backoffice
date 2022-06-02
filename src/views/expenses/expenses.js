import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import Cookies from 'js-cookie'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CLabel,
    CInput,
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
import Toaster from '../components/Toaster'
import Download from './Download';
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import { getAll,getCategories, fUpdate, fInsert, fDelete } from 'src/services/Expenses';

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

function Expenses({ }) {
    const [toasts, setToasts] = useState([])
    const [toastM, setToastM] = useState("")
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [date2, setDate2] = useState(new Date())
    const [date3, setDate3] = useState(date2.toISOString().substr(0,10))
    const [date3Update, setDate3Update] = useState(date2.toISOString().substr(0,10))
    const [description, setDescription] = useState("")
    const [categoryID, setCategoryID] = useState("")
    const [nominal, setNominal] = useState("")
    const userID = JSON.parse(Cookies.get('user')).id
    const [idUpdate, setIDUpdate] = useState("")
    const [descriptionUpdate, setDescriptionUpdate] = useState("")
    const [categoryIDUpdate, setCategoryIDUpdate] = useState("")
    const [categoryNameUpdate, setCategoryNameUpdate] = useState("")
    const [nominalUpdate, setNominalUpdate] = useState("")
    const [ dateTo, setDateTo] = useState(datestringNow)
    const [ dateFrom, setDateFrom] = useState(datestringFrom)
    const dateMin = useState(initdateMin)
    const dateMax = useState(datestringNow)

    const addToast = () => {
        setToasts([
            ...toasts,
            { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let number = 0
    let tableData = expenses && expenses.map(({ id, delivery_id, good_receipt_id, sales_id, created_by, eName, category_id, description, credit, date, cName }) => {
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
            nominal: credit,
            fNominal: <NumberFormat value={credit} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
            eName: eName,
            cName: cName,
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

    async function fetchExpenses(dateTo, dateFrom) {
        const response = await getAll(dateTo, dateFrom)
        if(response['success']===1){
            response['expenses'][0]['id'] !== null ? setExpenses(response['expenses']) : setExpenses(null)
        }else{
            setExpenses([])
        }
    }

    async function fetchCategories() {
        const response = await getCategories()
        setCategories(response)
    }
    
    useEffect(() => {
        fetchExpenses(dateTo, dateFrom)
        fetchCategories()
    }, [])

    async function insert() {
        const response = await fInsert(categoryID, date3, description, nominal,userID );
        if (response['success'] === 1) {
            setCategoryID("")
            setDate3(date2.toISOString().substr(0,10))
            setDescription("")
            setNominal("")
            fetchExpenses(dateTo, dateFrom)
            setToastM("insert")
            setLarge(false);
        }else{
            setToastM("failed")
        }
        addToast()
    }
    async function update() {
        const response = await fUpdate(idUpdate, categoryIDUpdate, date3Update, descriptionUpdate,nominalUpdate,userID);
        
        if (response['success'] === 1) {
            setCategoryIDUpdate("")
            setDate3Update(date2.toISOString().substr(0,10))
            setDescriptionUpdate("")
            setNominalUpdate("")
            fetchExpenses(dateTo, dateFrom)
            setToastM("update")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast()
    }

    async function deleteCat() {
        const response = await fDelete(idUpdate);
        if (response['success'] === 1) {
            fetchExpenses(dateTo, dateFrom);
            setToastM("delete")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast()
    }

    async function changeDateFrom(e) {
        setDateFrom(e)
        fetchExpenses(dateTo,e)
    }

    async function changeDateTo(e) {
        setDateTo(e)
        fetchExpenses(e,dateFrom)
    }
    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                categories={categories}
                setCategoryID={setCategoryID}
                date3={date3}
                setDate3={setDate3}
                description={description}
                setDescription={setDescription}
                nominal={nominal}
                setNominal={setNominal}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                idUpdate={idUpdate}
                categoryNameUpdate={categoryNameUpdate}
                categoryIDUpdate={categoryIDUpdate}
                setCategoryIDUpdate={setCategoryIDUpdate}
                date3Update={date3Update}
                setDate3Update={setDate3Update}
                descriptionUpdate={descriptionUpdate}
                setDescriptionUpdate={setDescriptionUpdate}
                nominalUpdate={nominalUpdate}
                setNominalUpdate={setNominalUpdate}
                deleteCat={deleteCat}
                update={update}
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
                                    <h4>Pengeluaran</h4>
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
                                    { title: 'Tanggal', field: 'incomeDate' },
                                    { title: 'Kategori', field: 'cName' },
                                    { title: 'Keterangan', field: 'description' },
                                    { title: 'Jumlah', field: 'fNominal' },
                                    { title: 'Diinput Oleh', field: 'eName', hidden: JSON.parse(Cookies.get('user')).role_id==='1'?false:true },
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
        </>
    )
};

export default Expenses
