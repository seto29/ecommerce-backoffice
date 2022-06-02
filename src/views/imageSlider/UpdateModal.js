/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from 'react'
import {reCreate} from '../../services/Token'
import Select from 'react-select';
import {fUpload} from '../../services/FileManager'
import {
    CCol,
    CRow,
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
    CImg,
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

function UpdateModal(props) {
    console.log(props)
    const [files, setFiles] = useState([])
    const [files1, setFiles1] = useState()
    const [imageUpdate, setImageUpdate] = useState(false)
    const [ previewImage, setPreviewImage ] = useState('avatars/default.jpg')
    const [ imageUpload, setImageUpload] = useState("")
    
    useEffect(() => {
        setPreviewImage(props.imageUpdate)
      }, [props])
    useEffect(() => {
        setImageUpdate(false)
      }, [])
    function handleChangeImage(img){
        {
            img.target.files[0]?
            setFiles1(img)
            :
            setFiles1('avatars/default.jpg')
        }
    }

    function imageSetter(img){
        setPreviewImage(URL.createObjectURL(img.target.files[0]))
        setImageUpload(img.target.files[0])
    }

    async function handleUpdate(){
        if(imageUpdate===true){
                let j = 0;
                await fUpload(files[0].file, '../../../cdn/ads/').then(({status, url}) =>{
                    if(status===401){
                        reCreate().then(({status})=>{
                            if(status===200){
                                handleUpdate()
                            }
                        })
                    }
                    
                    if(status===200){
                        props.update(url)
                        setImageUpload("")
                        props.setEdit(false)
                        setPreviewImage("avatars/default.jpg")
                    }
                    setImageUpdate(false)
                })
            }else{
                console.log(files1)
                console.log(previewImage)
                if(previewImage===props.imageUpdate){
                    props.update(previewImage)
                    setImageUpload("")
                    props.setEdit(false)
                }else{
                    props.update("")
                    setImageUpload("")
                    props.setEdit(false)
                }
            }
            setFiles([])
            setFiles1([])
            setImageUpdate(false)
    }

    return (
        <>
        <CModal
            show={props.edit}
            onClose={() =>{ 
                setImageUpdate(false)
                props.setEdit(false)}}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Gambar Slider</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="12" md="12">
                    <CForm action="" method="post" className="form-horizontal">
                        {
                                imageUpdate?
                                <CFormGroup row>
                                    <CCol md="3">
                                    </CCol>
                                    <CCol xs="12" md="12">
                                        <CLabel >Gambar</CLabel>
                                        <CButton color="danger" style={{width:'100%', marginBottom:"1vh"}} onClick={() => setImageUpdate(false)}>Batal</CButton>
                                    </CCol>
                                    <CCol xs="12" md="12">
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
                                    </CCol>
                                </CFormGroup>
                                :
                                <>
                                <CLabel >Gambar</CLabel>
                                <CFormGroup row align='center'>
                                    
                                    <CRow>
                                    <CCol align='center' xs="6" md="6" align='right'>
                                        <CImg
                                            src={previewImage}
                                            style={{width:'50%'}}
                                            alt={previewImage}
                                            />
                                    </CCol>
                                    <CCol xs='6' md='6' align='left' style={{paddingLeft:0}}>
                                            <CButton color="primary" style={{width:'50%'}} onClick={() => setImageUpdate(true)}>Ubah Gambar</CButton>
                                            <CFormText style={{width:'50%'}}> Format gambar .jpg .jpeg .png .webp dan ukuran 500 x 500 px.</CFormText>
                                        </CCol>
                                    </CRow>
                                    
                                    
                                </CFormGroup>
                                </>
                            }
                            
                        <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >No. Urut</CLabel>
                                    <CInput id="sequence" type="number" placeholder="e.g. : Baju anak, celana" value={props.sequenceUpdate} onChange={(e)=> props.setSequenceUpdate(e.target.value)} />
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
                                                    <CInputRadio value="0" name="gender" checked={props.typeUpdate==="0"?true:false} onChange={(e)=>{
                                                        props.setLinkUpdate("")
                                                        props.setProductUpdate({})
                                                        props.setCategoryUpdate({})
                                                        props.setTypeUpdate(e.target.value)}}/>
                                                    <CLabel>tidak ada link</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="1" name="gender" checked={props.typeUpdate==="1"?true:false} onChange={(e)=>{
                                                        props.setLinkUpdate("")
                                                        props.setProductUpdate({})
                                                        props.setCategoryUpdate({})
                                                        props.setTypeUpdate(e.target.value)}}/>
                                                    <CLabel>link external</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="2" name="gender" checked={props.typeUpdate==="2"?true:false} onChange={(e)=>{
                                                        props.setLinkUpdate("")
                                                        props.setProductUpdate({})
                                                        props.setCategoryUpdate({})
                                                        props.setTypeUpdate(e.target.value)}}/>
                                                    <CLabel>link produk</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow className="px-2">
                                                <CCol>
                                                    <CInputRadio value="3" name="gender" checked={props.typeUpdate==="3"?true:false} onChange={(e)=>{
                                                        props.setLinkUpdate("")
                                                        props.setProductUpdate({})
                                                        props.setCategoryUpdate({})
                                                        props.setTypeUpdate(e.target.value)}}/>
                                                    <CLabel>link Kategori</CLabel>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                </CCol>
                            </CFormGroup>
                            
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.typeUpdate==="1"?false:true}>
                                    <CLabel >Link External</CLabel>
                                    <CInput type="text" placeholder="https://hijiofficial.com/" value={props.linkUpdate} onChange={(e)=> props.setLinkUpdate(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.typeUpdate==="3"?false:true}>
                                    <CLabel >Pilih Kategori</CLabel>
                                    
                                    <Select
                                        options={props.categoriesS}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => props.setCategoryUpdate(e.target)}
                                        value={props.categoryUpdate}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12" hidden={props.typeUpdate==="2"?false:true}>
                                    <CLabel >Pilih Barang</CLabel>
                                    
                                    <Select
                                        options={props.products}
                                        placeholder="Pilih Kategori"
                                        onChange={(e) => props.setProductUpdate(e.target)}
                                        value={props.productUpdate}
                                    />
                                </CCol>
                            </CFormGroup>
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton color="danger"  onClick={() => props.deleteCat()}>Hapus</CButton>
              <CButton color="primary" disabled={props.typeUpdate==='0' || props.typeUpdate==="2" && typeof props.productUpdate.id==='string' || props.typeUpdate==="3" && typeof props.categoryUpdate.value==='string' || props.typeUpdate==="1" && props.linkUpdate!==''?false:true} onClick={() => handleUpdate()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => {
                    setImageUpdate(false)
                    props.setEdit(false)}}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
