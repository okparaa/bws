import Cookie from 'js-cookie';
export default {  
  logout(){
    this.removeToken();
    this.removeItem();
    return false;
  },
  getToken(){
    return Cookie.get('token');
  },
  isloggedIn() {
    if(this.getToken()){    
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