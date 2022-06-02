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
import Toaster from '../components/Toaster'
// import { fDelete, fUpdate } from '../../services/DeliveryMethods'
import { getAll, fInsert, fDelete, fUpdate} from '../../services/Prizes'
import { reCreate } from '../../services/Token'
import NumberFormat from 'react-number-format';

// import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
// import './style.css';
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
function CustomDeliveries(props) {
  const [toastM, setToastM] = useState("")
  const [toasts, setToasts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [fade] = useState(true)
  const [closeButton] = useState(true)

  const [prizes, setPrizes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");

  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = prizes && prizes.map(({ id, minimal_transactions, prize }) => {
    number++
    const data = {
      no: number,
      id: id,
      minimal_transactions: minimal_transactions,
      prize: prize,
      pPrize: <NumberFormat value={prize} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
      pminimal_transactions: <NumberFormat value={minimal_transactions} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
    }
    return data;
  });

  function editModal(edit, id, name, price) {
    setIDUpdate(id);
    setNameUpdate(name);
    setPriceUpdate(price)

    setEdit(!edit);
  }

  async function fetchDeliveryMethods() {
    await getAll().then(({ status, prizes }) => {
      setPrizes(prizes)
    })
  }

  useEffect(() => {
    fetchDeliveryMethods()
  }, [props])

  async function insert() {
    await fInsert(name, price).then(({ status }) => {
      if (status == 200) {
        fetchDeliveryMethods()
        setName('')
        setPrice(0)
        setToastM("insert")
        setShowAddModal(false)
      } else {
        setToastM("failed")
      }
      addToast()
    })
  }

  async function update(url) {
    await fUpdate(idUpdate, nameUpdate, priceUpdate).then(({ status }) => {
      if (status == 200) {
        fetchDeliveryMethods()
        setName('')
        setPrice(0)
        setToastM("update")
        setShowAddModal(false)
      }
      addToast()
    })
  }

  async function deleteCat() {
    await fDelete(idUpdate).then(({ status, success }) => {
      if (status === 401) {
        reCreate().then(({ status }) => {
          if (status === 200) {
            deleteCat()
          }
        })
      }

      if (success == 1) {
        fetchDeliveryMethods()
        setToastM("delete")
        setEdit(false)
      }
      addToast()
    })
  }

  return (
    <>
      <AddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        insert={insert}
      />
      <UpdateModal
        edit={edit}
        setEdit={setEdit}
        idUpdate={idUpdate}
        nameUpdate={nameUpdate}
        setNameUpdate={setNameUpdate}
        priceUpdate={priceUpdate}
        setPriceUpdate={setPriceUpdate}
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
                <CCol col="10" className="mb-3 mb-xl-0">
                  <h4>Hadiah Ulang Tahun</h4>
                </CCol>
                <CCol col="6" sm="4" md="2" className="mb-3 mb-xl-0">
                  <CButton block color="primary" onClick={() => setShowAddModal(!showAddModal)} className="mr-1">Tambah Data</CButton>
                </CCol>
                {/* <Download
                  tableData={tableData}
                  setShowAddModal={setShowAddModal}
                  showAddModal={showAddModal}
                /> */}
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
                  { title: 'Minimal Total Transaksi', field: 'pminimal_transactions' },
                  { title: 'Saldo Diskon Hadiah', field: 'pPrize' },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => editModal(edit, selectedRow.id, selectedRow.minimal_transactions, selectedRow.prize))}
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

export default CustomDeliveries
