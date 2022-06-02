import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async (dateFrom, dateTo) => {
    const response = await axios.get('/sales/GetThisMonthGroupByDate.php?dateTo='+dateTo+"&dateFrom="+dateFrom)
    return response.data
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData()
    bodyFormData.append('id', id)
    const response = await axios({
        method: 'post',
        url: '/incomes/Delete.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
