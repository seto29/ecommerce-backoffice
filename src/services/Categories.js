import axios from '../axios';

export const getAll = async () => {
  const response = await axios.get('/categories/GetAll.php')
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
