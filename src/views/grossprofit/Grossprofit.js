import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
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
import {getAll} from '../../services/GrossProfit'
import Download from './Download'

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

function Grossprofit({ }) {
  const [ dateTo, setDateTo] = useState(datestringNow)
  const [ dateFrom, setDateFrom] = useState(datestringFrom)
  const dateMin = useState(initdateMin)
  const dateMax = useState(datestringNow)
    const [grossprofit, setGrossprofit] = useState([]);
    let number = 0
    let balance2 = 0
    let pBalance2 = ""
    let tableData = grossprofit && grossprofit.map(({ id, code, created_at, sName, eName, itemCount, qtySum, total, totQty, totP, tot, totC }) => {
        number++
        balance2 += parseInt(tot) - parseInt(totC)
        pBalance2 = <NumberFormat value={balance2} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
        const data = {
          no: number,
          id: id,
          code: code,
          sName: sName,
          eName: eName,
          received: Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(Date.parse(created_at)),
          itemCount: itemCount,
          qtySum: qtySum,
          total: total,
          pTotal: <NumberFormat value={tot} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
          totQty: totQty,
          totP: totP,
          totC: totC,
          pTotC: <NumberFormat value={totC} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
          balance: parseInt(tot) - parseInt(totC),
          pBalance: parseInt(tot) - parseInt(totC) < 0 ? <NumberFormat value={parseInt(tot) - parseInt(totC)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /> : <NumberFormat value={parseInt(tot) - parseInt(totC)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
        }
        return data;
      });
    let number2 = 0
    let exportData = grossprofit && grossprofit.map(({ id, name, phone, address }) => {
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
    async function fetchGrossprofit(dateTo, dateFrom) {
      const response = await getAll(dateTo, dateFrom)
      if(response['success']===1){
        setGrossprofit(response['grossprofit'])
      }else{
        setGrossprofit([])
      }
  }
    useEffect(() => {
        fetchGrossprofit(dateTo, dateFrom)
    }, [])
    
    async function changeDateFrom(e) {
      setDateFrom(e)
      fetchGrossprofit(dateTo,e)
  }

  async function changeDateTo(e) {
      setDateTo(e)
      fetchGrossprofit(e,dateFrom)
  }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10"  className="mb-3 mb-xl-0">
                                    <h4>Laba Kotor</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                     <h4>{pBalance2}</h4>
                                </CCol>
                                <Download exportData={exportData}/>
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
                    { title: 'No. Penjualan', field: 'code' },
                    { title: 'Harga Modal', field: 'pTotC' },
                    { title: 'Harga Jual', field: 'pTotal' },
                    { title: 'Laba / Rugi', field: 'pBalance' },
                    // no: number,
                    // id: id,
                    // code: code,
                    // sName: sName,
                    // eName: eName,
                    // received: Intl.DateTimeFormat("id-ID", {
                    //   year: "numeric",
                    //   month: "long",
                    //   day: "numeric",
                    // }).format(Date.parse(created_at)),
                    // itemCount: itemCount,
                    // qtySum: qtySum,
                    // total: total,
                    // pTotal: <NumberFormat value={tot} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />,
                    // totQty: totQty,
                    // totP: totP,
                    // totC: totC,
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => console.log(selectedRow.id, selectedRow.name, selectedRow.address, selectedRow.phone))}
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

export default Grossprofit
