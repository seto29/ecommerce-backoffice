import axios from '../axios';

export const getAll = async () => {
    const response = await axios.get('/custom_orders/GetAll.php')
    return response.data
};

export const getByID = async (id) => {
    const response = await axios.get('/custom_orders/GetByID.php?id='+id)
    return response.data
};