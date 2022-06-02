import axios from '../axios';

export const getAll = async () => {
  const response = await axios.get('/ads/GetAll.php')
  return response.data
};

export const fDelete = async (id) => {
    const json = JSON.stringify({ "id":id});
    const response = await axios.post('/ads/Delete.php', json);
    return response.data;
};

export const fUpdate = async (id, name,sequence, image, link, pID, cID) => {
    const json = JSON.stringify({ "id":id, "sequence":sequence, "image":image, "link":link, "product_id":pID, "category_id":cID });
    const response = await axios.post('/ads/Update.php', json);
    return response.data;
};

export const fInsert = async (name, sequence, image, link, pID, cID) =>{

    const json = JSON.stringify({"sequence":sequence, "image":image, "link":link, "product_id":pID, "category_id":cID });
    const response = await axios.post('/ads/Insert.php', json);
    return response.data;
};
