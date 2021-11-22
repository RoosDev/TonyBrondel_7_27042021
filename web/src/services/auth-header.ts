  export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user')!);
  
    if (user && user.accessToken && user.roleToken) {
      // for Node.js Express back-end
      console.log('xtok 1 >> ' , user.accessToken)
      console.log('xtok 2 >> ' , user.roleToken)
    
      return { 'x-access-token': user.accessToken! , 'x-role-token': user.roleToken! };
    } else {
      return {};
    }
  }