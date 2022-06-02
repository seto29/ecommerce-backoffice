import React, { useEffect, useState, forwardRef, lazy } from 'react'
import NumberFormat from 'react-number-format';
import axios from '../../axios';
import { getAll, fDelete, getAllB } from '../../services/Balances'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  
  CLabel,
  CInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetBottom = lazy(() => import('../widgets/WidgetBottom.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const d = new Date();
var month = ("0" + (d.getMonth() + 1)).slice(-2); 
var date = ("0" + d.getDate()).slice(-2); 
var datestringNow = d.getFullYear()  + "-" + month + "-" + date;
var datebefore = ("0" + (d.getDate() - 7 < 0 ? 1 : d.getDate() - 7)).slice(-2);
var datestringFrom = d.getFullYear()  + "-" + month + "-" + datebefore;
var monthBefore = ("0" + (d.getMonth())).slice(-2);
// var initdateMin = 20  + "-" + monthBefore + "-" + date;

function Dashboard({ }) {
  const [ dateTo, setDateTo] = useState(datestringNow)
  const [ dateFrom, setDateFrom] = useState("2021-01-01")
  const dateMin = useState("2021-01-01")
  const [ dateMax, setDateMax] = useState(datestringNow)
  console.log(datestringNow)
  const [timeVal, setTimeVal] = useState("Tanggal")
  const [grossprofit, setGrossprofit] = useState([])
  const [expense, setExpense] = useState("")
  const [balances, setBalances] = useState([])
  const [products, setProducts] = useState([])
  const [fetched, setFetched] = useState(false)
  const [bot, setBot]=useState([])

  let number = 0
  let balance2 = 0
  let pBalance2 = ""

  let number1 = 0
  let gtotal = 0
  let grand_total = 0
  let total_delivery_fee = 0
  let total_discount = 0
  let total_cogs = 0
  let total_qty = 0

  let tableData = balances && balances.map(({date, delivery_fee, discount, point, total}) => {
        number++
        gtotal = parseInt(total)-parseInt(discount)
        grand_total+=parseInt(total)
        total_delivery_fee+=parseInt(delivery_fee)
        total_discount+=parseInt(discount)
        const data = {
            no: number,
            delivery_fee: <NumberFormat value={delivery_fee} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            discount: <NumberFormat value={discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            total: <NumberFormat value={total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            point: <NumberFormat value={point} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} suffix={' Poin'} />,
            gtotal: <NumberFormat value={gtotal} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            date: Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(Date.parse(date)),
        }
        return data;
    });

    let tableData1 = products && products.map(({name, image, cogs, price, point_price, qty}) => {
        number1++
        total_cogs+=(parseInt(cogs)*parseInt(qty))
        total_qty+=parseInt(qty)
        const data = {
            no: number1,
            name:name,
            cogs: <NumberFormat value={cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            price: <NumberFormat value={price} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            point_price: <NumberFormat value={point_price} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            qty: qty,
            tot_cogs: <NumberFormat value={(parseInt(cogs)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            tot_price: <NumberFormat value={(parseInt(price)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />,
            tot_point_price: <NumberFormat value={(parseInt(point_price)*parseInt(qty))} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} suffix={' Poin'} />,
        }
        return data;
    });

  useEffect(() => {
    //if [], run once pas load dan ga run lagi only on page load
    fetchBalances(dateTo, dateFrom)
    fetchB(dateTo, dateFrom)
  }, ['/grossprofit/GetAll.php'])

  async function fetchBalances(dateTo,dateFrom) {
    const response = await getAll(dateTo,dateFrom)
    if(response.success===1){
        setBalances(response.report)
        setProducts(response.products)
        response.report && response.report.map(({date, delivery_fee, discount, point, total}) => {
          number++
          gtotal = parseInt(total)-parseInt(discount)
          grand_total+=parseInt(total)
          total_delivery_fee+=parseInt(delivery_fee)
          total_discount+=parseInt(discount)
        });
        products && products.map(({name, image, cogs, price, point_price, qty}) => {
          number1++
          total_cogs+=(parseInt(cogs)*parseInt(qty))
          total_qty+=parseInt(qty)
        })
        setFetched(true)
    }else{
      setFetched(false)
    }
}

  async function fetchB(dateTo,dateFrom) {
    const response = await getAllB(dateTo,dateFrom)
    console.log(response)
    if(response.success===1){
      setBot(response)
    }else{
      setFetched(false)
    }
}

  async function changeDateFrom(e) {
    setDateFrom(e)
    fetchBalances(dateTo, e)
    fetchB(dateTo, e)
  }
  
  async function changeDateTo(e) {
    setDateTo(e)
    fetchBalances(e, dateFrom)
    fetchB(e, dateFrom)
}
  return (
    <>
    <div>

                            <CRow className="align-items-right">
                                <CCol lg="6">
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Dari</CLabel>
                                    <CInput type="date" value={dateFrom} onChange={(e) => changeDateFrom(e.target.value)}  min={dateMin} max={dateTo}/>
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Hingga</CLabel>
                                    <CInput type="date" value={dateTo} min={dateFrom}  max={dateMax} onChange={(e) => changeDateTo(e.target.value)} />
                                </CCol>
                            </CRow>
    </div>
    <br/>
      <WidgetsDropdown total_discount={fetched===true?total_discount:false} total_delivery_fee={fetched===true?total_delivery_fee:0} number1={fetched===true?number1:0} grand_total={fetched===true?grand_total:0} total_cogs={fetched===true?total_cogs:0} total_qty={fetched===true?total_qty:0} dateTo={dateTo} dateFrom={dateFrom}/>
      <WidgetBottom total_discount={fetched===true?total_discount:false} bot={bot} total_delivery_fee={fetched===true?total_delivery_fee:0} number1={fetched===true?number1:0} grand_total={fetched===true?grand_total:0} total_cogs={fetched===true?total_cogs:0} total_qty={fetched===true?total_qty:0} dateTo={dateTo} dateFrom={dateFrom}/>
      
      <CCard>
        {/* <CCardHeader>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Laba Kotor</div>
              <h4>{pBalance2}</h4> */}
              {/* <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              /> */}
            {/* </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Pengeluaran</div>
              <h4>({<NumberFormat value={expense} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />})</h4> */}
              {/* <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              /> */}
            {/* </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Laba Bersih</div>
              <h4>{<NumberFormat value={balance2 - expense} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />}</h4> */}
              {/* <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              /> */}
            {/* </CCol> */}
            {/* <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol> */}
            {/* <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol> */}
          {/* </CRow>
        </CCardHeader> */}

        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Penjualan</h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            </CCol>
          </CRow>
          <MainChartExample dateFrom={dateFrom} dateTo={dateTo} style={{ height: '300px', marginTop: '40px' }} />
        </CCardBody>

      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      {/* <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Traffic {' & '} Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      New clients
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="37" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-globe-alt" />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="56" />
                    </div>
                  </div>


                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-facebook" className="progress-group-icon" />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="15" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-twitter" className="progress-group-icon" />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="11" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-linkedin" className="progress-group-icon" />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>

                </CCol>
              </CRow>

              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">

                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="10" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="warning" value="74" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="danger" value="98" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="22" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="43" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     */}
    </>
  )
}

export default Dashboard
