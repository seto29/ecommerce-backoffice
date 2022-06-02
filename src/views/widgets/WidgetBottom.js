import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom'
import axios from '../../axios';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CPopover,
  CButton,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { Typography } from '@material-ui/core';

const WidgetsDropdown = (props) => {
    console.log(props)
  const [data, setData] = useState([]);
  const [countProducts, setCountProducts] = useState("")
  const [salesQty, setSalesQty] = useState("")
  const [reminder, setReminder] = useState("")
  const [shop, setShop] = useState("")
  const [bestSeller, setBestSeller] = useState("")
  const [worstSeller, setWorstSeller] = useState("")
  const [deadline, setDeadline] = useState("")
  const [accReceivable, setAccReceivable] = useState("")
  
  useEffect(() => {
    //if [], run once pas load dan ga run lagi only on page load
    // fetchData(props.dateFrom, props.dateTo)
  }, [props])
  // render
  return (
    <div>
      <CRow>

        <CCol sm="6" lg="3" 
            >
          <CWidgetDropdown
            style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={props.bot.totalUser?props.bot.totalUser[0].total:"0"}
            text={"Total Pengguna"}
          >
              <Link to="/customers"><CButton color="#24476f"><b style={{color:"#fff"}}>{'>'}</b></CButton></Link>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            style={{minHeight:'10vh'}}
            header={props.bot.newUsers?props.bot.newUsers[0].total:"0"}
            text="Pengguna Baru"

          >
          <Link to="/customers"><CButton color="#24476f"><b style={{color:"#fff"}}>{'>'}</b></CButton></Link>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
          style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={props.bot.mvp?<p>{props.bot.mvp[0].name} <label style={{color:'white', fontSize:"14px"}}>({<NumberFormat value={props.bot.mvp[0].total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />})</label></p>:"-"}
            text="Top Spender"
            
          >
              
              <Link to={props.bot.mvp?"/customers/"+props.bot.mvp[0].id: ""}><CButton color="#24476f"><b style={{color:"#fff"}}>{'>'}</b></CButton></Link>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            
          style={{minHeight:'10vh'}}
            header={props.bot.birtday?props.bot.birtday[0].total:"0"}
            text="Pengguna Ulang Tahun"
          >
          <Link to="/customers"><CButton color="#24476f"><b style={{color:"#fff"}}>{'>'}</b></CButton></Link>
          </CWidgetDropdown>
        </CCol>

        
      </CRow>
    </div>



  )
}

export default WidgetsDropdown
