export default {
    processAPIData(data) {
      let res = {};
      Object.keys(data).forEach((key) => { res[data[key].id] = data[key]; });
      return res;
    },
    sortObjects(objects, key, reverse = false){
      let sortedKeys = Object.keys(objects).sort((a, b) => {
        if (reverse) return objects[b][key] - objects[a][key];
        return parseInt(objects[a][key]) - parseInt(objects[b][key]);
      });
      let sortedObjects = {};
      sortedKeys.forEach(key => {
        sortedObjects[key] = objects[key];
      });
      return sortedObjects;
    },
    guid(){
      (function(){

        if ("performance" in window == false) {
            window.performance = {};
        }
        
        Date.now = (Date.now || function () {  // thanks IE8
          return new Date().getTime();
        });
      
        if ("now" in window.performance == false){
          
          var nowOffset = Date.now();
          
          if (performance.timing && performance.timing.navigationStart){
            nowOffset = performance.timing.navigationStart
          }
      
          window.performance.now = function now(){
            return Date.now() - nowOffset;
          }
        }
      
      })();

      const gUUID = () => { // Public Domain/MIT
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }
      return gUUID();
    },
    hasClass(el, className){
      if (el.classList){
        return el.classList.contains(className);
      }else{ 
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    },
    removeClass(el, className){
      if (el.classList){
        el.classList.remove(className);
      }else{
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    },
    toggle(el, className){
      if(el.classList) {
        el.classList.toggle(className);
      }else {
        var classes = el.className.split(' ');
        var existingIndex = -1;
        for(var i = classes.length; i--;) {
          if(classes[i] === className)
            existingIndex = i;
        }
        if(existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        }else{
          classes.push(className);
        }
        el.className = classes.join(' ');
      }
    },
    addClass(el, className){
      if (el.classList){
        className.split(' ').forEach(classN => {
          el.classList.add(classN);
        })
      }else{
        el.className += ' ' + className;
      }
    },
    isObject(item){
      return (!!item) && (item.constructor === Object);
    }
  }