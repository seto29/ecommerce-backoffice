import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
function PowerMeters({ }) {
  let newDate = new Date()
  let date2 = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Kelas Listrik APJ per "+date2;
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


  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
  const [powermeters, setPowermeters] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [kvaPrice, setKvaPrice] = useState("");
  const [kwhPrice, setKwhPrice] = useState("");
  const [rawKvaPrice, setRawKvaPrice] = useState("");
  const [rawKwhPrice, setRawKwhPrice] = useState("");

  let number = 0
  let tableData = powermeters && powermeters.map(({ id, power_meter, kva_price, kwh_price }) => {
    number++
    const data = {
      no: number,
      id: id,
      name: power_meter,
      kvaPrice: <NumberFormat value={kva_price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
      kwhPrice: <NumberFormat value={kwh_price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
      rawKvaPrice: kva_price,
      rawKwhPrice: kwh_price,
    }
    return data;
  });
  let number2 = 0
  let exportData = powermeters && powermeters.map(({ id, power_meter, kva_price, kwh_price }) => {
    number2++
    const data = {
      no: number2,
      id: id,
      name: power_meter,
      rawKvaPrice: kva_price,
      rawKwhPrice: kwh_price,
    }
    return data;
});
  function editModal(id, name, rawKvaPrice, rawKwhPrice,edit) {
    setID(id);
    setName(name);
    setRawKvaPrice(rawKvaPrice);
    setRawKwhPrice(rawKwhPrice);
    setEdit(!edit);
  }
  async function fetchPowermeters() {
    const response = await axios.get('/powermeters/GetAll.php')
    setPowermeters(response['data']['powermeters'])
    return response
  }
  useEffect(() => {
    //if [], run once pas load dan ga run lagi only on page load
    fetchPowermeters()
  }, ['/powermeters/GetAll.php'])

  async function insert() {
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('kvaPrice', rawKvaPrice);
    bodyFormData.append('kwhPrice', rawKwhPrice);
    const response = await axios({
      method: 'post',
      url: '/powermeters/Insert.php',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response['data']['success'] === 1) {
      setName("");
      setKvaPrice("");
      setKwhPrice("");
      fetchPowermeters();
      setLarge(!large);
    }
    return response;
  }
  async function update() {
    var bodyFormData = new FormData();
    bodyFormData.append('id', id);
    bodyFormData.append('name', name);
    bodyFormData.append('kvaPrice', rawKvaPrice);
    bodyFormData.append('kwhPrice', rawKwhPrice);
    const response = await axios({
      method: 'post',
      url: '/powermeters/Update.php',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    if (response['data']['success'] === 1) {
      setName("");
      setKvaPrice("");
      setKwhPrice("");
      fetchPowermeters();
      setEdit(!edit);
    }
    return response;
  }
  async function deletePM() {
    var bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const response = await axios({
      method: 'post',
      url: '/powermeters/Delete.php',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    if (response['data']['success'] === 1) {
      fetchPowermeters();
      setEdit(!edit);
      addToast();
    }
    return response;
  }
  const [large, setLarge] = useState(false)
  const [edit, setEdit] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow className="align-items-center">
                <CCol col="10"  className="mb-3 mb-xl-0">
                  Data Kelas Listrik
                                </CCol>
                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                  <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                </CCol>
                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Kelas Listrik">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Nama" value="name"/>
                                          <ExcelColumn label="Harga/kVA" value="rawKvaPrice"/>
                                          <ExcelColumn label="Harga/kWH" value="rawKwhPrice"/>
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
                  { title: 'Daya (W)', field: 'name' },
                  { title: 'Harga / KVA', field: 'kvaPrice' },
                  { title: 'Harga / KWH', field: 'kwhPrice' },

                  // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                  // {
                  //     title: 'Birth Place',
                  //     field: 'birthCity',
                  //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                  // },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.name, selectedRow.rawKvaPrice, selectedRow.rawKwhPrice, edit))}
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
          <CModalTitle>Kelas Listrik Baru</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs="20" md="10">
            <CForm action="" method="post" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Daya (W)</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="number" placeholder="e.g. : 800, etc.." value={name} onChange={(e) => setName(e.target.value)} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Harga / KVA</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup className="input-prepend">
                    <CInputGroupPrepend>
                      <CInputGroupText>Rp</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="appendedPrependedInput" size="12" type="number" value={rawKvaPrice} onChange={(e) => setRawKvaPrice(e.target.value)} />
                    <CInputGroupAppend>
                      <CInputGroupText>.00</CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Harga / KWH</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup className="input-prepend">
                    <CInputGroupPrepend>
                      <CInputGroupText>Rp</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="appendedPrependedInput" size="12" type="number" value={rawKwhPrice} onChange={(e) => setRawKwhPrice(e.target.value)} />
                    <CInputGroupAppend>
                      <CInputGroupText>.00</CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
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
          <CModalTitle>Ubah Lantai</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs="20" md="10">
            <CForm action="" method="post" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Daya (W)</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="hidden" value={id} />
                  <CInput type="number" placeholder="e.g. : 800, etc.." value={name} onChange={(e) => setName(e.target.value)} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Harga / KVA</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup className="input-prepend">
                    <CInputGroupPrepend>
                      <CInputGroupText>Rp</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="appendedPrependedInput" size="12" type="number" value={rawKvaPrice} onChange={(e) => setRawKvaPrice(e.target.value)} />
                    <CInputGroupAppend>
                      <CInputGroupText>.00</CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="name">Harga / KWH</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup className="input-prepend">
                    <CInputGroupPrepend>
                      <CInputGroupText>Rp</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="appendedPrependedInput" size="12" type="number" value={rawKwhPrice} onChange={(e) => setRawKwhPrice(e.target.value)} />
                    <CInputGroupAppend>
                      <CInputGroupText>.00</CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                  {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                </CCol>
              </CFormGroup>
            </CForm>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => deletePM()}>Hapus</CButton>
          <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '}
          <CButton color="secondary" onClick={() => setLarge(!large)}>Batal</CButton>
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

export default PowerMeters
