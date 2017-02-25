'use strict';

(function () {

   var createPollButton = document.querySelector('#btn-create');
   var apiUrl = appUrl + '/api/polls';

   function update(data) {
       var json = JSON.parse(data);
       console.log(json.id);
       window.location = appUrl + json.redirectPath;
   }
   
   createPollButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, update);

   }, false);

})();