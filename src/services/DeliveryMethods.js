import axios from '../axios';

export const getAll = async () => {
    const response = await axios.get('/deliverymethods/GetAll.php')
    return response.data
};

export const fDelete = async (id) => {
    const json = JSON.stringify({ "ID": id });
    const response = await axios.post('/deliverymethods/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name, price) => {
    const json = JSON.stringify({ "ID": id, "name": name, "price": price });
    const response = await axios.post('/deliverymethods/Update.php', json);
    return response.data;
};

export const fInsert = async (name, price) => {
    const json = JSON.stringify({ "name": name, "price": price });
    const response = await axios.post('/deliverymethods/Insert.php', json);
    return response.data;
};
