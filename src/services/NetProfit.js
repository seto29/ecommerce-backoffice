import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async (dateTo,dateFrom) => {
    const response = await axios.get('/nettprofit/GetByDate.php?dateFrom='+dateFrom+'&dateTo='+dateTo)
    return response.data
};

export const CountExpenses = async (dateTo,dateFrom) => {
    const response = await axios.get('/expenses/CountExpensesByDate.php?dateFrom='+dateFrom+'&dateTo='+dateTo)
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
