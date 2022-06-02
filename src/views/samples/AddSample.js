import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import {Link} from 'react-router-dom'
import { FilePond, registerPlugin } from 'react-filepond'
import './style.css'
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css'
import {reCreate} from '../../services/Token'
import {fUpload} from '../../services/FileManager'
import imageCompression from 'browser-image-compression';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import Toaster from '../components/Toaster'

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
    CInputGroup,
    CInputGroupText,
    CTextarea,
    CFormText,
    CCardFooter,
    CBadge,
} from '@coreui/react'

import {fInsert} from '../../services/Samples'
import {getAll} from '../../services/Warranty'
import {getDropdown} from '../../services/Categories'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize, FilePondPluginFileRename)
const uuidv1 = require('uuid/v1');
const initialAddV = {name:'', stock:0, price:0, box_stock:0, ball_stock:0, pack_stock:0}
const initAddVG = {name:'', is_required:0, initAddV:[initialAddV]}
const initAddW = {minimum_qty:0, price:0}

const AddSamples = (props) => {
    
    let dayBefore = new Date();
    
    let dayBeforeMonth = dayBefore.getMonth()+1 ;
    let dayBeforeYear = dayBefore.getFullYear();
    let dayBeforeDate = dayBefore.getDate();
    let defaultExp = dayBeforeYear+"-"+dayBeforeMonth+"-"+dayBeforeDate;
    const [toastM, setToastM] = useState("")
    const [files, setFiles] = useState([])
    const [toasts, setToasts] = useState([])
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [categories, setCategories] = useState([]);
    const [samples] = useState([]);
    const [warranty, setWarranty] = useState([])
    const [ urls, setUrls]=useState([])
    const [sku, setSKU] = useState("")
    const [selectedCategory, setSelectedCategory] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cogs, setCOGS] = useState("")
    const [price, setPrice] = useState("")
    const [point, setPoint] = useState("")
    const [stock, setStock] = useState("")
    const [weight, setWeight] = useState("")
    const [selectedWarranty, setSelectedWarranty] = useState({label: "Tidak Bergaransi", value: 0})
    const [selectedWeight, setSelectedWeight] = useState({label: "Gram (g)", value: 1})
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [pack_length, setPack_Length] = useState("")
    const [pack_width, setPack_Width] = useState("")
    const [pack_height, setPack_Height] = useState("")
    const [box_length, setBox_Length] = useState("")
    const [box_width, setBox_Width] = useState("")
    const [box_height, setBox_Height] = useState("")
    const [ball_length, setBall_Length] = useState("")
    const [ball_width, setBall_Width] = useState("")
    const [ball_height, setBall_Height] = useState("")
    const [VG, setVG] = useState([initAddVG])
    const [IW, setIW ] = useState([initAddW])
    const [buttonTitle, setButtonTitle] = useState("Simpan")
    const [buttonDisable, setButtonDisable] = useState(false)
    const [addVG, setAddVG] = useState(false)
    const [isWholesale, setIsWholesale] = useState(false)
    const [packStock, setPackStock] = useState("")
    const [boxStock, setBoxStock] = useState("")
    const [ballStock, setBallStock] = useState("")
    const [packPrice, setPackPrice] = useState("")
    const [boxPrice, setBoxPrice] = useState("")
    const [ballPrice, setBallPrice] = useState("")
    const [boxWeight, setBoxWeight] = useState("")
    const [packWeight, setPackWeight] = useState("")
    const [ballWeight, setBallWeight] = useState("")
    const [wholeSalediscount, setWholeSaleDiscount] = useState("0")
    const [selectedBoxWeight, setSelectedBoxWeight] = useState({label: "Gram (g)", value: 1})
    const [selectedBallWeight, setSelectedBallWeight] = useState({label: "Gram (g)", value: 1})
    const [selectedPackWeight, setSelectedPackWeight] = useState({label: "Gram (g)", value: 1})
    const [isPO,setIsPO]=useState(false)
    const [po, setPO]=useState(0)

    let dis1 = false
    
    let dis = false;
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

    useEffect(()=>{
        setIsWholesale(false)
    },[])
    
    async function insert(bool){
        console.log(po)
        console.log(isPO)
        let vg1 = JSON.stringify(VG)
        let addVG1 = 0
        if(addVG===true){
            addVG1=1
        }
        setButtonDisable(true)
        setButtonTitle("Sedang Di Proses")
        await uploadImage().then((urlsTemp)=>{
            fInsert(JSON.stringify(urlsTemp), sku, selectedCategory.value, name, description, cogs, price, point, stock, selectedWarranty.value, selectedWeight.value, weight, length, width, height, vg1, addVG1, boxPrice, ballPrice, boxStock, ballStock, box_length, box_width, box_height, ball_length, ball_width, ball_height, boxWeight, ballWeight, selectedBoxWeight.value, selectedBallWeight.value, wholeSalediscount,  packPrice, packStock, pack_length, pack_width, pack_height, packWeight, selectedPackWeight.value, JSON.stringify(IW), isWholesale, po, isPO ).then(({status})=>{
                if(status===200){
                    setToastM('insert')
                    addToast()
                    if(bool===false){
                        setFiles([])
                        setSKU('')
                        setName('')
                        setDescription('')
                        setCOGS('')
                        setIsWholesale(false)
                        setIW([initAddW])
                        setPrice('')
                        setPoint('')
                        setStock('')
                        setWeight('')
                        setWidth('')
                        setLength('')
                        setHeight('')
                        setSelectedCategory({})
                        setSelectedWarranty({})
                        setSelectedWeight({})
                        setSelectedBoxWeight({})
                        setSelectedBallWeight({})
                        setBoxPrice("")
                        setBallPrice("")
                        setBoxStock("")
                        setBallStock("")
                        setBox_Length("")
                        setBox_Width("")
                        setBox_Height("")
                        setBall_Length("")
                        setBall_Width("")
                        setBall_Height("")
                        setIsPO(false)
                        setPO(0)
                        
                        setButtonDisable(false)
                        dis1=false
                        setIsWholesale(false)
                        setButtonTitle("Simpan")
                    }else{
                        setTimeout(
                            function () {
                                props.history.push('/samples')
                            }, 1000
                        )
                    }
                }else if(status===401){
                    reCreate().then(({status})=>{
                        if(status===200){
                            insert(bool)
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

    async function uploadImage(){
        const options = { 
            maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
            maxWidthOrHeight: 512,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
        }
        let urlsTemp = []
        if(files.length>0){
            let i = 0;
            let j = 0;
            while(i<files.length){
                const compressedFile = await imageCompression(files[i].file, options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                await fUpload(compressedFile, '../../../cdn/samples/').then(({status, url}) =>{
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
        }
        setUrls(urlsTemp)
        return urlsTemp
    }


    async function fetchCategories() {
        const response = await getDropdown()
        setCategories(response)
    }
    async function fetchWarranty() {
        const response = await getAll()
        console.log(response[0])
        setWarranty(response)
    }

    useEffect(() => {
        fetchWarranty()
        fetchCategories()
    }, [])


    // async function insert(bool){
    //     let skuRegistered = false
    //     samples.forEach(element => {
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
    //             setToastM("insert")
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

    const handleRemoveClick2 = index => {
        const list = [...IW];
        list.splice(index, 1);
        setIW(list);
      };

    const handleRemoveClick1 = (index, j) => {
        const list = [...VG];
        list[index]['initAddV'].splice(j, 1);
        setVG(list);
      };
     
      // handle click event of the Add button
      const handleAddClick1 = (i,j) => {
          let initialAddV1 = {name:'', stock:0, price:0, box_stock:0, ball_stock:0, pack_stock:0}
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

      const handleAddClick2 = () => {
        let initAddIW = {minimum_qty:0, price:0}
        setIW([...IW, initAddIW]);
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

      const handleInputChange2 = (e, index) => {
              const { name, value } = e.target;
              const list = [...IW];
              list[index][name] = value;
              setIW(list);
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

    const handleScan=(data)=>{
        setSKU(data)
    }

    return (
       <>
       <Toaster
            toaster={toasts}
            toastM={toastM}
        />
       <CCard>
            <CCardHeader>
                <h5>Informasi Produk</h5>
            </CCardHeader>
            <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Foto</CLabel>
                            &nbsp;
                            <CBadge color="secondary">Wajib</CBadge>
                        </CCol>
                        <CCol xs="12" md="9">
                            <FilePond
                                instantUpload={false}
                                files={files}
                                onupdatefiles={setFiles}
                                allowMultiple={true}
                                maxFiles={5}
                                allowFileSizeValidation={true}
                                maxFileSize='1MB'
                                labelMaxFileSizeExceeded='File is too large'
                                allowImageValidateSize={true}
                                imageValidateSizeMaxWidth={800}
                                imageValidateSizeMaxHeight={800}
                                imageValidateSizeMinHeight={800}
                                imageValidateSizeMinWidth={800}
                                // server="/api"
                                    allowFileRename={true}
                                    fileRenameFunction={file => {
                                        return `${defaultExp+ '_' + uuidv1()}${file.extension}`;
                                    }}
                                name="files"
                                labelIdle='Drag & Drop gambar atau <span class="filepond--label-action">Browse</span>'
                            />
                            {/* <CInput type="text" value={sku} onChange={(e)=> setSKU(e.target.value)} /> */}
                            <CFormText>Format gambar .jpg .jpeg .png .webp dan ukuran 800 x 800 px.</CFormText>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Nama</CLabel>
                            &nbsp;
                            <CBadge color="secondary">Wajib</CBadge>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" placeholder="Kantong Plastik Duo" value={name} onChange={(e)=> setName(e.target.value)} />
                            <CFormText>Masukkan nama yang deskriptif karena mempengaruhi hasil pencarian customer</CFormText>

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Deskripsi</CLabel>
                            &nbsp;
                            <CBadge color="secondary">Wajib</CBadge>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea type="text" placeholder="Kantong Plastik Duo
Ukuran : 28
Isi : 100 Lembar
Warna : Putih & Hitam" value={description} onChange={(e)=> setDescription(e.target.value)}
                            rows="5" />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Garansi</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <Select
                                options={warranty}
                                placeholder="Pilih Garansi"
                                value={selectedWarranty}
                                onChange={(e) => setSelectedWarranty(e.target)}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Berat</CLabel>
                            &nbsp;
                            <CBadge color="secondary">Wajib</CBadge>
                        </CCol>
                        <CCol xs="6" md="3">
                            <Select
                                options={weightOptions}
                                value= {selectedWeight}
                                placeholder="Pilih Satuan Berat"
                                onChange={(e) => setSelectedWeight(e)}
                            />
                        </CCol>
                        <CCol xs="6" md="6">
                            <CInput type="number" value={weight} onChange={(e)=> setWeight(e.target.value)} />
                            <CFormText>Masukkan berat dengan menimbang produk <b>setelah dikemas.</b></CFormText>

                        </CCol>
                        
                    </CFormGroup>
                    {/* <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Berat / Pack</CLabel>
                        </CCol>
                        <CCol xs="6" md="3">
                            <Select
                                options={weightOptions}
                                value= {selectedPackWeight}
                                placeholder="Pilih Satuan Berat"
                                onChange={(e) => setSelectedPackWeight(e)}
                            />
                        </CCol>
                        <CCol xs="6" md="6">
                            <CInput type="number" value={packWeight} onChange={(e)=> setPackWeight(e.target.value)} />
                            <CFormText>Masukkan berat dengan menimbang produk <b>setelah dikemas.</b></CFormText>

                        </CCol>
                        
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Berat / Dus</CLabel>
                        </CCol>
                        <CCol xs="6" md="3">
                            <Select
                                options={weightOptions}
                                value= {selectedBoxWeight}
                                placeholder="Pilih Satuan Berat"
                                onChange={(e) => setSelectedBoxWeight(e)}
                            />
                        </CCol>
                        <CCol xs="6" md="6">
                            <CInput type="number" value={boxWeight} onChange={(e)=> setBoxWeight(e.target.value)} />
                            <CFormText>Masukkan berat dengan menimbang produk <b>setelah dikemas.</b></CFormText>

                        </CCol>
                        
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Berat / Ball</CLabel>
                        </CCol>
                        <CCol xs="6" md="3">
                            <Select
                                options={weightOptions}
                                value= {selectedBallWeight}
                                placeholder="Pilih Satuan Berat"
                                onChange={(e) => setSelectedBallWeight(e)}
                            />
                        </CCol>
                        <CCol xs="6" md="6">
                            <CInput type="number" value={ballWeight} onChange={(e)=> setBallWeight(e.target.value)} />
                            <CFormText>Masukkan berat dengan menimbang produk <b>setelah dikemas.</b></CFormText>

                        </CCol>
                        
                    </CFormGroup> */}
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Dimensi</CLabel>
                            {/* <CFormText>Masukkan ukuran dengan mengukur produk <b>setelah dikemas</b> agar tidak terjadi selisih ongkir</CFormText> */}
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Panjang' value={length} onChange={(e) => setLength(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Lebar' value={width} onChange={(e) => setWidth(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Tinggi' value={height} onChange={(e) => setHeight(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Dimensi (Pack)</CLabel>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Panjang' value={pack_length} onChange={(e) => setPack_Length(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Lebar' value={pack_width} onChange={(e) => setPack_Width(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Tinggi' value={pack_height} onChange={(e) => setPack_Height(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Dimensi (Dus)</CLabel>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Panjang' value={box_length} onChange={(e) => setBox_Length(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Lebar' value={box_width} onChange={(e) => setBox_Width(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Tinggi' value={box_height} onChange={(e) => setBox_Height(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Dimensi (Ball)</CLabel>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Panjang' value={ball_length} onChange={(e) => setBall_Length(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Lebar' value={ball_width} onChange={(e) => setBall_Width(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol xs="4" md="3">
                            <CInputGroup className="input-prepend">
                                <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Tinggi' value={ball_height} onChange={(e) => setBall_Height(e.target.value)} />
                                <CInputGroupAppend>
                                    <CInputGroupText>cm</CInputGroupText>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CFormGroup> */}
                    {/* <CFormGroup row>
                        <CCol xs="3">
                            <CLabel htmlFor="name">Diskon Keseluruhan</CLabel>
                            <br/>
                            <p>Aktifkan jika diskon dapat berlaku pada setiap satuan produk</p>
                        </CCol>
                        <CCol xs="9">

                        <CInputCheckbox checked={wholeSalediscount==='1'?true:false} onClick={(e)=>{wholeSalediscount==='1'?setWholeSaleDiscount('0'):setWholeSaleDiscount('1')}}/>
                        </CCol>

                    </CFormGroup> */}
   {/* <CFormGroup row hidden={addVG}>
                        <CCol md="3">
                            <CLabel htmlFor="name">Stock (Pack)</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="number" value={packStock} onChange={(e)=> setPackStock(e.target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row hidden={addVG}>
                        <CCol md="3">
                            <CLabel htmlFor="name">Stock (Dus)</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="number" value={boxStock} onChange={(e)=> setBoxStock(e.target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row hidden={addVG}>
                        <CCol md="3">
                            <CLabel htmlFor="name">Stock (Bal)</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="number" value={ballStock} onChange={(e)=> setBallStock(e.target.value)} />
                        </CCol>
                    </CFormGroup> */}
               
                    
                </CForm>
            </CCardBody>
            <CCardFooter>
                <CRow>
                    {
                        dis===true?
                        <CCol xs="12" md="12" align="right">
                            <Link to="/samples"><CButton disabled={buttonDisable} onClick={() => console.log("batal")}>Batal</CButton></Link>{' '}
                            <CButton color="primary" disabled={buttonDisable} style={{backgroundColor:'gray'}}>{buttonDisable===false?"Simpan & Tambah baru":"Sedang Di Proses"}</CButton>{' '}
                            <CButton color="primary" disabled={buttonDisable} style={{backgroundColor:'gray'}}>{buttonTitle}</CButton>
                        </CCol>
                        :
                        dis1===true?
                        <CCol xs="12" md="12" align="right">
                            <Link to="/samples"><CButton disabled={dis1} onClick={() => console.log("batal")}>Batal</CButton></Link>{' '}
                            <CButton color="primary" disabled={dis1} onClick={() => insert(false)}>Harga Grosir Harus Lebih Rendah Dari Harga Satuan</CButton>
                        </CCol>
                        :
                        <CCol xs="12" md="12" align="right">
                            <Link to="/samples"><CButton disabled={buttonDisable} onClick={() => console.log("batal")}>Batal</CButton></Link>{' '}
                            <CButton color="primary" disabled={buttonDisable} onClick={() => insert(false)}>{buttonDisable===false?"Simpan & Tambah baru":"Sedang Di Proses"}</CButton>{' '}
                            <CButton color="primary" disabled={buttonDisable} onClick={() => insert(true)}>{buttonTitle}</CButton>
                        </CCol>
                    }
                </CRow>
            </CCardFooter>
        </CCard>-
        </>
    )
};

export default AddSamples
