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
    CLabel,

} from '@coreui/react'



function AddPoint(props) {

    function handleCloseModal(e){
        if(e.type==='click'){
            props.setPnt(0)
            
            props.setAP1(false)
        }
    }

    return (
        <>
            <CModal
                show={props.AP1}
                onClose={() => props.setAP1(false)}
                size="md"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Tambahkan Saldo Diskon</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CLabel>Saldo Diskon</CLabel>
                     <CInput type="number" value={props.pnt} onChange={(e) => props.setPnt(e.target.value)} placeholder="0" required/>
                    <CLabel>Deskripsi</CLabel>
                     <CInput type="text" value={props.desc} onChange={(e) => props.setDesc(e.target.value)} placeholder="Hadiah" required/>
                    <CLabel>Tanggal Kadaluarsa</CLabel>
                     <CInput type="date" value={props.exp} onChange={(e) => props.setExp(e.target.value)} required/>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={(e) => props.updateDB()}>{props.isChange===true?"Ubah Resi":"Kirim"}</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddPoint
