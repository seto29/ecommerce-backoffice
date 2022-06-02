import axios from '../axios';
import Cookies from 'js-cookie';


export const reCreate = async () => {
    const response = await axios.get('auth/reCreate.php')
    Cookies.set('token', response.data.token)
    return response.data
};
