import React, { useEffect, useState, forwardRef } from 'react'
import { reCreate } from '../../services/Token'
import { getDetail, fDelete, fUpdate, fInsert } from '../../services/Orders'
import NumberFormat from 'react-number-format';

import {
    CCol,
    CRow,
    CContainer,
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
    CInputFile,
    CImg,
    CFormText
} from '@coreui/react'



function DetailModal(props) {
    const [details2, setDetails2] = useState([]);

    useEffect(() => {
        if(props.detail===true){
            fetchDetails()
        }
    }, [props])

    async function fetchDetails() {
        if (props.transactionID === null || props.transactionID === "") {
            setDetails2(null)

        } else {
            await getDetail(props.transactionID).then(({ details }) => {
                setDetails2(details)
                console.log(details)
            })
        }

    }

    function handleCloseModal(e) {
        if (e.type === 'click') {
            props.setTransactionID('')
            props.setDetail(false)
        }
    }



    return (
        <>

            <CModal
                show={props.detail}
                onClose={() => props.setDetail(false)}
                size="xl"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Detail Pesanan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CContainer>
                            <CCol>
                                <CRow>
                                    <CCol xs="3">
                                    </CCol>
                                    <CCol xs="2"><b>Nama</b></CCol>
                                    <CCol xs="1"><b>Qty</b></CCol>
                                    <CCol xs="3"><b>Harga</b></CCol>
                                    <CCol xs="3"><b>Subtotal</b></CCol>
                                </CRow>
                            </CCol>
                        </CContainer>
                        <div>&nbsp;</div>

                        {
                            details2 === null ? "" : details2.map((value, index) => {
                                return <CContainer>
                                    <CCol>
                                        <CRow>
                                            <CCol xs="3">
                                                <CImg
                                                    src={value.image}
                                                    style={{ width: '10vh' }}
                                                    alt={value.name}
                                                />
                                            </CCol>
                                            <CCol xs="2"><b>{value.name}</b></CCol>
                                            <CCol xs="1">{value.qty}</CCol>
                                            {/* <CCol xs="1">{value.unit_metric==="0"?"Pcs":value.unit_metric==="1"?"Dus":value.unit_metric==="2"?"Ball":"Pack"}</CCol> */}
                                            {
                                                value.price==="0" || value.price ===0 ?
                                                <>
                                                    <CCol xs="3">{<NumberFormat value={value.point_price} displayType={'text'} thousandSeparator={true} suffix={' Poin'} />}</CCol>
                                                    <CCol xs="3">{<NumberFormat value={value.point_price * value.qty} displayType={'text'} thousandSeparator={true} suffix={' Poin'} />}</CCol>
                                                </>
                                                :
                                                <>
                                                    <CCol xs="3">{<NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</CCol>
                                                    <CCol xs="3">{<NumberFormat value={value.price * value.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />}</CCol>
                                                </>
                                             }
                                            
                                            {/* <CCol xs="2">{value.id}{value.name}{value.price}{value.images}{value.notes}{value.qty}</CCol> */}
                                        </CRow>
                                        <CRow><CCol xs="2"></CCol><CCol xs="8">
                                            Varian: <br/>{
                                            value.variants && value.variants.map((x,j)=>{
                                                return(
                                                        <b style={{marginLeft:'10px'}}>{x.name?x.name:""}<br/></b> 
                                                )
                                            })
                                            }</CCol></CRow>
                                        <CRow><CCol xs="2"></CCol><CCol xs="8">Catatan: {value.notes}</CCol></CRow>
                                    </CCol>
                                    <div>&nbsp;</div>
                                </CContainer>
                            })
                        }
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={(e) => handleCloseModal(e)}>Tutup</CButton>
                </CModalFooter>
            </CModal>
        </>
    )

};

export default DetailModal
