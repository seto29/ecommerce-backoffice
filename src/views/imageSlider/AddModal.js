import React, { useState } from 'react'
import {reCreate} from '../../services/Token'
import {fUpload} from '../../services/FileManager'
import Select from 'react-select';
import {
    CCol,
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
    CInputRadio,
    CRow,
    CFormText
} from '@coreui/react'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { FilePond, File, registerPlugin } from 'react-filepond'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize)


function AddModal(props) {
    console.log(props.category)
    console.log(typeof props.category.value)
    const [files, setFiles] = useState([])
    const [ previewImage, setPreviewImage ] = useState('avatars/default.jpg')
    const [ imageUpload, setImageUpload] = useState("")

    function handleChangeImage(img){
        {
            img.target.files[0]?
            imageSetter(img)
            :
            setPreviewImage('avatars/default.jpg')
        }
    }

    function imageSetter(img){
        setPreviewImage(URL.createObjectURL(img.target.files[0]))
        setImageUpload(img.target.files[0])
    }

    function handleCloseModal(e){
        if(e.type==='click'){
            props.setName('')
            setPreviewImage('avatars/default.jpg')
            setImageUpload("")
            props.setShowAddModal(false)
        }
    }

    async function handleInsert(){
        if(files.length>0){
            await fUpload(files[0].file, '../../../cdn/ads/').then(({status, url}) =>{
                        if(status===401){
                            reCreate().then(({status})=>{
                                if(status===200){
                                    handleInsert()
                                }
                            })
                        }
            
                        if(status===200){
                            props.insert(url)
                            setImageUpload("")
                            setFiles([])
                            setPreviewImage("avatars/default.jpg")
                        }else{
                            props.setToastM("failed")
                            props.addToast()
                        }
                    })
        }else{
            props.insert("")
        }
    }
    return (
        <>
            <CModal
                show={props.showAddModal}
                onClose={() => {props.setShowAddModal(false)
                    props.setType("0")}}
                size="lg"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Gambar Slider Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol md="3">
                                    </CCol>
                                    <CCol xs="12" md="12">
                                        <CLabel >Gambar</CLabel>
  
                                        <FilePond
                                            instantUpload={false}
                                            files={files}
                                            onupdatefiles={setFiles}
                                            allowMultiple={false}
                                            maxFiles={1}
                                            // server="/api"
                                            name="files"
                                            labelIdle='Drag & Drop gambar atau <span class="filepond--label-action">Browse</span>'
                                        />
                                        <CFormText>Format gambar .jpg .jpeg .png .webp dan ukuran 500 x 500 px.</CFormText>
                                    </CCol>
                                </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >No. Urut</CLabel>
                                    <CInput type="number" placeholder="e.g. : 1" value={props.sequence} onChange={(e)=> props.setSequence(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="sequenceAdd">Link</CLabel>
                                </CCol>
                                <CCol xs="12">
                                        <CCol xs="12">
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="0" name="gender" checked={props.type==="0"?true:false} onChange={(e)=>{
                                                        props.setLink("")
                                                        props.setProduct({})
                                                        props.setCategory({})
                                                        props.setType(e.target.value)}}/>
                                                    <CLabel>tidak ada link</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="1" name="gender" checked={props.type==="1"?true:false} onChange={(e)=>{
                                                        props.setLink("")
                                                        props.setProduct({})
                                                        props.setCategory({})
                                                        props.setType(e.target.value)}}/>
                                                    <CLabel>link external</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="2" name="gender" checked={props.type==="2"?true:false} onChange={(e)=>{
                                                        props.setLink("")
                                                        props.setProduct({})
                                                        props.setCategory({})
                                                        props.setType(e.target.value)}}/>
                                                    <CLabel>link produk</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="3" name="gender" checked={props.type==="3"?true:false} onChange={(e)=>{
                                                        props.setLink("")
                                                        props.setProduct({})
                                                        props.setCategory({})
                                                        props.setType(e.target.value)}}/>
                                                    <CLabel>link Kategori</CLabel>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                </CCol>
                            </CFormGroup>
                            
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.type==="1"?false:true}>
                                    <CLabel >Link External</CLabel>
                                    <CInput type="text" placeholder="https://hijiofficial.com/" value={props.link} onChange={(e)=> props.setLink(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.type==="3"?false:true}>
                                    <CLabel >Pilih Kategori</CLabel>
                                    
                                    <Select
                                        options={props.categoriesS}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => props.setCategory(e.target)}
                                        value={props.category}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.type==="2"?false:true}>
                                    <CLabel >Pilih Barang</CLabel>
                                    
                                    <Select
                                        options={props.products}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => props.setProduct(e.target)}
                                        value={props.product}
                                    />
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" disabled={props.type==='0' || props.type==="2" && typeof props.product.id==='string' || props.type==="3" && typeof props.category.value==='string' || props.type==="1" && props.link!==''?false:true} onClick={() => handleInsert()}>Simpan</CButton>{' '}
                    <CButton color="danger" onClick={(e) =>{ handleCloseModal(e)
                    props.setType("0")}}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
