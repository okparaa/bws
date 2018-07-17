export const promises = {
  init: () => {
      return new Promise((resolve, reject) => {
          if (typeof FB !== 'undefined') {
              resolve();
          } else {
              window.fbAsyncInit = () => {
                  FB.init({
                      appId      : '394530471010474',
                      cookie     : true, 
                      xfbml      : true,  
                      version    : 'v2.12'
                  });
                  resolve();
              };
              (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = `https://connect.facebook.net/en_US/sdk.js`;
                  fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
          }
      });
  },
  checkLoginState: () => {
      return new Promise((resolve, reject) => {
          FB.getLoginStatus((response) => {
            console.log(response);        
              response.status === 'connected' ? resolve(response) : reject(response);
          });
      });
  },
  login: () => {
      return new Promise((resolve, reject) => {
          FB.login((response) => {
              response.status === 'connected' ? resolve(response) : reject(response);
          });
      });
  },
  logout: () => {
      return new Promise((resolve, reject) => {
          FB.logout((response) => {
              response.authResponse ? resolve(response) : reject(response);
          });
      });
  },
  fetch: () => {
      return new Promise((resolve, reject) => {
          FB.api(
              '/me', 
              {fields: 'first_name, last_name, gender'},
              response => response.error ? reject(response) : resolve(response)
          );
      });
  }
}
