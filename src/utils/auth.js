import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
export default {  
  logout(){
    this.removeToken();
    this.removeItem();
    return false;
  },
  getToken(){
    return Cookie.get('token');
  },
  isLoggedIn() {
    if(this.getToken()){ 
      var jwt = jwt_decode(this.getToken());
      var current_time = Date.now().valueOf()/1000;
      if( jwt.exp < current_time) {
         return false
      }  
      return true;
    }else{
      return false;
    }
  },
  setToken(token = null){
    if (token) {
      Cookie.set('token', token);
    } else {
      Cookie.remove('token');
    }
  },
  removeToken(){
    this.setToken(null);
  },
  removeItem(item = null){
    if (item) {
      localStorage.removeItem(item);
    } 
  },
  setItem(name, value){
    localStorage.setItem(name, value);
  },
  getItem(name){
    return localStorage.getItem(name);
  }
}