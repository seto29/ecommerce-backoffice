import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import NumberFormat from 'react-number-format';
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

        <CCol sm="6" lg="3">
          <CWidgetDropdown
          style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={<NumberFormat value={props.grand_total-props.total_discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Total Pemasukan"

          >
            <CPopover
                                                    content="total pemasukan adalah total penjualan dikurangi total diskon"
                                                    placement="top"
                                                    >
                                                    <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
                                                </CPopover>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            style={{ minHeight:'10vh'}}
            
            // header={<NumberFormat value={shop} displayType={'text'} thousandSeparator={true} />}
            header={<NumberFormat value={props.grand_total} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Total Penjualan"

          >
            <CPopover
                                                    content="total penjualan adalah total yang dibayarkan customer tidak termasuk diskon dan ongkir"
                                                    placement="top"
                                                    >
                                                    <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
                                                </CPopover>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={<NumberFormat value={props.total_discount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Total Diskon"
          ><CPopover
          content="total diskon adalah total potongan harga yang digunakan pengguna selama periode tertentu"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            style={{ minHeight:'10vh'}}
            header={<NumberFormat value={props.total_delivery_fee} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Total Ongkir"
          >
            <CPopover
          content="total ongkir adalah total biaya pengiriman yang dibayar oleh customer"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
          </CWidgetDropdown>
        </CCol>

        
      </CRow>
      <CRow>
      <CCol sm="6" lg="3">
          <CWidgetDropdown
            
            style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={
              <NumberFormat value={props.grand_total-props.total_discount-props.total_cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Laba Kotor"
          // footerSlot={
          //   <ChartBarSimple
          //     className="mt-3 mx-3"
          //     style={{ height: '70px' }}
          //     backgroundColor="rgb(250, 152, 152)"
          //     label="Barang Mau Habis"
          //     labels="months"
          //   />
          // }
          ><CPopover
          content="laba kotor adalah adalah total pemasukan dikurangi total modal"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            style={{ minHeight:'10vh'}}
            header={
              <NumberFormat value={props.total_cogs} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />}
            text="Total Modal"

          ><CPopover
          content="total modal adalah jumlah keselurahan modal dari barang yang telah laku"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
           style={{backgroundColor:"#24476f", minHeight:'10vh'}}
            header={props.number1}
            text="Jenis Barang Terjual"

          ><CPopover
          content="Jenis Barang Terjual adalah jumlah jenis barang yang dibeli"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
          </CWidgetDropdown>
        </CCol>

        

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            style={{ minHeight:'10vh'}}
            color="gradient-warning"
            header={props.total_qty}
            text="Jumlah Barang Terjual"
            

          ><CPopover
          content="jumlah barang terjual adalah total kuantitas keseluruhan barang yang terjual"
          placement="top"
          >
          <CButton color="#24476f"><b style={{color:"#fff"}}>?</b></CButton>
      </CPopover>
            {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          </CWidgetDropdown>
        </CCol>

        
      </CRow>
    </div>



  )
}

export default WidgetsDropdown
