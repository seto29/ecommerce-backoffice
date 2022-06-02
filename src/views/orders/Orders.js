import React, { useEffect, useState, forwardRef } from 'react'
import NumberFormat from 'react-number-format';
import { sicepat } from "../../data/Sicepat";
import {Link} from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CTabs,
    CCardFooter,
    CButton,
    CInput,
    CPopover,
    CLink,
    CContainer,
} from '@coreui/react'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import CIcon from '@coreui/icons-react'
import Toaster from '../components/Toaster'
import { getAll, fUpdate, fInsert, fUpdateStatus, fUpdateAwb } from '../../services/Orders'
import { reCreate } from '../../services/Token'
// import Download from './Download'
import DetailModal from './DetailModal'
import PaymentProofModal from './PaymentProofModal'
import UpdateStatusModal from './UpdateStatusModal';
// import UpdateModal from './UpdateModal'
// import './style.css';

function Orders(props) {

    const [toastM, setToastM] = useState("")
    const [toasts, setToasts] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [detail, setDetail] = useState(false)
    const [showPaymentProofModal, setShowPaymentProofModal] = useState(false)
    const [updateStatusModal, setUpdateStatusModal] = useState(false)
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [fade] = useState(true)
    const [closeButton] = useState(true)

    const [orders, setOrders] = useState([]);
    const [name, setName] = useState("");
    const [codeUpdate, setCodeUpdate] = useState("");
    const [sequence, setSequence] = useState(0);
    const [idUpdate, setIDUpdate] = useState("");
    const [nameUpdate, setNameUpdate] = useState("");
    const [sequenceUpdate, setSequenceUpdate] = useState("");
    const [awb, setAWB] = useState("");
    const [awbUpdate, setAWBUpdate] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [statusUpdate, setStatusUpdate] = useState("");
    const [paymentProof, setPaymentProof] = useState("");
    const [isChange, setIsChange] = useState(false);


    const addToast = () => {
        setToasts([
            ...toasts,
            { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }


    function detailModal(id) {
        setTransactionID(id)
        setDetail(!detail);
    }
    function paymentProofModal(data) {
        console.log(data)
        setPaymentProof(data)
        setShowPaymentProofModal(!showPaymentProofModal);
    }
    function updateModal(id, status, code) {
        setIDUpdate(id)
        setStatusUpdate(status)
        setCodeUpdate(code)
        setUpdateStatusModal(!updateStatusModal);
    }
    function awbModal(id, status, awb) {
        setIDUpdate(id)
        setStatusUpdate(status)
        setAWBUpdate(awb)
        setUpdateStatusModal(!updateStatusModal);
    }

    function awbModal1(id, status, awb) {
        setIsChange(true)
        setIDUpdate(id)
        setStatusUpdate(status)
        setAWBUpdate(awb)
        setUpdateStatusModal(!updateStatusModal);
    }

    function printInvoice(id) {
        let url = "http://apis.hijiofficial.com/snippets/prints/invoice.php?id="+id
          window.open(url, 'sharer', 'toolbar=0,status=0,width=600,height=400')
    }

    function printLabel(id) {
        let url = "http://apis.hijiofficial.com/snippets/prints/label.php?id="+id
          window.open(url, 'sharer', 'toolbar=0,status=0,width=600,height=400')
    }

    async function fetchOrders() {
        await getAll().then(({ orders }) => {

            setOrders(orders)


        })
    }
    useEffect(() => {
        fetchOrders()
    }, [props])

    async function insert(url) {
        await fInsert(name, sequence, url).then(({ status }) => {
            if (status === 401) {
                reCreate().then(({ status }) => {
                    if (status === 200) {
                        insert(url)
                    }
                })
            }
            if (status === 200) {
                fetchOrders()
                setName('')
                setSequence(0)
                setToastM("update")
                setShowAddModal(false)
            } else {
                setToastM("failed")
            }
            addToast()
        })
    }

    // async function update(url) {
    //     await fUpdate(idUpdate, nameUpdate, sequenceUpdate, url).then(({ status }) => {
    //         if (status === 401) {
    //             reCreate().then(({ status }) => {
    //                 if (status === 200) {
    //                     insert(url)
    //                 }
    //             })
    //         }

    //         if (status === 200) {
    //             fetchOrders()
    //             setName('')
    //             setSequence(0)
    //             setToastM("update")
    //             setShowAddModal(false)
    //         }
    //         addToast()
    //     })
    // }
    async function updateStatus() {
        await fUpdateStatus(idUpdate, statusUpdate).then(({ status }) => {
            console.log(status)
            if (status === 401) {
                reCreate().then(({ status }) => {
                    if (status === 200) {
                        updateStatus()
                    }
                })
            }
            if (status === 200) {
                fetchOrders()
                setToastM("update")
                setUpdateStatusModal(false)
            } else {
                setToastM("failed")
            }
            addToast()
        })
    }
    async function updateAwb() {
        await fUpdateAwb(idUpdate, awbUpdate).then(({ status }) => {
            if (status === 401) {
                reCreate().then(({ status }) => {
                    if (status === 200) {
                        updateAwb()
                    }
                })
            }

            if (status === 200) {
                setIsChange(false)
                fetchOrders()
                setToastM("update")
                setUpdateStatusModal(false)
            } else {
                setToastM("failed")
            }
            addToast()
        })
    }

    return (
        <>
            <DetailModal
                detail={detail}
                setDetail={setDetail}
                transactionID={transactionID}
                setTransactionID={setTransactionID}

            />
            <PaymentProofModal
                paymentProof={paymentProof}
                showPaymentProofModal={showPaymentProofModal}
                setShowPaymentProofModal={setShowPaymentProofModal}

            />
            <UpdateStatusModal
                idUpdate={idUpdate}
                statusUpdate={statusUpdate}
                codeUpdate={codeUpdate}
                updateStatusModal={updateStatusModal}
                setUpdateStatusModal={setUpdateStatusModal}
                updateStatus={updateStatus}
                updateAwb={updateAwb}
                awb={awb}
                setAWB={setAWB}
                awbUpdate={awbUpdate}
                setAWBUpdate={setAWBUpdate}
                isChange={isChange}
                setIsChange={setIsChange}

            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            {/* <CRow> */}
                {/* <CCol> */}
                <CCard>
                    {/* {
                        sicepat.map((value)=>{
                            return (
                                <div>
                                    {value}
                                </div>
                            );
                         }
                    )} */}
                    <CCardBody>
                        <CTabs>
                            <CNav variant="tabs" color="red">
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Belum Dibayar
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Diproses
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Dikirim
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Diterima
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Selesai
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Dibatalkan Customer
                            </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink style={{ fontWeight: 'bold' }}>
                                        Dibatalkan Admin
                            </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "0") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                            </b>
                                                                        </CButton>
                                                                        {value.payment_proof ===null || value.payment_proof ==="" ?
                                                                        <CContainer></CContainer>
                                                                    :
                                                                    <CButton color="outline" onClick={() => paymentProofModal(value.payment_proof)}>
                                                                        <b>
                                                                            Bukti Bayar
                                                                        </b>
                                                                    </CButton>
                                                                    }
                                                                        

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.d_name}, {value.c_name}, {value.p_name}, {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                        <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <CCol>
                                                                        <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                            <b>
                                                                                Hubungi Pembeli
                                                                    </b>
                                                                        </a>
                                                                    </CCol>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span>  */}

                                                                    <CCol>
                                                                        <CButton color="danger" onClick={() => updateModal(value.id, "6", value.code)}>Batalkan</CButton>
                                                                    {" "}
                                                                        <CButton color="info" onClick={() => printInvoice(value.id)}>Cetak Invoice</CButton>
                                                                    {" "}
                                                                    <CButton color="info" onClick={() => printLabel(value.id)}>Cetak Label</CButton>
                                                                    {" "}
                                                                        <CButton color="success" onClick={() => updateModal(value.id, "1", value.code)}>Proses</CButton>
                                                                    </CCol>
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }

                                </CTabPane>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "1") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>{
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span>  */}

                                                            <div>

                                                                    <CButton color="danger" onClick={() => updateModal(value.id, "6", value.code)}>Batalkan</CButton>
                                                                    {" "}
                                                                    <CButton color="info" onClick={() => printInvoice(value.id)}>Cetak Invoice</CButton>
                                                                    {" "}
                                                                    <CButton color="info" onClick={() => printLabel(value.id)}>Cetak Label</CButton>
                                                                    {" "}
                                                                    <CButton color="success" onClick={() => awbModal(value.id, "2", "")}>Kirim</CButton>
                                                            </div>

                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>

                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "2") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>
                                                                        {
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span>  */}
                                                            <div>
                                                                    <CButton color="info" onClick={() => printInvoice(value.id)}>Cetak Invoice</CButton>
                                                                    {" "}
                                                                    <CButton color="info" onClick={() => printLabel(value.id)}>Cetak Label</CButton>
                                                                    {" "}
                                                                    <CButton color="success" onClick={() => awbModal1(value.id, "2", "")}>Ubah Resi</CButton>
                                                                    {" "}
                                                                    <Link to={"/tracking/"+value.awb}><CButton color="success" disabled={value.awb===" " || !isNaN(value.delivery_id)?true:false} >{!isNaN(value.delivery_id)?"Kurir Hiji Tidak Mendukung Lacak":value.awb===" "?"No Resi Kosong!":"Lacak"}</CButton></Link>
                                                                    {" "}
                                                                    {
                                                                        value.awb===" " || !isNaN(value.delivery_id)?
                                                                        <CButton color="success" onClick={() => updateModal(value.id, "3", value.code)}>Pesanan Sampai</CButton>
                                                                        :
                                                                        ""
                                                                    }
                                                            </div>
                                                                    {/* <CButton color="success" disabled={value.awb===" "?true:false} onClick={(e) => props.setDetail(false)}>{value.awb===" "?"No Resi Kosong!":"Lacak"}</CButton> */}
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "3") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>{
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span>  */}
                                                                    {/* <CButton color="danger" onClick={() => props.setDetail(false)}>Batalkan</CButton>  */}
                                                                    {/* <CButton color="success" onClick={() => props.setDetail(false)}>Terima</CButton> */}
                                                                    <CButton color="info" onClick={() => printInvoice(value.id)}>Cetak Invoice</CButton>
                                                                    {" "}
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "4") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>{
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span>  */}
                                                                    {/* <CButton color="danger" onClick={() => props.setDetail(false)}>Batalkan</CButton>  */}
                                                                    {/* <CButton color="success" onClick={() => props.setDetail(false)}>Terima</CButton> */}
                                                                    <CButton color="info" onClick={() => printInvoice(value.id)}>Cetak Invoice</CButton>
                                                                    {" "}
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "5") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>{
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span> 
                                                            <CButton color="danger" onClick={() => props.setDetail(false)}>Batalkan</CButton>  */}
                                                                    {/* <CButton color="success" onClick={() => props.setDetail(false)}>Terima</CButton> */}
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>
                                <CTabPane>
                                    <div>&nbsp;</div>
                                    {
                                        orders.map((value, index) => {
                                            if (value.status === "6") {
                                                return <CRow>
                                                    <CCol>
                                                        <CCard>
                                                            <CCardHeader>
                                                                {value.code} | <CIcon name="cil-user" /> {value.uName} | {Intl.DateTimeFormat("id-ID", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric",
                                                                    timeZoneName: "short",
                                                                }).format(Date.parse(value.created_at))}
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol col="6" sm="3" md="3">
                                                                        {/* <center> */}
                                                                        <CButton color="outline" onClick={() => detailModal(value.id)}>
                                                                            <b>
                                                                                Detail Pesanan
                                                                    </b>
                                                                        </CButton>

                                                                        {/* </center> */}
                                                                    </CCol>
                                                                    <CCol col="6" sm="5" md="5">
                                                                        <CCol><b>Alamat</b></CCol>
                                                                        <CCol>{value.recipient_name} ({value.recipient_phone})</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{value.address}, {value.rName}, {value.prName} {value.postal_code} {value.detail === "" ? '' : '(Catatan: ' + value.detail + ')'}</span></CCol>{
                                                                            !isNaN(value.delivery_id) ? 
                                                                                <>
                                                                                   <CCol><b>Kurir Pribadi Hiji</b></CCol>
                                                                                </> : 
                                                                                value.awb===" " || value.awb===""?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <CCol><b>Resi</b></CCol>
                                                                                        <CCol>{value.awb}</CCol>
                                                                                    </>
                                                                        }
                                                                    </CCol>
                                                                    <CCol col="6" sm="4" md="4">
                                                                        <CCol><b>Pengiriman</b></CCol>
                                                                        <CCol>{!isNaN(value.delivery_id) ? "Kurir Pribadi Hiji" : "Sicepat " + value.delivery_id}</CCol>
                                                                        <CCol><span style={{ fontSize: 12 }}>{<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</span></CCol>
                                                                    </CCol>
                                                                </CRow>
                                                                <CContainer>
                                                                    <CRow>
                                                                        <CCol lg="9" className="py-3">
                                                                            Total&nbsp;
                                                                    <CPopover header="Detail" content={
                                                                                <CCol col="8" sm="12" md="12" xs="12">
                                                                                    Belanja : {<NumberFormat value={value.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Ongkir : {<NumberFormat value={value.delivery_fee} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br />
                                                                                Diskon : {<NumberFormat value={value.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                                Poin(Pembayaran) : {<NumberFormat value={value.point_payment} displayType={'text'} thousandSeparator={true} suffix={' poin'}/>}
                                                                                </CCol>
                                                                            }>
                                                                                <CLink>
                                                                                    <HelpOutlineOutlinedIcon color="primary" style={{ width: '5%' }} />
                                                                                </CLink>
                                                                            </CPopover>
                                                                        </CCol>
                                                                        <CCol sm="3" className="py-3">
                                                                            <span style={{ color: 'green', fontSize: 16 }}> <b> {<NumberFormat value={Number(value.total) - Number(value.discount) + Number(value.delivery_fee)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} <br/>
                                                                        {<NumberFormat value={Number(value.point_payment)} displayType={'text'} thousandSeparator={true} suffix={' Poin (Bayar)'}  />}</b></span>
                                                                        </CCol>
                                                                    </CRow>
                                                                </CContainer>

                                                            </CCardBody>
                                                            <CCardFooter>
                                                                <CRow style={{ justifyContent: 'space-between', }}>
                                                                    <a href={"https://api.whatsapp.com/send?phone=62" + value.recipient_phone.substring(1)}>
                                                                        <b>
                                                                            Hubungi Pembeli
                                                                </b>
                                                                    </a>
                                                                    {/* <span style={{width:'60%'}}>
                                                                <CInput type="text" placeholder="Catatan khusus (tidak ditampilkan)" value={props.additionalNotes} onChange={(e) => props.setadditionalNotes(e.target.value)} />
                                                            </span> 
                                                            <CButton color="danger" onClick={() => props.setDetail(false)}>Batalkan</CButton> 
                                                            <CButton color="success" onClick={() => props.setDetail(false)}>Kirim</CButton> */}
                                                                </CRow>
                                                            </CCardFooter>
                                                        </CCard>

                                                    </CCol>
                                                </CRow>
                                            }


                                        })
                                    }
                                </CTabPane>

                            </CTabContent>
                        </CTabs>
                    </CCardBody>

                </CCard>
                {/* </CCol> */}

            {/* </CRow> */}
        </>
    )
};

export default Orders
