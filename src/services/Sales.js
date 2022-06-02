import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async (dateTo, dateFrom) => {
    const response = await axios.get('/sales/GetByDate.php?dateTo='+dateTo+'&dateFrom='+dateFrom)
    return response.data
}

export const getDetails = async (id) => {
    const response = await axios.get('/sales/GetDetailByID.php?id=' + id)
    return response.data
}

export const getProducts = async () => {
    const response = await axios.get('/products/GetAll.php')
    let list = [];
    let i = 0;
        response['data']['products'].map(value => {
            list[i] = {
              id: value.id, value: value.name, label: value.name, sku: value.sku, unit_price: value.price,
              target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
        i++;
        return i;
    })
    return list
}

export const getShops = async () => {
    const response = await axios.get('/shops/GetDropdown.php')
    let list = [];
    let i = 0;
    response['data']['shops'].map(value => {
        list[i] = {
          id: value.id, value: value.name, label: value.name + " " + value.address,
          target: { type: 'select', name: 'list', value: value.id, label: value.name + "-" + value.address }
    }
        i++;
        return i;
    })
    return list
}

export const fDelete = async (id) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/sales/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fInsert = async (don, dod, sID, inputList,payments,isDelivery,paidOff,notes,bayar, priceTot) => {
    
    let insertData = {
        "don": don,
        "dod": dod,
        "sID": sID,
        "createdBy": JSON.parse(Cookies.get('user')).id,
        "details": JSON.stringify(inputList),
        "payments": JSON.stringify(payments),
        "isDelivery": isDelivery,
        "paidOff": paidOff,
        "notes": notes,
        "terminPay": bayar,
        "salesPrice": priceTot
      }
      const response = await axios({
        method: 'post',
        url: '/sales/HandleJSON.php',
        data: JSON.stringify(insertData),
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};