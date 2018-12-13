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
	/**
	 * スタートボタンを押したタイミングの時刻のための変数です
	 * @type {Number}
	 */
	let startTime = 0;

	/**
	 * 「ハイ！」を押したタイミングの時刻のための変数です
	 * @type {Number}
	 */
	let endTime = 0;

	/**
	 * 「ハイ！」を押したタイミングの時刻のための変数です
	 * @type {Number}
	 */
	let totalTime = 0;

	/**
	 * 結果画面でのメッセージを変更するための連想配列です
	 * @type {Object}
	 */
	let messages = {
		'perfect': 'ウルトラソウルパーフェクト',
		'great': 'ウルトラソウルグッド',
		'good': '平凡ソウル',
		'bad': '無'
	};

	/**
	 * 結果画面での画像を変更するための連想配列です
	 * @type {Object}
	 */
	let src = {
		'perfect': '/assets/perfect.png',
		'great': '/assets/great.png',
		'good': '/assets/good.png',
		'bad': '/assets/bad.png'
	};

	$(document).on('click', '#start', function(){
		startTime = Date.now();
		$('#illust').attr('src', '/assets/start.png');
		$('#introduction').text('スタート！！！');
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
			$('#illust').attr('src', illustChange(resultTime));
			$('#introduction, .start-message, #ready').hide();
			$('.end-message, #again').show();
			$('.result-message').text('「 ' + ultraSoul(resultTime) + ' 」');

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

	/**
	 * 秒数によって結果画面で表示するメッセージを戻り値として返すための関数です
	 * @param {Number} time 秒数を受け取ります
	 * @return {Object}     結果メッセージを返します
	 */
	function ultraSoul (time) {
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

	/**
	 * 秒数によって結果画面で表示する画像を戻り値として返すための関数です
	 * @param {Number} time 秒数を受け取ります
	 * @return {Object}     結果メッセージを返します
	 */
	function illustChange (time) {
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
