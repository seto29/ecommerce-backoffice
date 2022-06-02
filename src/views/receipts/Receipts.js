import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
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
function Receipts({ }) {

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
    const [employees, setEmployees] = useState([]);
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [roleID, setRoleID] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState("");
    const [roleIDUpdate, setRoleIDUpdate] = useState("");
    const [roleNameUpdate, setRoleNameUpdate] = useState("");
    const [roleIDInsert, setRoleIDInsert] = useState("");
    const [password, setPassword] = useState("");


    let number = 0
    let tableData = employees && employees.map(({ id, username, name, phone, email, rName, role_id }) => {
        number++
        const data = {
            no: number,
            id: id,
            username: username,
            name: name,
            phone: phone,
            email: email,
            roleName: rName,
            roleID: role_id,
        }
        return data;
    });
    // function deleteModal(id){
    //   setID(id);
    // }edit, selectedRow.id, selectedRow.phone, selectedRow.name, selectedRow.username, selectedRow.email
    function editModal(edit, id, phone, name, username, email, roleName, roleID) {
        fetchRoles();
        setID(id);
        setPhone(phone);
        setName(name);
        setUsername(username);
        setEmail(email);
        setRoleNameUpdate(roleName);
        setRoleIDUpdate(roleID);
        setEdit(!edit);
    }
    let list = [];
    async function fetchEmployees() {
        const response = await axios.get('/employees/GetAll.php')
        setEmployees(response['data']['employees'])
        return response
    }
    async function fetchRoles() {
        const response = await axios.get('roles/GetAll.php')
        let i = 0;
        response['data']['roles'].map(value => {
            list[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setRoles(list)
    }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchEmployees()
    }, ['/employees/GetAll.php'])

    async function insert() {
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('name', name);
        bodyFormData.append('phone', phone);
        bodyFormData.append('email', email);
        bodyFormData.append('roleID', roleIDInsert);
        bodyFormData.append('password', password);
        const response = await axios({
            method: 'post',
            url: '/employees/Insert.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setUsername("");
            setName("");
            setPhone("");
            setEmail("");
            setRoleIDInsert("");
            setPassword("");
            fetchEmployees();
            setLarge(!large);
        }
        return response;
    }
    async function update() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('username', username);
        bodyFormData.append('name', name);
        bodyFormData.append('phone', phone);
        bodyFormData.append('email', email);
        bodyFormData.append('roleID', roleIDUpdate);
        const response = await axios({
            method: 'post',
            url: '/employees/Update.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            setName("");
            setPhone("");
            setUsername("");
            setEmail("");
            setRoleIDUpdate("");
            setID("");
            fetchEmployees();
            setEdit(!edit);
        }
        return response;
    }
    async function deleteEmployee() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        const response = await axios({
            method: 'post',
            url: '/employees/Delete.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            fetchEmployees();
            setEdit(!edit);
            addToast();
        }
        return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    function insertModal() {
        fetchRoles();
        setLarge(!large);
    }
    function updateRoleID(e) {
        setRoleNameUpdate(e.target.label);
        setRoleIDUpdate(e.target.value);

    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    Data Receipt
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
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
                                    { title: 'Username', field: 'username' },
                                    { title: 'Nama', field: 'name' },
                                    { title: 'No. HP', field: 'phone' },
                                    { title: 'Email', field: 'email' },
                                    { title: 'Role', field: 'roleName' },

                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(edit, selectedRow.id, selectedRow.phone, selectedRow.name, selectedRow.username, selectedRow.email, selectedRow.roleName, selectedRow.roleID))}
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
                    <CModalTitle>Karyawan Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Username</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : kevin" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Kevin" value={name} onChange={(e) => setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. HP</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : 0812222" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Email</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="email" placeholder="e.g. : admin@ptamanprimajaya.co.id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Role</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={roles}
                                        placeholder="Pilih role"
                                        onChange={(e) => setRoleIDInsert(e.target.value)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Password</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    <CModalTitle>Ubah Karyawan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Username</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" readOnly placeholder="e.g. : kevin" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Kevin" value={name} onChange={(e) => setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. HP</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : 0812222" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Email</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="email" placeholder="e.g. : admin@ptamanprimajaya.co.id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Role</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        value={{ label: roleNameUpdate, value: roleIDUpdate }}
                                        options={roles}
                                        placeholder="Pilih role"
                                        onChange={(e) => updateRoleID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>

                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => deleteEmployee()}>Hapus</CButton>
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

export default Receipts
