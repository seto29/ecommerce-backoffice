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
            await fUpload(files[0].file, '../../../cdn/subcategories/').then(({status, url}) =>{
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
                onClose={() => props.setShowAddModal(false)}
                size="lg"
                scrollable={false}
            >
                <CModalHeader >
                    <CModalTitle>Subkategori Baru</CModalTitle>
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
                                    <CInput type="text" placeholder="e.g. : Baju anak, celana" value={props.name} onChange={(e)=> props.setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel >No. Urut</CLabel>
                                    <CInput type="number" placeholder="e.g. : Baju anak, celana" value={props.sequence} onChange={(e)=> props.setSequence(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                    </CCol>
                                    <CCol xs="12" md="12">
                                        <CLabel >Gambar</CLabel>
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
                                        <CFormText>Format gambar .jpg .jpeg .png .webp dan ukuran 500 x 500 px.</CFormText>
                                    </CCol>
                                </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => handleInsert()}>Simpan</CButton>{' '}
                    <CButton color="danger" onClick={(e) => handleCloseModal(e)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
