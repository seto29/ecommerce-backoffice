import axios from '../axios';
// import Cookies from 'js-cookie';

export const GetDropdown = async () => {
    let i = 0;
    let list = [];
    const response = await axios.get('/roles/GetDropdown.php')
    response['data']['roles'].map(value => {
        list[i] = {
            id: value.id, value: value.name, label: value.name,
            target: { type: 'select', name: 'list', value: value.id, label: value.name }
        }
        i++;
        return i;
    })
    return  list
}