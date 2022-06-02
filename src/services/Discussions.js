import axios from '../axios';

export const getAll = async () => {
    const response = await axios.get('/discussion/GetAll.php')
    return response.data
};

export const getByID = async (id) => {
    const response = await axios.get('/discussion/GetByID.php?id='+id)
    return response.data
};