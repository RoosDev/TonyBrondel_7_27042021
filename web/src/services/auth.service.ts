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

  UpdateProfil(user) {
    const myHead = JSON.parse(localStorage.getItem("user")!);

    return axios.put(API_URL + "profile/"+ user.id, {
      id: user.id,
      email:user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      job: user.job,
      division: user.division,
    }, {
      headers: { 
        "x-access-token": myHead.accessToken!, 
        "x-role-token": myHead.roleToken! 
      },
    });
  }



  changePass(user) {
    const myHead = JSON.parse(localStorage.getItem("user")!);

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
