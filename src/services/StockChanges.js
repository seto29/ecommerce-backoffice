import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/stockChanges/GetAll.php')
    return response.data
};


export const fUpdate = async (image, sku, category_id, name, description, cogs, price, point, stock, warranty_id, weight_metric_id, weight, length, width, height, id, vg, addvg, box_price, ball_price, box_stock, ball_stock, box_length, box_width, box_height, ball_length, ball_width, ball_height, box_weight, ball_weight, box_weight_metric_id, ball_weight_metric_id, stock_before, box_stock_before, ball_stock_before, pack_stock_before ,reason ,pack_price, pack_stock, pack_length, pack_width, pack_height, pack_weight, pack_weight_metric_id) => {
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
    bodyFormData.append('stock_before', stock_before)
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
    bodyFormData.append('box_stock_before', box_stock_before)
    bodyFormData.append('ball_stock_before', ball_stock_before)
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
    bodyFormData.append('pack_stock_before', pack_stock_before)
    bodyFormData.append('reason', reason)
    bodyFormData.append('pack_price', pack_price)
    bodyFormData.append('pack_stock', pack_stock)
    bodyFormData.append('pack_length', pack_length)
    bodyFormData.append('pack_width', pack_width)
    bodyFormData.append('pack_height', pack_height)
    bodyFormData.append('pack_weight', pack_weight)
    bodyFormData.append('pack_weight_metric_id', pack_weight_metric_id)
    const response = await axios({
      method: 'post',
      url: '/stockChanges/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};