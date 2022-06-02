import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/products/GetAll.php')
    return response.data
};
export const getAllR = async () => {
    const response = await axios.get('/products/GetAllR.php')
    return response.data
};

export const getAllStockProduct = async () => {
    const response = await axios.get('/products/GetAllStockProduct.php')
    return response.data
};

export const GetBySupplierID = async (id) => {
    const response = await axios.get('/supplierproducts/GetBySupplierID.php?sID='+id)
    return response.data
};

export const getByID = async (id) => {
  const response = await axios.get('/products/GetDetailByID.php?id='+id)
  return response.data
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('ID',id);
    const response = await axios({
      method: 'post',
      url: '/products/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (image, sku, category_id, name, description, cogs, price, point, stock, warranty_id, weight_metric_id, weight, length, width, height, id, vg, addvg, box_price, ball_price, box_stock, ball_stock, box_length, box_width, box_height, ball_length, ball_width, ball_height, box_weight, ball_weight, box_weight_metric_id, ball_weight_metric_id, wholesale_discount, pack_price, pack_stock, pack_length, pack_width, pack_height, pack_weight, pack_weight_metric_id, product_wholesale, is_wholesale, po, isPO, subcategory_id) => {
  var bodyFormData = new FormData();
  if(
    isPO===true){

      bodyFormData.append('preorder', po)
    }
    bodyFormData.append('name', name)
    bodyFormData.append('sku', sku)
    bodyFormData.append('image', image)
    bodyFormData.append('category_id', category_id)
    bodyFormData.append('description', description)
    bodyFormData.append('cogs', cogs)
    bodyFormData.append('price', price)
    bodyFormData.append('point', point)
    bodyFormData.append('stock', stock)
    bodyFormData.append('warranty_id', warranty_id)
    bodyFormData.append('weight_metric_id', weight_metric_id)
    bodyFormData.append('volume_metric_id', 3)
    bodyFormData.append('weight', weight)
    bodyFormData.append('length', length)
    bodyFormData.append('width', width)
    bodyFormData.append('height', height)
    bodyFormData.append('id', id)
    bodyFormData.append('vg', vg)
    bodyFormData.append('addvg', addvg)
    bodyFormData.append('box_price', box_price)
    bodyFormData.append('ball_price', ball_price)
    bodyFormData.append('box_stock', box_stock)
    bodyFormData.append('ball_stock', ball_stock)
    bodyFormData.append('box_length', box_length)
    bodyFormData.append('box_width', box_width)
    bodyFormData.append('box_height', box_height)
    bodyFormData.append('ball_length', ball_length)
    bodyFormData.append('ball_width', ball_width)
    bodyFormData.append('ball_height', ball_height)
    bodyFormData.append('box_weight', box_weight)
    bodyFormData.append('ball_weight', ball_weight)
    bodyFormData.append('box_weight_metric_id', box_weight_metric_id)
    bodyFormData.append('ball_weight_metric_id', ball_weight_metric_id)
    bodyFormData.append('wholesale_discount', wholesale_discount)
    bodyFormData.append('pack_price', pack_price)
    bodyFormData.append('pack_stock', pack_stock)
    bodyFormData.append('pack_length', pack_length)
    bodyFormData.append('pack_width', pack_width)
    bodyFormData.append('pack_height', pack_height)
    bodyFormData.append('pack_weight', pack_weight)
    bodyFormData.append('pack_weight_metric_id', pack_weight_metric_id)
    bodyFormData.append('product_wholesale', product_wholesale)
    bodyFormData.append('is_wholesale', is_wholesale)
    bodyFormData.append('subcategory_id', subcategory_id)
    const response = await axios({
      method: 'post',
      url: '/products/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};

export const fInsert = async (image, sku, category_id, name, description, cogs, price, point, stock, warranty_id, weight_metric_id, weight, length, width, height, vg, addvg, box_price, ball_price, box_stock, ball_stock, box_length, box_width, box_height, ball_length, ball_width, ball_height, box_weight, ball_weight, box_weight_metric_id, ball_weight_metric_id, wholesale_discount, pack_price, pack_stock, pack_length, pack_width, pack_height, pack_weight, pack_weight_metric_id, product_wholesale, is_wholesale, po, isPO, subcategory_id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', name)
    bodyFormData.append('sku', sku)
    bodyFormData.append('image', image)
    bodyFormData.append('category_id', category_id)
    bodyFormData.append('description', description)
    bodyFormData.append('cogs', cogs)
    bodyFormData.append('price', price)
    bodyFormData.append('point', point)
    bodyFormData.append('stock', stock)
    bodyFormData.append('warranty_id', warranty_id)
    bodyFormData.append('weight_metric_id', weight_metric_id)
    bodyFormData.append('volume_metric_id', 3)
    bodyFormData.append('weight', weight)
    bodyFormData.append('length', length)
    bodyFormData.append('width', width)
    bodyFormData.append('height', height)
    bodyFormData.append('vg', vg)
    bodyFormData.append('addvg', addvg)
    bodyFormData.append('box_price', box_price)
    bodyFormData.append('ball_price', ball_price)
    bodyFormData.append('box_stock', box_stock)
    bodyFormData.append('ball_stock', ball_stock)
    bodyFormData.append('box_length', box_length)
    bodyFormData.append('box_width', box_width)
    bodyFormData.append('box_height', box_height)
    bodyFormData.append('ball_length', ball_length)
    bodyFormData.append('ball_width', ball_width)
    bodyFormData.append('ball_height', ball_height)
    bodyFormData.append('box_weight', box_weight)
    bodyFormData.append('ball_weight', ball_weight)
    bodyFormData.append('box_weight_metric_id', box_weight_metric_id)
    bodyFormData.append('ball_weight_metric_id', ball_weight_metric_id)
    bodyFormData.append('wholesale_discount', wholesale_discount)
    bodyFormData.append('pack_stock', pack_stock)
    bodyFormData.append('pack_price', pack_price)
    bodyFormData.append('pack_length', pack_length)
    bodyFormData.append('pack_width', pack_width)
    bodyFormData.append('pack_height', pack_height)
    bodyFormData.append('pack_weight', pack_weight)
    bodyFormData.append('pack_weight_metric_id', pack_weight_metric_id)
    bodyFormData.append('product_wholesale', product_wholesale)
    bodyFormData.append('is_wholesale', is_wholesale)
    bodyFormData.append('subcategory_id', subcategory_id)
    if(
      isPO===true){

        bodyFormData.append('preorder', po)
      }
    const response = await axios({
      method: 'post',
      url: '/products/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};
export const fInsertR = async (image, sku, category_id, name, description, cogs, price, point, stock, warranty_id, weight_metric_id, weight, length, width, height, vg, addvg, box_price, ball_price, box_stock, ball_stock, box_length, box_width, box_height, ball_length, ball_width, ball_height, box_weight, ball_weight, box_weight_metric_id, ball_weight_metric_id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', name)
    bodyFormData.append('sku', sku)
    bodyFormData.append('image', image)
    bodyFormData.append('category_id', category_id)
    bodyFormData.append('description', description)
    bodyFormData.append('cogs', cogs)
    bodyFormData.append('price', price)
    bodyFormData.append('point', point)
    bodyFormData.append('stock', stock)
    bodyFormData.append('warranty_id', warranty_id)
    bodyFormData.append('weight_metric_id', weight_metric_id)
    bodyFormData.append('volume_metric_id', 3)
    bodyFormData.append('weight', weight)
    bodyFormData.append('length', length)
    bodyFormData.append('width', width)
    bodyFormData.append('height', height)
    bodyFormData.append('vg', vg)
    bodyFormData.append('addvg', addvg)
    bodyFormData.append('box_price', box_price)
    bodyFormData.append('ball_price', ball_price)
    bodyFormData.append('box_stock', box_stock)
    bodyFormData.append('ball_stock', ball_stock)
    bodyFormData.append('box_length', box_length)
    bodyFormData.append('box_width', box_width)
    bodyFormData.append('box_height', box_height)
    bodyFormData.append('ball_length', ball_length)
    bodyFormData.append('ball_width', ball_width)
    bodyFormData.append('ball_height', ball_height)
    bodyFormData.append('box_weight', box_weight)
    bodyFormData.append('ball_weight', ball_weight)
    bodyFormData.append('box_weight_metric_id', box_weight_metric_id)
    bodyFormData.append('ball_weight_metric_id', ball_weight_metric_id)
    const response = await axios({
      method: 'post',
      url: '/products/InsertR.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};

export const fInsertReplies = async (discussionID, content) => {
    var bodyFormData = new FormData();
    bodyFormData.append('discussionID', discussionID)
    bodyFormData.append('content', content)
    const response = await axios({
      method: 'post',
      url: '/discussion_replies/AdminReplies.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};

