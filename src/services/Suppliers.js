import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/suppliers/GetAll.php')
    return response.data
};

export const fDelete = async (id) => {
    
  var bodyFormData = new FormData();
  bodyFormData.append('id',id);
  const response = await axios({
    method: 'post',
    url: '/suppliers/Delete.php',
    data: bodyFormData,
    headers: {'Content-Type' : 'multipart/form-data'}
  });
    return response.data;
};

export const fUpdate = async (idUpdate, nameUpdate, addressUpdate, phoneUpdate) => {
  var bodyFormData = new FormData()
  bodyFormData.append('id',idUpdate)
  bodyFormData.append('name', nameUpdate)
  bodyFormData.append('address', addressUpdate)
  bodyFormData.append('phone', phoneUpdate)
  const response = await axios({
    method: 'post',
    url: '/suppliers/Update.php',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const fInsert = async (name, address, phone) => {
  var bodyFormData = new FormData()
  bodyFormData.append('name', name)
  bodyFormData.append('address', address)
  bodyFormData.append('phone', phone)
  const response = await axios({
    method: 'post',
    url: '/suppliers/Insert.php',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data' }
  });
    return response.data;
};