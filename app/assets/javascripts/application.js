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
//= require bootstrap-sprockets
//= require_tree .

$(function(){
	let startTime = 0;
	let endTime = 0;
	let totalTime = 0;

	$(document).on('click', '#start', function(){
		startTime = Date.now();
		$('#introduction').text('スタート！！！');
		$('#kitajima').attr('src', '/assets/oyogi.jpg');
		$('.start-message').find('p').text('ハイ！！！のタイミングでタッチ！！')
		$(this).attr({
			'value': 'ハイ！',
			'id': 'end'
		});
	});

	$(document).on('click', '#end', function(){
		endTime = Date.now();
		totalTime = endTime - startTime;
		let resultTime = totalTime / 1000;
		resultTime = 68 - resultTime;

		$.ajax({
			url: '/result',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			$('#introduction').hide();
			$('#kitajima').attr('src', kitajimaKosuke(resultTime));
			$('.start-message').hide();
			$('.end-message').show();
			$('.result-message').text('「 ' + ultraSoul(resultTime) + ' 」');
			$('#ready').hide();
			$('#again').show();

			if (resultTime <= 2 && resultTime >= 0) {
				$('.retry').hide();
			}
		})
		.fail(function(data) {
			alert('エラーです。もう一度「スタート」を押してください。');
			$('#end').attr({
				'value': 'スタート',
				'id': 'start'
			});
		})
	});

	$(document).on('click', '.retry', function(){
		$('.end-message').hide();
	});

	function ultraSoul (time) {
		let messages = {
			'perfect': 'ウルトラソウルパーフェクト',
			'great': 'ウルトラソウルグッド',
			'good': '平凡ソウル',
			'bad': '無'
		};

		if (time <= 2 && time >= 0) {
			return messages['perfect'];
		} else if (time <= 5 && time >= 0) {
			return messages['great'];
		} else if (time <= 10 && time >= 0) {
			return messages['good'];
		} else {
			return messages['bad'];
		}
	}

	function kitajimaKosuke (time) {
		let src = {
			'perfect': '/assets/perfect.jpg',
			'great': '/assets/great.jpg',
			'good': '/assets/good.jpg',
			'bad': '/assets/bad.jpg'
		};

		if (time <= 2 && time >= 0) {
			return src['perfect'];
		} else if (time <= 5 && time >= 0) {
			return src['great'];
		} else if (time <= 10 && time >= 0) {
			return src['good'];
		} else {
			return src['bad'];
		}
	}

	// $(document).on('click', '#ajax', function(){
	// 	$.ajax({
	// 		url: '/ultrasoul',
	// 		type: 'GET',
	// 		dataType: 'json'
	// 	})
	// 	.done(function(data) {
	// 		$('#result').text('aaaaaaaaa');
	// 	})
	// 	.fail(function(data) {
	// 		alert('失敗です');
	// 	})
	// });


	// $(document).on('click', '#get', function(){
	// 	$.get('/result');
	// });

});
