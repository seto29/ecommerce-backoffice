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

import { fDelete,  fInsert, getByID} from '../../services/Products'
import { fUpdate} from '../../services/StockChanges'
import {getAll} from '../../services/Warranty'
import {fUpload} from '../../services/FileManager'
import {getDropdown} from '../../services/Categories'
import CIcon from '@coreui/icons-react';
import {reCreate} from '../../services/Token'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize)


const initialAddV = {name:'', stock:0, price:0, box_stock:0, ball_stock:0}
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
    const [stockBefore, setStockBefore] = useState("")
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
    const [boxStock, setBoxStock] = useState("")
    const [ballStock, setBallStock] = useState("")
    const [boxStockBefore, setBoxStockBefore] = useState("")
    const [packStockBefore, setPackStockBefore] = useState("")
    const [ballStockBefore, setBallStockBefore] = useState("")
    const [boxPrice, setBoxPrice] = useState("")
    const [ballPrice, setBallPrice] = useState("")
    const [boxWeight, setBoxWeight] = useState("")
    const [ballWeight, setBallWeight] = useState("")
    const [selectedBoxWeight, setSelectedBoxWeight] = useState({label: "Gram (g)", value: 1})
    const [selectedBallWeight, setSelectedBallWeight] = useState({label: "Gram (g)", value: 1})
    const [box_length, setBox_Length] = useState("")
    const [box_width, setBox_Width] = useState("")
    const [box_height, setBox_Height] = useState("")
    const [ball_length, setBall_Length] = useState("")
    const [ball_width, setBall_Width] = useState("")
    const [ball_height, setBall_Height] = useState("")
    const [reason, setReason] = useState("")
    const [packStock, setPackStock] = useState("")
    const [pack_length, setPack_Length] = useState("")
    const [pack_width, setPack_Width] = useState("")
    const [pack_height, setPack_Height] = useState("")
    const [packPrice, setPackPrice] = useState("")
    const [packWeight, setPackWeight] = useState("")
    const [selectedPackWeight, setSelectedPackWeight] = useState({label: "Gram (g)", value: 1})

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
        let add = 0;
        if(addVG===true){
            add =1;
        }
        await uploadImage().then((urlsTemp)=>{
            fUpdate(JSON.stringify(urlsTemp), sku, cID.value, name, description, cogs, price, point, stock, selectedWarranty.value, selectedWeight.value, weight, length, width, height, props.match.params.id, vg1, add, boxPrice, ballPrice, boxStock, ballStock, box_length, box_width, box_height, ball_length, ball_width, ball_height, boxWeight, ballWeight, selectedBoxWeight.value, selectedBallWeight.value, stockBefore, boxStockBefore, ballStockBefore, packStockBefore,reason, packPrice, packStock, pack_length, pack_width, pack_height, packWeight, selectedPackWeight.value).then(({status})=>{
                if(status===200){
                    setToastM('update')
                    addToast()
                    setTimeout(
                        function () {
                            props.history.push('/stock-changes')
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
        if(response.status===200){
            setFiles1(JSON.parse(response.product[0].image))
            setSKU(response.product[0].sku)
            setName(response.product[0].name)
            setDescription(response.product[0].description)
            setCOGS(response.product[0].cogs)
            setPrice(response.product[0].price)
            setBoxPrice(response.product[0].box_price)
            setBallPrice(response.product[0].ball_price)
            setStock(response.product[0].stock)
            setBoxStock(response.product[0].box_stock)
            setBallStock(response.product[0].ball_stock)
            setStockBefore(response.product[0].stock)
            setBoxStockBefore(response.product[0].box_stock)
            setPackStockBefore(response.product[0].pack_stock)
            setBallStockBefore(response.product[0].ball_stock)
            setWeight(response.product[0].weight)
            setBoxWeight(response.product[0].box_weight)
            setBallWeight(response.product[0].ball_weight)
            setWidth(response.product[0].width)
            setLength(response.product[0].length)
            setHeight(response.product[0].height)
            setBox_Width(response.product[0].box_width)
            setBox_Length(response.product[0].box_length)
            setBox_Height(response.product[0].box_height)
            setBall_Width(response.product[0].ball_width)
            setBall_Length(response.product[0].ball_length)
            setBall_Height(response.product[0].ball_height)
            setVG(response.product[0].vg)
            setAddVG(response.product[0].is_variant==='1'?true:false)
            setCID({value:response.product[0].category_id, label:response.product[0].cName})
            setSelectedWeight(response.product[0].weight_metric_id==='1'?{value:response.product[0].weight_metric_id, label:"Gram (g)"}:{value:response.product[0].weight_metric_id, label:"Kilogram (Kg)"})
            setSelectedBoxWeight(response.product[0].box_weight_metric_id==='1'?{value:response.product[0].box_weight_metric_id, label:"Gram (g)"}:{value:response.product[0].box_weight_metric_id, label:"Kilogram (Kg)"})
            setSelectedBallWeight(response.product[0].ball_weight_metric_id==='1'?{value:response.product[0].ball_weight_metric_id, label:"Gram (g)"}:{value:response.product[0].ball_weight_metric_id, label:"Kilogram (Kg)"})
            setSelectedWarranty({value:response.product[0].warranty_id, label:response.product[0].wName})
            setPackPrice(response.product[0].pack_price)
            setPackStock(response.product[0].pack_stock)
            setPackWeight(response.product[0].pack_weight)
            setBall_Height(response.product[0].ball_height)
            setPack_Width(response.product[0].pack_width)
            setPack_Length(response.product[0].pack_length)
            setPack_Height(response.product[0].pack_height)
            setSelectedPackWeight(response.product[0].pack_weight_metric_id==='1'?{value:response.product[0].pack_weight_metric_id, label:"Gram (g)"}:{value:response.product[0].pack_weight_metric_id, label:"Kilogram (Kg)"})
        }
    }

    async function fetchWarranty() {
        const response = await getAll()
        console.log(response)
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
          let initialAddV1 = {name:'', stock:0, price:0, box_stock:0, ball_stock:0}
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
        let initialAddV1 = {name:'', stock:0, price:0, box_stock:0, ball_stock:0}
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
                            <CLabel htmlFor="name">Foto</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                                
                                    <CRow onClick={() => setImageUpdate(true)} align='center'>
                                        <CCol xs='1' align='center' md='1'>
                                        </CCol>
                                        {
                                            files1.map(({url, idx})=>{
                                                return(
                                                    <CCol key={idx} xs='2' align='center' md='2'>

                                                    <CImg
                                                        src={url}
                                                        style={{height:'12vh'}}
                                                        alt="img"
                                                        />
                                                    </CCol>
                                                )
                                            })
                                         }
                                    </CRow>
                                    
                             
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">SKU</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" value={sku} disabled onChange={(e)=> setSKU(e.target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Kategori</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <Select
                                    options={categories}
                                    placeholder="Pilih Kategori"
                                    onChange={(e) => setCID(e.target)}
                                    value={cID}
                                    isDisabled
                                />
                            </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Nama</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" placeholder="Kantong Plastik Duo" value={name} onChange={(e)=> setName(e.target.value)} disabled/>

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="name">Alasan</CLabel>
                            &nbsp;
                            <CBadge color="secondary">Wajib</CBadge>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea type="text" placeholder="Alasan" value={reason} onChange={(e)=> setReason(e.target.value)}/>

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row hidden={addVG}>
                        <CCol md="3">
                            <CLabel htmlFor="name">Stock </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="number" value={stock} onChange={(e)=> setStock(e.target.value)} />
                        </CCol>
                    </CFormGroup>
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
                    {addVG===true?
                    <>
                    <CFormGroup row>
                        <CCol md="6">
                            <CLabel htmlFor="name">Variant Grup</CLabel>
                        </CCol>
                    </CFormGroup>
                    {
                        VG && VG.map((x, i)=>{
                            if(x.name===""){
                                dis=true
                            }
                            return(
                                <>
                                <CFormGroup row key={i}>
                                    <CCol xs="3">
                                    </CCol>
                                    <CCol xs="3">
                                        <CInputGroup className="input-prepend">
                                            <CInput id="appendedPrependedInput" disabled size="12" type="text" placeholder='Nama (e,g: Warna, Ukuran' value={x.name} name="name" 
                            onChange={e => handleInputChange(e, i)}/>
                                        </CInputGroup>
                                    </CCol>
                                    {/* <CCol xs="2">
                                        <CInputGroup className="input-prepend">
                                            <CInputCheckbox checked={x.is_required===1 || x.is_required==='1'?true:false} 
                                            name="is_required" onClick={(e)=>handleInputChange(e, i)} value={x.is_required}/>
                                            <CLabel>Wajib</CLabel>
                                        </CInputGroup>
                                    </CCol> */}
                                    <CCol xs="1" md="1">
                                        {/* {VG.length !== 1 ? <CButton
                                        color="danger"
                                        onClick={() => handleRemoveClick(i)}>-</CButton>
                                    :''} */}
                                    </CCol>
                                </CFormGroup>
                                {
                                    x.initAddV.map((y,j)=>{
                                        if(y.name===""){
                                            dis=true
                                        }
                                        return(
                                            <>
                                            <CFormGroup row key={i+j}>
                                                <CCol xs="3">
                                                </CCol>
                                                <CCol xs="5">
                                                    <CLabel hidden={j===0?false:true}>Nama</CLabel>
                                                    <CInputGroup className="input-prepend">
                                                        <CInput id="appendedPrependedInput" disabled size="12" type="text" placeholder='Merah' name="name" value={y.name} onChange={(e)=>handleInputChange1(e, i,j)}/>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol xs="4">
                                                    <CLabel hidden={j===0?false:true}>Stock </CLabel>
                                                    <CInputGroup className="input-prepend">
                                                        <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Stock' value={y.stock} name="stock" onChange={(e)=>handleInputChange1(e, i,j)}/>
                                                    </CInputGroup>
                                                </CCol>
                                                {/* <CCol xs="2">
                                                    <CLabel hidden={j===0?false:true}>Stock / Pack</CLabel>
                                                    <CInputGroup className="input-prepend">
                                                        <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Stock' value={y.pack_stock} name="pack_stock" onChange={(e)=>handleInputChange1(e, i,j)}/>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol xs="2">
                                                    <CLabel hidden={j===0?false:true}>Stock / Dus</CLabel>
                                                    <CInputGroup className="input-prepend">
                                                        <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Stock' value={y.box_stock} name="box_stock" onChange={(e)=>handleInputChange1(e, i,j)}/>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol xs="2">
                                                    <CLabel hidden={j===0?false:true}>Stock / Bal</CLabel>
                                                    <CInputGroup className="input-prepend">
                                                        <CInput id="appendedPrependedInput" size="12" type="number" placeholder='Stock' value={y.ball_stock} name="ball_stock" onChange={(e)=>handleInputChange1(e, i,j)}/>
                                                    </CInputGroup>
                                                </CCol> */}
                                                {/* <CCol xs="1" md="1"> */}
                                                    {/* {x.initAddV.length !== 1 ? <CButton
                                                    color="danger"
                                                    onClick={() => handleRemoveClick1(i,j)}>-</CButton>
                                                :''} */}
                                                {/* </CCol> */}
                                            </CFormGroup>

                                <CFormGroup row>
                                    <CCol xs="9">
                                    </CCol>
                                    <CCol xs="3">
                                        {/* <CButton hidden={x.initAddV.length===j+1?false:true} color="primary" onClick={(e)=>handleAddClick1(i, j)}>Tambah Variant</CButton> */}
                                    </CCol>
                                </CFormGroup>
                                </>
                                        )
                                    })
                                }

                                </>
                            )
                        })
                    }
                    <CFormGroup row>
                        <CCol xs="9">
                        </CCol>
                        <CCol xs="3">
                            {/* <CButton color="primary" onClick={handleAddClick}>Tambah Variant Group</CButton> */}
                        </CCol>
                    </CFormGroup>
                    </>
                    :''
                    }
                </CForm>
            </CCardBody>
            <CCardFooter>
                <CRow>
                    <CCol xs="12" md="12" align="right">
                        {reason.length>0?
                        <>
                            <Link to="/stock-changes"><CButton disabled={buttonDisable} onClick={() => console.log("batal")}>Batal</CButton></Link>{' '}
                            <CButton color="primary" disabled={buttonDisable} onClick={() => update()}>{buttonTitle}</CButton>
                            </>
                            :
                            <>
                            <Link to="/stock-changes"><CButton disabled={buttonDisable} onClick={() => console.log("batal")}>Batal</CButton></Link>{' '}
                            <CButton color="primary" disabled onClick={() => update()}>{buttonTitle}</CButton>
                            </>
                        }
                    </CCol>
                </CRow>
            </CCardFooter>
        </CCard>
        </>
    )
};

export default EditProducts
