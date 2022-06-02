import React, { useEffect, useState, forwardRef } from 'react';
import Select from 'react-select';
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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
function Blocks({ }) {
    let newDate = new Date()
    let date = Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long"
            }).format(Date.parse(newDate))
    let fileName = "Data Blok APJ per "+date;
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
    const [areas, setAreas] = useState([]);
    const [id, setID] = useState("");
    const [fID, setfID] = useState("");
    const [fname, setFname] = useState("");
    const [block, setBlock] = useState("");
    const [blockNo, setBlockNo] = useState("");
    const [price, setPrice] = useState("");
    const [rawPrice, setRawPrice] = useState("");
    // buat dropdown
    const [floors, setFloors] = useState([]);
    const [floorID, setFloorID] = useState([]);
    const [floorName, setFloorName] = useState([]);
    const [fIDInsert, setfIDInsert] = useState("");
    const [fnameInsert, setFnameInsert] = useState("");
    const [fIDEdit, setfIDEdit] = useState("");
    const [fnameEdit, setFnameEdit] = useState("");
    let number = 0
    let tableData = areas && areas.map(({ id, floor_id, fname, name, no, price }) => {
        number++
        const data = {
            no: number,
            id: id,
            fID: floor_id,
            fname: fname,
            block: name,
            blockNo: no,
            rawPrice: price,
            price: <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
        }
        return data;
    });
    let number2 = 0
    let exportData = areas && areas.map(({ id, fname, name, no, price }) => {
      number2++
      const data = {
        no: number2,
        id: id,
        fname: fname,
        block: name,
        blockNo: no,
        rawPrice: price,
      }
      return data;
  });
    function editModal(id, fIDEdit, fnameEdit, block, blockNo, rawPrice) {

        setID(id);
        setfIDEdit(fIDEdit);
        setFnameEdit(fnameEdit);
        setBlock(block);
        setBlockNo(blockNo);
        setRawPrice(rawPrice);
        setEdit(!edit);

    }
    function insertModal() {
        fetchFloors();
        setLarge(!large);
    }
    async function fetchAreas() {
        const response = await axios.get('/areas/GetAll.php')
        setAreas(response['data']['areas'])
        return response
    }
    let list = [];
    async function fetchFloors() {
        const response = await axios.get('/floors/GetAll.php')
        let i = 0;
        response['data']['floors'].map(value => {
            list[i] = {
                id: value.id, value: value.name, label: value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
            i++;
            return i;
        })
        setFloors(list)
    }
    useEffect(() => {
        fetchAreas()
    }, ['/areas/GetAll.php'])

    async function insert() {
        var bodyFormData = new FormData();
        bodyFormData.append('fID', fIDInsert);
        bodyFormData.append('block', block);
        bodyFormData.append('blockNo', blockNo);
        bodyFormData.append('price', rawPrice);
        const response = await axios({
            method: 'post',
            url: '/areas/Insert.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setID("");
            setfIDInsert("");
            setBlock("");
            setBlockNo("");
            setPrice("");
            setRawPrice("");
            fetchAreas();
            setLarge(!large);
        }
        return response;
    }
    async function update() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('fID', fIDEdit);
        bodyFormData.append('block', block);
        bodyFormData.append('blockNo', blockNo);
        bodyFormData.append('price', rawPrice);
        const response = await axios({
            method: 'post',
            url: '/areas/Update.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setID("");
            setfIDEdit("");
            setBlock("");
            setBlockNo("");
            setPrice("");
            setRawPrice("");
            fetchAreas();
            setEdit(!edit);
        }
        return response;
    }
    async function deleteBlock() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        const response = await axios({
            method: 'post',
            url: '/areas/Delete.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            fetchAreas();
            setEdit(!edit);
            addToast();
        }
        return response;
    }
    function updateFID(e) {
        setFnameEdit(e.target.label);
        setfIDEdit(e.target.value);

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
                                    Data Blok
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Blok">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Lantai" value="fname"/>
                                          <ExcelColumn label="Blok" value="block"/>
                                          <ExcelColumn label="Nomor" value="blockNo"/>
                                          <ExcelColumn label="Harga/m" value="rawPrice"/>
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
                                    {
                                        title: 'Lantai', field: 'fname', cellStyle: {
                                            width: '15%',
                                        },
                                    },
                                    { title: 'Blok', field: 'block' },
                                    { title: 'Nomor Blok', field: 'blockNo' },
                                    { title: 'Harga/m', field: 'price' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.fID, selectedRow.fname, selectedRow.block, selectedRow.blockNo, selectedRow.rawPrice))}
                                // edit, id, fID, fname, block, blockNo, price
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
                    <CModalTitle>Blok Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Lantai</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={floors}
                                        placeholder="Pilih lantai"
                                        onChange={(e) => setfIDInsert(e.target.value)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="A" value={block} onChange={(e) => setBlock(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="22" value={blockNo} onChange={(e) => setBlockNo(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga/m<sup>2</sup></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={rawPrice} onChange={(e) => setRawPrice(e.target.value)} />
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
                    <CModalTitle>Ubah Blok</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Lantai</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="hidden" value={id} />
                                    <Select
                                        options={floors}
                                        value={{ label: fnameEdit, value: fIDEdit }}
                                        placeholder="Pilih lantai"
                                        onChange={(e) => updateFID(e)}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="A" value={block} onChange={(e) => setBlock(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Blok</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="A" value={blockNo} onChange={(e) => setBlockNo(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga/M<sup>2</sup></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" value={rawPrice} onChange={(e) => setRawPrice(e.target.value)} />
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
                    <CButton color="danger" onClick={() => deleteBlock()}>Hapus</CButton>
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

export default Blocks
