import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then((response:any) => {
        if (response.data.accessToken) {
          
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password, 
      job: user.job,
      division: user.division,

    });
  }
}

export default new AuthService();