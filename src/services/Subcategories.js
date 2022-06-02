import axios from '../axios';

export const getAll = async () => {
  const response = await axios.get('/subcategories/GetAll.php')
  return response.data
};

export const getByCategory = async (id) => {
    
  let list = []
  const response = await axios.get('/subcategories/GetByCategory.php?id='+id)
  let i = 0;
  response['data']['subcategories'].map(value => {
      list[i] = {
          id: value.id, value: value.name, label: value.name,
          target: { type: 'select', name: 'list', value: value.id, label: value.name }
      }
      i++;
      return i;
  })
  return list
};

export const getDropdown = async () => {
  let list = []
  const response = await axios.get('/subcategories/GetDropdown.php')
  let i = 0;
  response['data']['subcategories'].map(value => {
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
    const response = await axios.post('/subcategories/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name,sequence, image) => {
    const json = JSON.stringify({ "ID":id,"name": name, "sequence":sequence, "image":image });
    const response = await axios.post('/subcategories/Update.php', json);
    return response.data;
};

export const fInsert = async (parentID, name, sequence, image) =>{

    const json = JSON.stringify({ "categoryID":parentID, "name": name, "sequence":sequence, "image":image });
    console.log(json)
    const response=null
    // const response = await axios.post('/subcategories/Insert.php', json);
    return response.data;
};
