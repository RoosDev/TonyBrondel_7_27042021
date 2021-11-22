import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response: any) => {
        console.log("response >>" , response);
        
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      job: user.job,
      division: user.division,
    });
  }
  changePass(user) {
    console.log('mon url : >> ' +API_URL + "myprofile/pass/"+ user.id)
    console.log('user send >> ', user)
    const myHead = JSON.parse(localStorage.getItem("user")!);
    console.log('myHead >> ', myHead)

    return axios.put(API_URL + "myprofile/pass/"+ user.id, {
      id: user.id,
      email:user.hidemail,
      password: user.password,
    }, {
      headers: { 
        "x-access-token": myHead.accessToken!, 
        "x-role-token": myHead.roleToken! 
      },
    });
  }

}

export default new AuthService();
