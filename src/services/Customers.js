import axios from '../axios';

export const getAll = async () => {
  const response = await axios.get('/customers/GetAll.php')
  return response.data
};
export const getDetails = async () => {
    const response = await axios.get('/customers/GetDetails.php')
    return response.data
};
export const getByID = async (id) => {
    const response = await axios.get('/customers/GetByID.php?id='+id)
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

export const fDelete = async (id) => {
    const json = JSON.stringify({ "ID":id});
    const response = await axios.post('/categories/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name,sequence, image) => {
    const json = JSON.stringify({ "ID":id,"name": name, "sequence":sequence, "image":image });
    const response = await axios.post('/categories/Update.php', json);
    return response.data;
};

export const fInsert = async (name, sequence, image) =>{

    const json = JSON.stringify({ "name": name, "sequence":sequence, "image":image });
    const response = await axios.post('/categories/Insert.php', json);
    return response.data;
};

export const fUpdatePnt = async (id, point) =>{

    const json = JSON.stringify({ "id": id, "point":point});
    const response = await axios.post('/customers/UpdatePoint.php', json);
    return response.data;
};

export const fUpdateDB = async (id, point, desc, exp) =>{

    const json = JSON.stringify({ "id": id, "discount_balance":point, "desc":desc, "exp":exp});
    const response = await axios.post('/customers/AddDiscountBalance.php', json);
    return response.data;
};
