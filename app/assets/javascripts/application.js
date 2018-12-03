// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(function(){
	let startTime = 0;
	let endTime = 0;
	let totalTime = 0;

	$(document).on('click', '#start', function(){
		startTime = Date.now();
		alert(startTime);
		$(this).attr({
			'value': 'ハイ！',
			'id': 'end'
			// 'data-remote': "true",
			// 'href': '/result',
			// 'method': 'get'
		});
	});

	$(document).on('click', '#end', function(){
		endTime = Date.now();
		alert(endTime);
		totalTime = endTime - startTime;
		let resultTime = totalTime / 1000;
		alert(resultTime);

		$.get('/result');

		// $.ajax({
		// 	url: "/result",
		// 	type: "GET",
		// 	dataType: "html",
		// 	// data: {"key": "aaaa"},
		// 	success: function(data) {
  //               alert("success");
  //           },
  //           error: function(data) {
  //               alert("errror");
  //           }
		// });
	});

	$(document).on('click', '#ajax', function(){
		$.ajax({
			url: '/ultrasoul',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			$('#result').text('aaaaaaaaa');
		})
		.fail(function(data) {
			alert('失敗です');
		})
	});


	$(document).on('click', '#get', function(){
		$.get('/result');
	});

});
