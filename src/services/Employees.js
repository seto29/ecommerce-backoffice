import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/employees/GetAll.php')
    return response.data
}

export const getByID = async (id) => {
    const response = await axios.get('/employees/GetByID.php?ID='+id)
    return response.data
}

export const fDelete = async (idUpdate) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',idUpdate);
    const response = await axios({
      method: 'post',
      url: '/employees/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fUpdate = async (idUpdate, nameUpdate, emailUpdate, roleIDUpdate, passwordUpdate) => {
    var bodyFormData = new FormData()
    bodyFormData.append('id',idUpdate)
    bodyFormData.append('name', nameUpdate)
    bodyFormData.append('username', emailUpdate)
    bodyFormData.append('roleID', roleIDUpdate)
    bodyFormData.append('password', passwordUpdate)
    const response = await axios({
      method: 'post',
      url: '/employees/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const fInsert = async (name, email, roleID, password) => {
    var bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('username', email)
    // bodyFormData.append('roleID', roleID)
    bodyFormData.append('password', password)
    const response = await axios({
      method: 'post',
      url: '/employees/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};