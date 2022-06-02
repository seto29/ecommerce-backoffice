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



function PaymentProofModal(props) {

    function handleCloseModal(e) {
        if (e.type === 'click') {

            props.setShowPaymentProofModal(!props.showPaymentProofModal)
        }
    }



    return (
        <>

            <CModal
                show={props.showPaymentProofModal}
                onClose={() => props.setShowPaymentProofModal(!props.showPaymentProofModal)}
                size="lg"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Bukti Pembayaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CContainer>
                            <CCol>
                                <CRow>
                                    <CCol lg="2">
                                    </CCol>
                                    <CCol lg="3">
                                    <CImg
                                        src={props.paymentProof}
                                        style={{width:'20vh'}}
                                        alt="Bukti Bayar"
                                    />
                                  </CCol>
                             
                                </CRow>
                            </CCol>
                        </CContainer>
                        <div>&nbsp;</div>

                     
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={(e) => handleCloseModal(e)}>Tutup</CButton>
                </CModalFooter>
            </CModal>
        </>
    )

};

export default PaymentProofModal
