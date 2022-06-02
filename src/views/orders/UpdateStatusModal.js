import React, { useEffect, useState, forwardRef } from 'react'
import {reCreate} from '../../services/Token'
import {getDetail, fDelete, fUpdate, fInsert} from '../../services/Orders'
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
    CInput,

} from '@coreui/react'



function UpdateStatusModal(props) {

//     async function fetchDetails() {
//     await getDetail(props.transactionID).then(({status, details})=>{

//         if(status===401){
//           reCreate().then(({status})=>{
//             if(status===200){
//                 fetchDetails()
//             }
//           })
//         }
        
//         if(status===200){
//             // setDetails(details)
//         }

//     })
//   }

    function handleCloseModal(e){
        if(e.type==='click'){
            props.setAWBUpdate('')
            
            props.setUpdateStatusModal(!props.updateStatusModal)
        }
    }

    return (
        <>
            <CModal
                show={props.updateStatusModal}
                onClose={() => props.setUpdateStatusModal(false)}
                size="md"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>{props.isChange===true?"Ubah Resi":"Ubah Status Pesanan"}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {props.statusUpdate === "6" ? 
                    "Batalkan pesanan " + props.codeUpdate +" ?" :
                    props.statusUpdate === "1" ? 
                    "Proses pesanan " + props.codeUpdate +" ?" :
                     props.statusUpdate === "2" ?
                     <CInput type="text" value={props.awbUpdate} onChange={(e) => props.setAWBUpdate(e.target.value)} placeholder="No. Resi" required/>
                     :
                        props.statusUpdate === "3" ?
                        "Pesanan " + props.codeUpdate +" sudah diantar kurir?" 
                        :
                       "s"}
                </CModalBody>
                <CModalFooter>
              
                    <CButton color="primary" onClick={(e) => handleCloseModal(e)}>Batal</CButton>
                    {props.statusUpdate === "6" ? 
                    <CButton color="danger" onClick={(e) => props.updateStatus()}>Ya</CButton>
                    :props.statusUpdate === "1" ? 
                    <CButton color="success" onClick={(e) => props.updateStatus()}>Ya</CButton>
                    : props.statusUpdate === "2" ? 
                    <CButton color="success" onClick={(e) => props.updateAwb()}>{props.isChange===true?"Ubah Resi":"Kirim"}</CButton>
                    : props.statusUpdate === "3" ? 
                    <CButton color="success" onClick={(e) => props.updateStatus()}>Ya</CButton>
                    :'asd'}
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateStatusModal
