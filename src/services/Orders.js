import axios from '../axios';

export const getAll = async () => {
    const response = await axios.get('/transactions/GetAll.php')
    return response.data
};

export const GetByDate = async (dF, dU) => {
    const response = await axios.get('/transactions/GetByDate.php?dateFrom'+dF+'&&dateUntil='+dU)
    return response.data
};

export const getDetail = async (id) => {
    const response = await axios.get('/transactions/GetDetailByID.php?tID=' + id)
    return response.data
};

export const getDropdown = async () => {
    let list = []
    const response = await axios.get('/categories/GetDropdown.php')
    let i = 0;
    response['data']['categories'].map(value => {
        list[i] = {
            id: value.id, value: value.name, label: value.name,
            target: { type: 'select', name: 'list', value: value.id, label: value.name }
        }
        i++;
        return i;
    })
    return list
};

export const fUpdateStatus = async (id, status) => {
    const json = JSON.stringify({ "transactionID": id, "status": status });
    const response = await axios.post('/transactions/UpdateStatus.php', json);
    console.log(response.data)
    return response.data;
};
export const fUpdateAwb = async (id, awb) => {
    const json = JSON.stringify({ "transactionID": id, "awb": awb });
    const response = await axios.post('/transactions/UpdateAwb.php', json);
    return response.data;
};

export const fDelete = async (id) => {
    const json = JSON.stringify({ "ID": id });
    const response = await axios.post('/categories/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name, sequence, image) => {
    const json = JSON.stringify({ "ID": id, "name": name, "sequence": sequence, "image": image });
    const response = await axios.post('/categories/Update.php', json);
    return response.data;
};

export const fInsert = async (name, sequence, image) => {

    const json = JSON.stringify({ "name": name, "sequence": sequence, "image": image });
    const response = await axios.post('/categories/Insert.php', json);
    return response.data;
};
