import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async (dateTo, dateFrom) => {
    const response = await axios.get('payments/GetByDate.php?dateTo='+dateTo+'&dateFrom='+dateFrom)
    return response.data
}

export const getNotYetPaid = async () => {
    const response = await axios.get('/payments/GetNotYetPaid.php')
    let list2 = [];
    let i = 0;
    response['data']['payments'].map(value => {
        list2[i] = {
            id: value.id, value: value.id, label: value.code + "-" + value.amount + " - "+ Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric"
            }).format(Date.parse(value.due_date)),
            target: { type: 'select', name: 'list', value: value.id, label: value.code + "-" + value.amount }
        }
        i++;
        return i;
    })
    return list2
}

export const getDetail = async (id) => {
    const response = await axios.get('/payments/GetDetailByID.php?id='+id)
    return response.data
}

export const fCancel = async (id) => {

    var bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const response = await axios({
        method: 'post',
        url: '/payments/Cancel.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
};

export const fInsert = async (id, currentID, salesID, amount,code ) => {
    var bodyFormData = new FormData()
    bodyFormData.append('id', id)
    bodyFormData.append('by', currentID)
    bodyFormData.append('salesID', salesID)
    bodyFormData.append('amount', amount)
    bodyFormData.append('code', code)
    const response = await axios({
        method: 'post',
        url: '/payments/Pay.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};