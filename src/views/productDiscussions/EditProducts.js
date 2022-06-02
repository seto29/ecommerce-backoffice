import React, { useEffect, useState } from 'react'
// import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import {Link} from 'react-router-dom'
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'
import './style.css'
import Toaster from '../components/Toaster'
// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'



import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
    CTextarea,
    CFormText,
    CCardFooter,
    CBadge,
    CImg,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CInputCheckbox
} from '@coreui/react'

import { fDelete, fUpdate, fInsertReplies} from '../../services/Products'
import {getByID} from '../../services/Discussions'
import {getAll} from '../../services/Warranty'
import {fUpload} from '../../services/FileManager'
import {getDropdown} from '../../services/Categories'
import CIcon from '@coreui/icons-react';
import {reCreate} from '../../services/Token'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize)


const initialAddV = {name:'', stock:0, price:0}
const initAddVG = {name:'', is_required:0, initAddV:[initialAddV]}

const EditProducts = (props) => {
    const [files, setFiles] = useState([])
    const [files1, setFiles1] = useState([])
    const [imageUpdate, setImageUpdate] = useState(false)
    const [toasts, setToasts] = useState([])
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [ urls, setUrls]=useState([])
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [categories, setCategories] = useState([]);
    const [products] = useState([]);
    const [warranty, setWarranty] = useState([])
    const [toastM, setToastM] = useState("")
    const [sku, setSKU] = useState("")
    const [cID, setCID] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cogs, setCOGS] = useState("")
    const [price, setPrice] = useState("")
    const [point, setPoint] = useState("")
    const [stock, setStock] = useState("")
    const [selectedWarranty, setSelectedWarranty] = useState({label: "Tidak Bergaransi", value: 0})
    const [selectedWeight, setSelectedWeight] = useState({label: "Gram (g)", value: 1})
    const [length, setLength] = useState("")
    const [weight, setWeight] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [buttonTitle, setButtonTitle] = useState("Simpan")
    const [buttonDisable, setButtonDisable] = useState(false)
    const [show, setShow] = useState(false)
    const [VG, setVG] = useState([initAddVG])
    const [addVG, setAddVG] = useState(false)
    const [discus, setDiscus] = useState([])
    const [data, setData]=useState([])
    const [replies, setReplies]=useState("")

    let dis = false
    
    const weightOptions = [
    { value: 1, label: 'Gram (g)' },
    { value: 2, label: 'Kilogram (kg)' },
    ]

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }
    
    async function update(){
        let vg1 = JSON.stringify(VG)
        setButtonDisable(true)
        setButtonTitle("Sedang Di Proses")
        await uploadImage().then((urlsTemp)=>{
            fUpdate(JSON.stringify(urlsTemp), sku, cID.value, name, description, cogs, price, point, stock, selectedWarranty.value, selectedWeight.value, weight, length, width, height, props.match.params.id, vg1, addVG).then(({status})=>{
                if(status===200){
                    setToastM('update')
                    addToast()
                    setTimeout(
                        function () {
                            props.history.push('/products')
                        }, 1000
                    )
                }else if(status===401){
                    reCreate().then(({status})=>{
                        if(status===200){
                            update()
                        }
                      })
                }else{
                    setToastM('failed')
                    addToast() 
                    setButtonDisable(false)
                    setButtonTitle("Simpan")
                }
            })
        })
    }

    async function deleteP(e){
         await   fDelete(props.match.params.id).then(({status})=>{
                if(status===200){
                    setToastM('delete')
                    addToast()
                    setTimeout(
                        function () {
                            props.history.push('/products')
                        }, 1000
                    )
                }else if(status===401){
                    reCreate().then(({status})=>{
                        if(status===200){
                            update()
                        }
                      })
                }else{
                    setToastM('failed')
                    addToast()
                }
                setShow(false)
            })
    }

    async function uploadImage(){
        let urlsTemp = []
        if(imageUpdate===true){

            if(files.length>0){
                let i = 0;
                let j = 0;
                while(i<files.length){
                    await fUpload(files[i].file, '../../../cdn/products/').then(({status, url}) =>{
                        if(status===200){
                            urlsTemp[ j ] = {
                                url: url
                            }
                            j++;
                            return j;
                        }
                    })
                    i+=1
                }
                setUrls(urlsTemp)
            }
            console.log("a")
            return urlsTemp
        }else{
            console.log("b")
            setUrls(files1)
            return files1
        }
    }

    async function fetchCategories() {
        const response = await getDropdown()
        setCategories(response)
    }

    async function fetchProduct(id) {
        const response = await getByID(id)
        if(response.success===1){
            setDiscus(response.discussions)
            setData(response.data)
        }
    }

    async function fetchWarranty() {
        const response = await getAll()
        setWarranty(response)
    }

    useEffect(() => {
        fetchWarranty()
        fetchCategories()
        fetchProduct(props.match.params.id)
    }, [props.match.params.id])


    // async function update(){
    //     let skuRegistered = false
    //     products.forEach(element => {
    //         if(sku===element.sku){
    //             skuRegistered = true
    //         }
    //     });

    //     if(skuRegistered===false){
    //         const response = await fInsert(name, sku, cID, cogs, price, stock)
    //         if(response.success ===1) {
    //             setSKU("")
    //             setName("")
    //             setCID("")
    //             setCOGS("")
    //             setPrice("")
    //             setStock("")
    //             setCName("")
    //             setToastM("update")
    //         }else{
    //             setToastM("failed")
    //         }
    //         addToast()
    //     }else{
    //         alert("SKU SUDAH TERDAFTAR")
    //     }
    // }

    const handleRemoveClick = index => {
        const list = [...VG];
        list.splice(index, 1);
        setVG(list);
      };

    const handleRemoveClick1 = (index, j) => {
        const list = [...VG];
        list[index]['initAddV'].splice(j, 1);
        setVG(list);
      };
     
      // handle click event of the Add button
      const handleAddClick1 = (i,j) => {
          let initialAddV1 = {name:'', stock:0, price:0}
          let initAddVG1 = {name:'', is_required:0, initAddV:[initialAddV1]}
          const a = [...VG]
          const b = VG[i]
          b['initAddV'].push(initialAddV1)
          a[i]=b
          console.log(b)
          console.log(a[0])
          console.log(a[1])
            setVG(a);
      };

      const handleAddClick = () => {
        let initialAddV1 = {name:'', stock:0, price:0}
        let initAddVG1 = {name:'', is_required:0, initAddV:[initialAddV1]}
        setVG([...VG, initAddVG1]);
      };

      const handleInputChange = (e, index) => {
          if(e.target.name==="is_required"){
              const list = [...VG];
              const value = e.target.value===0 || e.target.value==="0"?1:0
              list[index]["is_required"] = value;
              setVG(list);
          }else{
              const { name, value } = e.target;
              const list = [...VG];
              list[index][name] = value;
              setVG(list);
          }
      };

      const handleInputChange1 = (e, index, j) => {
          console.log(e.target)
              const { name, value } = e.target;
              const list = [...VG];
              list[index]['initAddV'][j][name] = value;
              console.log(list)
              setVG(list);
      };

    const handleError=(err)=>{
        console.error(err)
    }

    const handleAddReply=(content, id, i)=>{
        fInsertReplies(id, content).then(({status})=>{
                if(status===200){
                    setToastM('insert')
                    addToast()
                    setReplies("")
                    setTimeout(
                        function () {
                            window.location.reload()
                        }, 1000
                    )
                
                }else{
                    setToastM('failed')
                    addToast() 
                    setButtonDisable(false)
                    setButtonTitle("Simpan")
                }
            })
    }

    const handleScan=(data)=>{
        setSKU(data)
    }

    return (
       <>
       <Toaster
            toaster={toasts}
            toastM={toastM}
        />
        <CModal
                show={show}
                onClose={() => setShow(false)}
                size="sm"
                closeOnBackdrop={false}
            >
                <CModalHeader>
                    <CModalTitle>Konfrimasi</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Apakah anda yakin?
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShow(false)}>Tidak</CButton>
                    <CButton color="primary" onClick={(e) => deleteP(e)}>Ya</CButton>{' '}
                </CModalFooter>
            </CModal>
       <CCard>
            <CCardHeader>
                <h5>Informasi Produk</h5>
            </CCardHeader>
            <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                    
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Nama</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea type="text" disabled placeholder="Kantong Plastik Duo" value={data[0]?data[0].product_name:''} onChange={(e)=> setName(e.target.value)} />

                        </CCol>
                    </CFormGroup>
                </CForm>
            </CCardBody>
        </CCard>
       <CCard>
            <CCardHeader>
                <h5>Diskusi Produk</h5>
            </CCardHeader>
            <CCardBody>
                <div>
                                <CFormGroup row>
                                    <CCol xs="10">
                                        <p style={{textAlign:"left"}}>{data[0]?data[0].user_name:""} ({data[0]?data[0].created_at:""})</p>
                                        <CTextarea disabled defaultValue={data[0]?data[0].content:""}/>
                                        
                                        
                                    </CCol>
                                </CFormGroup>
                                <br/>
                            </div>
                {
                    discus.map((x, i)=>{
                        console.log(x)
                        // replies[i]=""
                        return(
                            <div key={i}>
                                <CFormGroup row>
                                    <CCol xs="2">
                                    </CCol>
                                    <CCol xs="10">
                                        <p style={{textAlign:"right"}}>{x.name} ({x.created_at})</p>
                                        <CTextarea disabled defaultValue={x.content}/>
                                        
                                        
                                    </CCol>
                                </CFormGroup>
                                <br/>
                            </div>
                        )
                    })
                }
                <div style={{paddingTop:'5px'}}>
                                            <CFormGroup row>
                                                <CCol xs="2">
                                                </CCol>
                                                <CCol xs="10">
                                                    <CTextarea value={replies} onChange={(e)=>setReplies(e.target.value)} placeholder="Masukkan Balasan Diskusi"/>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row >
                                                
                                                <CCol xs="12" style={{ justifyContent: 'space-between', textAlign:'right'}} >
                                                    {" "}
                                                    <CButton style={{backgroundColor:'blue',color:'white'}} onClick={(e)=>handleAddReply(replies,props.match.params.id)}>Balas</CButton>
                                                    {/* <CButton style={{backgroundColor:'red',color:'white'}} onClick={(e)=>replies[i]=""}>Bersihkan</CButton> */}
                                                </CCol>
                                            </CFormGroup>
                                        </div>
            </CCardBody>
        </CCard>
        </>
    )
};

export default EditProducts
