import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async (dateTo, dateFrom) => {
    console.log(dateTo)
    console.log(dateFrom)
    const response = await axios.get('/expenses/GetByDate.php?dateTo='+dateTo+'&dateFrom='+dateFrom)
    return response.data
}

export const getCategories = async () => {
    const response = await axios.get('/expenses/GetCategories.php')
    let list2 = [];
    let i = 0;
    response['data']['categories'].map(value => {
        list2[i] = {
            id: value.id, value: value.name, label: value.name,
            target: { type: 'select', name: 'list', value: value.id, label: value.name }
        }
        i++;
        return i;
    })
    return list2
}

export const fDelete = async (id) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/incomes/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fInsert = async (categoryID, date3, description, nominal,userID ) => {
    var bodyFormData = new FormData()
    bodyFormData.append('cID', categoryID)
    bodyFormData.append('tgl', date3)
    bodyFormData.append('description', description)
    bodyFormData.append('credit', nominal)
    bodyFormData.append('cBy', userID)
    const response = await axios({
        method: 'post',
        url: '/expenses/Insert.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const fUpdate = async (idUpdate, categoryIDUpdate, date3Update, descriptionUpdate,nominalUpdate,userID) => {
    var bodyFormData = new FormData()
    bodyFormData.append('id', idUpdate)
    bodyFormData.append('cID', categoryIDUpdate)
    bodyFormData.append('tgl', date3Update)
    bodyFormData.append('description', descriptionUpdate)
    bodyFormData.append('debit', nominalUpdate)
    bodyFormData.append('cBy', userID)
    const response = await axios({
        method: 'post',
        url: '/expenses/Update.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};