'use strict';

(function () {
   var form = document.querySelector('#poll-form');
   var createPollButton = document.querySelector('#btn-create');
   var apiUrl = appUrl + '/api/polls';

   function update(data) {
       var json = JSON.parse(data);
       var pollId = json.id;
       window.location.href = '/polldetail/' + pollId;
   }
   
   form.addEventListener('submit', function (evt) {
      evt.preventDefault();
   }, true);
   
   createPollButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, update);

   }, false);

})();