import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import Select from 'react-select';
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
function Invoices({ }) {
  let newDate = new Date()
  let date2 = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Invoice APJ per "+date2;
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

  // baru
  const [invoices, setInvoices] = useState([]);
  const [id, setID] = useState("");
  const [meterBefore, setMeterBefore] = useState("");
  const [meterAfter, setMeterAfter] = useState("");
  const [uName, setUName] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("");
  const [graceDate, setGraceDate] = useState("");
  const [monthBill, setMonthBill] = useState("");
  const [kwhPrice, setKwhPrice] = useState("");
  const [kvaPrice, setKvaPrice] = useState("");
  const [powerMeter, setPowerMeter] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [aPrice, setAPrice] = useState(0);

  //buat calculation
  const [kvaCharge, setKvaCharge] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [eCharge, setECharge] = useState(0);
  const [charge, setCharge] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [eUsage, setEUsage] = useState(0);



  let number = 0
  let tableData = invoices && invoices.map(({ id, stall_id, meter_before, meter_after, uName, fName, aName, aNo, status, grace_date, sName, month_bill, kva_price, kwh_price, power_meter, length, width, height, aPrice, employeeName }) => {
    number++
    const data = {
      no: number,
      uName: uName,
      area: fName + " Blok " + aName + " No. " + aNo,
      meterBefore: meter_before,
      meterAfter: meter_after,
      status: status,
      sName: sName,
      monthBill: Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
      }).format(Date.parse(month_bill)),
      graceDate: Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }).format(Date.parse(grace_date)),
      kvaPrice: kva_price,
      kwhPrice: kwh_price,
      powerMeter: power_meter,
      length: length,
      width: width,
      height: height,
      aPrice: aPrice,
      employeeName: employeeName,
    }
    return data;
  });
  let number2 = 0
    let exportData = invoices && invoices.map(({ id, stall_id, meter_before, meter_after, uName, fName, aName, aNo, status, grace_date, sName, month_bill, kva_price, kwh_price, power_meter, length, width, height, aPrice }) => {
      number2++
      const data = {
        no: number2,
        uName: uName,
        area: fName + " Blok " + aName + " No. " + aNo,
        meterBefore: meter_before,
        meterAfter: meter_after,
        status: status,
        sName: sName,
        monthBill: Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
        }).format(Date.parse(month_bill)),
        graceDate: Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(Date.parse(grace_date)),
        kvaPrice: kva_price,
        kwhPrice: kwh_price,
        powerMeter: power_meter,
        length: length,
        width: width,
        height: height,
        aPrice: aPrice,
        kvaCharge: powerMeter*kvaPrice,
        eUsage2: meterAfter-meterBefore,
        eCharge: (meterAfter-meterBefore)*kwhPrice,
        serviceCharge: (width*length)*aPrice,
        charge: (powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice),
        totalCharge: (powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice),
      }
      return data;
  });
  function detailModal(id, meterBefore, meterAfter, uName, area, status, graceDate, monthBill, kvaPrice, kwhPrice, powerMeter, length, width, height, aPrice, detail) {
    setID(id);
    setMeterBefore(meterBefore);
    setMeterAfter(meterAfter);
    setUName(uName);
    setArea(area);
    setStatus(status);
    setGraceDate(graceDate);
    setMonthBill(monthBill);
    setKvaPrice(kvaPrice);
    setKwhPrice(kwhPrice);
    setPowerMeter(powerMeter);
    setKvaCharge(powerMeter*kvaPrice);
    setEUsage(meterAfter-meterBefore);
    setECharge((meterAfter-meterBefore) * kwhPrice);
    setServiceCharge((width*length) *aPrice);
    setCharge((powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice));
    setTotalCharge((powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice));
    setDetail(!detail);
  }

  
  let list = [];
  async function fetchInvoices() {
    const response = await axios.get('/invoices/GetAll.php')
    setInvoices(response['data']['invoices'])
    return response
  }
  useEffect(() => {
    //if [], run once pas load dan ga run lagi only on page load
    fetchInvoices()
  }, ['/invoices/GetAll.php'])

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
      url: '/invoices/Insert.php',
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
      fetchInvoices();
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
      url: '/invoices/Update.php',
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
      fetchInvoices();
      setDetail(!detail);
    }
    return response;
  }
  async function deleteEmployee() {
    var bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const response = await axios({
      method: 'post',
      url: '/invoices/Delete.php',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response['data']['success'] === 1) {
      fetchInvoices();
      setDetail(!detail);
      addToast();
    }
    return response;
  }
  const [large, setLarge] = useState(false)
  const [detail, setDetail] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  function insertModal() {
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
                  Data Invoice
                                </CCol>
                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                  <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
                </CCol>
                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Invoice">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Nama Pemilik" value="uName"/>
                                          <ExcelColumn label="Nama Kios" value="sName"/>
                                          <ExcelColumn label="Alamat" value="area"/>
                                          <ExcelColumn label="Periode" value="monthBill"/>
                                          <ExcelColumn label="Sebelum" value="meterBefore"/>
                                          <ExcelColumn label="Sesudah" value="meterAfter"/>
                                          <ExcelColumn label="Jatuh Tempo" value="graceDate"/>
                                          <ExcelColumn label="Daya" value="powerMeter"/>
                                          <ExcelColumn label="Pemakaian Listrik (kWh)" value="eUsage2"/>
                                          <ExcelColumn label="Beban" value="kvaCharge"/>
                                          <ExcelColumn label="Biaya Listrik" value="eCharge"/>
                                          <ExcelColumn label="Service Charge" value="serviceCharge"/>
                                          <ExcelColumn label="Total Tagihan" value="totalCharge"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
              </CRow>
              {/* no: number2,
        uName: uName,
        area: fName + " Blok " + aName + " No. " + aNo,
        meterBefore: meter_before,
        meterAfter: meter_after,
        status: status,
        sName: sName,
        kvaPrice: kva_price,
        kwhPrice: kwh_price,
        powerMeter: power_meter,
        length: length,
        width: width,
        height: height,
        aPrice: aPrice,
        kvaCharge: powerMeter*kvaPrice,
        eUsage: meterAfter-meterBefore,
        eCharge: (meterAfter-meterBefore)*kwhPrice,
        serviceCharge: (width*length)*aPrice,
        charge: (powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice),
        totalCharge: (powerMeter*kvaPrice)+((width*length) *aPrice)+((meterAfter-meterBefore) * kwhPrice), */}
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
                  { title: 'Pemilik', field: 'uName' },
                  { title: 'Alamat', field: 'area' },
                  { title: 'Nama Kios', field: 'sName' },
                  { title: 'Periode', field: 'monthBill' },
                  { title: 'Dibuat Oleh', field: 'employeeName' },
                  // { title: 'Jatuh Tempo', field: 'date' },
                  {
                    title: 'Status',
                    field: 'status',
                    lookup: { 'Lunas': 'Lunas', 'Belum Lunas': 'Belum Lunas' },

                  },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => detailModal(selectedRow.id, selectedRow.meterBefore, selectedRow.meterAfter, selectedRow.uName, selectedRow.area, selectedRow.status, selectedRow.graceDate, selectedRow.monthBill, selectedRow.kvaPrice, selectedRow.kwhPrice, selectedRow.powerMeter, selectedRow.length, selectedRow.width, selectedRow.height, selectedRow.aPrice, detail))}
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
        show={detail}
        onClose={() => setDetail(!detail)}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>Detail Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs="20" md="10">
            <table class="table table-bordered xl">
              <tbody>
                <tr>
                  <th scope="row" colSpan="2">NAMA</th>
                  <td colSpan="2">{uName}</td>
                  <th scope="row" colSpan="2">PERIODE</th>
                  <td colSpan="3">{monthBill}</td>
                </tr>
                <tr>
                  <th scope="row" colSpan="2">ALAMAT</th>
                  <td colSpan="2">{area}</td>
                  <th scope="row" colSpan="2">JATUH TEMPO</th>
                  <td colSpan="3">{graceDate}</td>
                </tr>
                <tr>
                  <th scope="row" colSpan="9"> <center>RINCIAN PEMAKAIAN DAN TAGIHAN</center></th>
                </tr>
                <tr>
                  <th scope="row"colSpan="2">SATUAN</th>
                  <th scope="row">BEBAN</th>
                  <th scope="row">SERVICE CHARGE</th>
                  <th scope="row">TARIF/KWH</th>
                  <th scope="row">BIAYA LISTRIK</th>
                  <th scope="row">TAGIHAN</th>
                  <th scope="row"><NumberFormat value={charge} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></th>
                  <th scope="row">TOTAL TAGIHAN</th>
                </tr>
                <tr>
                  <th scope="row">DAYA</th>
                  <td>{powerMeter}</td>
                  <td rowSpan="4"><NumberFormat value={kvaCharge} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td rowSpan="4"><NumberFormat value={serviceCharge} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td rowSpan="4"><NumberFormat value={kwhPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td rowSpan="4"><NumberFormat value={eCharge} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td>BIAYA ADMIN</td>
                  <td></td>
                  <td rowSpan="4"><NumberFormat value={charge} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                </tr>
                <tr>
                  <th scope="row">METERAN AWAL</th>
                  <td>{meterBefore}</td>
                  <td>BIAYA PERAWATAN</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">METERAN AKHIR</th>
                  <td>{meterAfter}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">PEMAKAIAN(KWH)</th>
                  <td>{eUsage}</td>
                  <td></td>
                  <td></td>
                </tr>
                {/* <tr>
                  <th scope="row">RINCIAN PEMAKAIAN DAN TAGIHAN</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr> */}
              </tbody>
            </table>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => deleteEmployee()}>Hapus</CButton>
          <CButton color="primary" onClick={() => update()}>Print</CButton>{' '}
          <CButton color="secondary" onClick={() => setDetail(!detail)}>Batal</CButton>
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

export default Invoices 
