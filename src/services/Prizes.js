import axios from '../axios';

export const getAll = async () => {
    const response = await axios.get('/birthday_prizes/GetAll.php')
    return response.data
};

export const fDelete = async (id) => {
    const json = JSON.stringify({ "ID": id });
    const response = await axios.post('/birthday_prizes/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name, price) => {
    const json = JSON.stringify({ "ID": id, "name": name, "price": price });
    const response = await axios.post('/birthday_prizes/Update.php', json);
    return response.data;
};

export const fInsert = async (minimal_trx, prize) => {
    const json = JSON.stringify({ "minimal_trx": minimal_trx, "prize": prize });
    const response = await axios.post('/birthday_prizes/Insert.php', json);
    return response.data;
};
