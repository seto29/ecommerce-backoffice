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



function AddPoint(props) {

    function handleCloseModal(e){
        if(e.type==='click'){
            props.setPnt(0)
            
            props.setAP(false)
        }
    }

    return (
        <>
            <CModal
                show={props.AP}
                onClose={() => props.setAP(false)}
                size="md"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Tambahkan Poin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                     <CInput type="number" value={props.pnt} onChange={(e) => props.setPnt(e.target.value)} placeholder="0" required/>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={(e) => props.updatePnt()}>{props.isChange===true?"Ubah Resi":"Kirim"}</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddPoint
