import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CImg
} from '@coreui/react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Toaster from '../components/Toaster'
import {getAll, fDelete, fUpdate, fInsert} from '../../services/Ads'
import {getAll as getAllP} from '../../services/Products'
import {reCreate} from '../../services/Token'
import {getDropdown} from '../../services/Categories'
// import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
// import './style.css';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
function Categories(props) {
  const [toastM, setToastM] = useState("")
  const [toasts, setToasts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [fade] = useState(true)
  const [closeButton] = useState(true)

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [sequence, setSequence] = useState(0);
  const [idUpdate, setIDUpdate] = useState("");
  const [type, setType] = useState("0");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categoriesS, setCategoriesS] = useState([]);
  const [category, setCategory] = useState({});
  const [link, setLink] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [sequenceUpdate, setSequenceUpdate] = useState("");
  const [typeUpdate, setTypeUpdate] = useState("0");
  const [productUpdate, setProductUpdate] = useState({});
  const [categoryUpdate, setCategoryUpdate] = useState({});
  const [linkUpdate, setLinkUpdate] = useState("");
  
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = categories && categories.map(({ id, name, image, sequence, category, category_id, product, product_id, link }) => {
    number++
    console.log(image)
    const data = {
        no: number,
        id: id,
        name: name,
        imageUrl:image,
        image:<CImg
                src={image}
                style={{width:'10vh'}}
                alt={name}
              />,
        sequence:sequence,
        category:category,
        category_id:category_id,
        product:product,
        product_id:product_id,
        link:link,
    }
    return data;
  });

  function editModal(edit, id, name, image, sequence, category, category_id, product, product_id, link){
    setIDUpdate(id);
    setNameUpdate(name);
    setImageUpdate(image)
    setSequenceUpdate(sequence)
    setTypeUpdate("0")
    setLinkUpdate("")
    setProductUpdate({})
    setCategoryUpdate({})
    if(category_id!==null){
      setTypeUpdate("3")
      setCategoryUpdate(category)
    }else if(product_id!==null){
      setTypeUpdate("2")
      setProductUpdate(product)
    }else if(link!==null){
      setTypeUpdate("1")
      setLinkUpdate(link)
    }
  
    setEdit(!edit);
  }

  async function fetchCategories() {
    await getAll().then(({status, ads})=>{
        if(status===401){
          reCreate().then(({status})=>{
            if(status===200){
              fetchCategories()
            }
          })
        }
        
        if(status===200){
          setCategories(ads)
        }

    })
  }

  async function fetchCategoriess() {
    const response = await getDropdown()
    setCategoriesS(response)
}

  useEffect(() => {
    fetchCategories()
    fetchCategoriess()
    fetchProducts()
  }, [props])

  async function insert(url){
    await fInsert(name,sequence,url, link, product.value, category.value).then(({status})=>{
      if(status===401){
        reCreate().then(({status})=>{
          if(status===200){
            insert(url)
            props.setLink("")
            props.setProduct({})
            props.setCategory({})
          }
        })
      }

      if(status==200){
        fetchCategories()
        setName('')
        setSequence(0)
        setType('0')
        setToastM("insert")
        setShowAddModal(false)
      }else{
        setToastM("failed")
      }
      addToast()
    })
  }

  async function update(url){
    await fUpdate(idUpdate, nameUpdate,sequenceUpdate,url, linkUpdate, productUpdate.value, categoryUpdate.value).then(({status})=>{
      if(status===401){
        reCreate().then(({status})=>{
          if(status===200){
            update(url)
          }
        })
      }

      if(status==200){
        fetchCategories()
        setName('')
        setSequence(0)
        setToastM("update")
        setShowAddModal(false)
      }
      addToast()
    })
  }

  async function deleteCat(){
    await fDelete(idUpdate).then(({status})=>{
      if(status===401){
        reCreate().then(({status})=>{
          if(status===200){
            deleteCat()
          }
        })
      }

      if(status==200){
        fetchCategories()
        setToastM("delete")
        setEdit(false)
      }
      addToast()
    })
  }

  async function fetchProducts() {
    const response = await getAllP()
    if(response.success===1){
        let list = []
        let i = 0;
        response['products'].map(value => {
            list[i] = {
                id: value.id, value: value.name, label: value.sku+' - '+value.name,
                target: { type: 'select', name: 'list', value: value.id, label: value.name, id:value.id }
            }
            i++;
            return i;
        })
        setProducts(list)
        return list
    }
  }

    return (
        <>
            <AddModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              name={name}
              setName={setName}
              sequence={sequence}
              setSequence={setSequence}
              categoriesS={categoriesS}
              category={category}
              setCategory={setCategory}
              link={link}
              setLink={setLink}
              type={type}
              setType={setType}
              products={products}
              product={product}
              setProduct={setProduct}
              insert={insert}
              setToastM={setToastM}
              addToast={addToast}
            />
            <UpdateModal
              edit={edit}
              products={products}
              setEdit={setEdit}
              categoriesS={categoriesS}
              idUpdate={idUpdate}
              nameUpdate={nameUpdate}
              setNameUpdate={setNameUpdate}
              imageUpdate={imageUpdate}
              setImageUpdate={setImageUpdate}
              sequenceUpdate={sequenceUpdate}
              setSequenceUpdate={setSequenceUpdate}
              deleteCat={deleteCat}
              update={update}
              typeUpdate={typeUpdate}
              setTypeUpdate={setTypeUpdate}
              productUpdate={productUpdate}
              setProductUpdate={setProductUpdate}
              linkUpdate={linkUpdate}
              setLinkUpdate={setLinkUpdate}
              categoryUpdate={categoryUpdate}
              setCategoryUpdate={setCategoryUpdate}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                          <CRow className="align-items-center">
                            <CCol col="10"  className="mb-3 mb-xl-0">
                              <h4>Gambar Slider</h4>
                            </CCol>
                            <CCol col="6" sm="4" md="2"className="mb-3 mb-xl-0">
                                <CButton block color="primary" onClick={() => setShowAddModal(!showAddModal)} className="mr-1">Tambah Data</CButton>
                            </CCol>
                          </CRow>
                        </CCardHeader>
                        <CCardBody>
                          <MaterialTable
                            icons={tableIcons}
                            // other props
                            title=""
                            columns={[
                                {
                                    title: 'No', field: 'no', cellStyle: {
                                        width: '10%',
                                    },
                                },
                                { title: 'Gambar', field: 'image' , filtering:false, sorting:false},
                                { title: 'No. Urut', field: 'sequence'},
                            ]}
                            data={tableData}
                            // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                            onRowClick={((evt, selectedRow) => editModal(edit,selectedRow.id, selectedRow.name, selectedRow.imageUrl, selectedRow.sequence, selectedRow.category, selectedRow.category_id, selectedRow.product, selectedRow.product_id, selectedRow.link))}
                            options={{
                                rowStyle: rowData => ({
                                    backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
                                }),
                                filtering: true
                            }}
                          />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default Categories
