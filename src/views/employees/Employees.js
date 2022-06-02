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
import {getAll, fDelete, fUpdate, fInsert} from '../../services/Employees'
import {GetDropdown} from '../../services/Roles'
import Toaster from '../components/Toaster'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

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
function Employees({ }) {
  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])
  const [name, setName] = useState("")
  const [roleID, setRoleID] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [idUpdate, setIDUpdate] = useState("")
  const [nameUpdate, setNameUpdate] = useState("")
  const [roleIDUpdate, setRoleIDUpdate] = useState("")
  const [roleNameUpdate, setRoleNameUpdate] = useState("")
  const [emailUpdate, setEmailUpdate] = useState("")
  const [passwordUpdate, setPasswordUpdate] = useState("")
  const [phoneUpdate, setPhoneUpdate] = useState("")
  const [addressUpdate, setAddressUpdate] = useState("")
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }
    let tableData = employees && employees.map(({ id, username, rName, name, email }) => {
        number++
        const data = {
            no: number,
            id: id,
            username: username,
            rName: rName,
            name: name,
            email: email,
        }
        return data;
    });

    function editModal(id, name, roleID, username, email){
      setIDUpdate(id)
      setNameUpdate(name)
      setRoleIDUpdate(roleID)
      setRoleNameUpdate(username)
      setEmailUpdate(username)
      setEdit(!edit)

    }
    async function fetchEmployees() {
      const response = await getAll()
      if(response.success===1){
          setEmployees(response['employees'])
        }else{
          setEmployees([])
      }
    }

    function updateRID(e) {
        setRoleNameUpdate(e.target.label);
        setRoleIDUpdate(e.target.value);

    }

    async function fetchRoles() {
        const response = await GetDropdown()
        setRoles(response)
    }

    useEffect(() => {
        fetchEmployees()
        fetchRoles()
    }, [])

    async function insert(){
      const response = await fInsert(name, email, roleID, password)
        if(response['success'] ===1) {
          setName("")
          setRoleID("")
          setEmail("")
          setPassword("")
          fetchEmployees()
          setToastM("insert")
          setLarge(false);
      }else{
          setToastM("failed")
      }
      addToast()
    }

    async function update(){
      const response = await fUpdate(idUpdate, nameUpdate, emailUpdate, roleIDUpdate, passwordUpdate)
        if(response['success'] ===1) {
            setNameUpdate("")
            setAddressUpdate("")
            setPhoneUpdate("")
            setPasswordUpdate("")
            fetchEmployees()
            setToastM("update")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast()
    }
    async function deleteCat(){
        const response = await fDelete(idUpdate)
        if(response['success'] === 1){
            fetchEmployees();
            setToastM("delete")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast()
        return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                name={name}
                setName={setName}
                roles={roles}
                setRoleID={setRoleID}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                idUpdate={idUpdate}
                nameUpdate={nameUpdate}
                setNameUpdate={setNameUpdate}
                roles={roles}
                roleNameUpdate={roleNameUpdate}
                roleIDUpdate={roleIDUpdate}
                updateRID={updateRID}
                emailUpdate={emailUpdate}
                setEmailUpdate={setEmailUpdate}
                passwordUpdate={passwordUpdate}
                setPasswordUpdate={setPasswordUpdate}
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
                                    <h4>Karyawan</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <Download tableData={tableData}/>
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
                                    { title: 'Username', field: 'username' },
                                    // { title: 'Email', field: 'email' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.name, selectedRow.roleID, selectedRow.username, selectedRow.email))}
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

export default Employees
