/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from 'react'
import {reCreate} from '../../services/Token'
import {fUpload} from '../../services/FileManager'
import Select from 'react-select';

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
    const [files, setFiles] = useState([])
    const [files1, setFiles1] = useState()
    const [imageUpdate, setImageUpdate] = useState(false)
    const [ previewImage, setPreviewImage ] = useState('avatars/default.jpg')
    const [ imageUpload, setImageUpload] = useState("")
    
    useEffect(() => {
        setPreviewImage(props.imageUpdate)
      }, [props])
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
                await fUpload(files[0].file, '../../../cdn/categories/').then(({status, url}) =>{
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
                // console.log(files1)
                // console.log(previewImage)
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
            onClose={() => props.setEdit(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Subkategori</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="12" md="12">
                    <CForm action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CLabel >Kategori Utama</CLabel>
                                <Select
                                    options={props.categories}
                                    placeholder="Pilih Kategori"
                                    onChange={(e) => props.setSelectedCategory(e.target)}
                                    value={props.selectedCategory}
                                />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CLabel >Nama</CLabel>
                                <CInput type="hidden" value={props.idUpdate} />
                                <CInput type="text" placeholder="e.g. : asian, european, etc" value={props.nameUpdate} onChange={(e)=> props.setNameUpdate(e.target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >No. Urut</CLabel>
                                    <CInput id="sequence" type="number" placeholder="e.g. : Baju anak, celana" value={props.sequenceUpdate} onChange={(e)=> props.setSequenceUpdate(e.target.value)} />
                                </CCol>
                        </CFormGroup>
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
                                            allowMultiple={true}
                                            maxFiles={1}
                                            allowFileSizeValidation={true}
                                            maxFileSize='1MB'
                                            labelMaxFileSizeExceeded='File is too large'
                                            allowImageValidateSize={true}
                                            imageValidateSizeMaxWidth={500}
                                            imageValidateSizeMaxHeight={500}
                                            imageValidateSizeMinHeight={500}
                                            imageValidateSizeMinWidth={500}
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
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton color="danger"  disabled={props.idUpdate==='6'?true:false} onClick={() => props.deleteCat()}>Hapus</CButton>
              <CButton color="primary" onClick={() => handleUpdate()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
