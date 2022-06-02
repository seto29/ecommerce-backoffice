import axios from '../axios';

export const getByUserID = async (id) => {
    const response = await axios.get('/transactions/GetByUserID.php?userID='+id)
    return response.data
  };

export const GetByDate = async (id) => {
    const response = await axios.get('/transactions/GetBySpesificDate.php?date='+id)
    return response.data
  };

export const trackingByAwb = async (id) => {
    const response = await axios.get('/transactions/Tracking.php?id='+id)
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
