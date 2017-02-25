'use strict';

(function () {

   //var createPollButton = document.querySelector('#btn-create');
   var apiUrl = appUrl + '/api/polls';

   function updateView(data) {
       var poll = JSON.parse(data);
       console.log(poll);
   }
   
   var segments = window.location.href.split('/');
   var pollId = segments[segments.length - 1];
   console.log(pollId);
   console.log(apiUrl);
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl + '/' + pollId, updateView));

})();