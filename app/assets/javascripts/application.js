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

//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require bootstrap-sprockets
//= require_tree .

$(function(){
	/**
	 * スタートボタンを押したタイミングのミリ秒のための変数
	 * @type {Number}
	 */
	let startTime = 0;

	/**
	 * 「ハイ！」を押したタイミングのミリ秒のための変数
	 * @type {Number}
	 */
	let endTime = 0;

	/**
	 * endTimeからstartTimeを引いたミリ秒のための変数
	 * @type {Number}
	 */
	let totalTime = 0;

	/**
	 * 結果画面でのメッセージを変更するための連想配列
	 * @type {Object}
	 */
	let messages = {
		'perfect': 'ウルトラソウルパーフェクト',
		'great': 'ウルトラソウルグッド',
		'good': '平凡ソウル',
		'bad': '無'
	};

	/**
	 * 結果画面での画像を変更するための連想配列
	 * @type {Object}
	 */
	let src = {
		'perfect': '/assets/perfect.png',
		'great': '/assets/great.png',
		'good': '/assets/good.png',
		'bad': '/assets/bad.png'
	};

	// 「スタート」ボタンを押した時のイベント
	$(document).on('click', '#start', function(){
		// スタートボタンを押した時点でのミリ秒
		startTime = Date.now();
		// イラストを変更するメソッド
		$('#illust').attr('src', '/assets/start.png');
		// テキストを変更するメソッド
		$('#introduction').text('スタート！！！');
		// テキストを変更するメソッド
		$('.start-message').find('p').text('ハイ！！！のタイミングでタッチ！！')
		// ボタンのテキストとidを変更するメソッド
		$(this).attr({
			'value': 'ハイ！',
			'id': 'end'
		});
	});

	// 「ハイ！」ボタンを押した時のイベント
	$(document).on('click', '#end', function(){
		// ハイ！ボタンを押した時点でのミリ秒
		endTime = Date.now();
		// 残りミリ秒を計算
		totalTime = endTime - startTime;
		// 秒に直す
		let resultTime = totalTime / 1000;
		// 「ハイ！」が66秒目なので、そこからさっき計算した秒数を引く
		resultTime = 66 - resultTime;

		// 非同期通信を行う
		$.ajax({
			url: '/result', // URLは”/result”を指定
			type: 'GET', // リクエストのタイプはGET
			dataType: 'json' // データの型はjson
		})
		// 通信に成功した場合の処理
		.done(function(data) {
			// illsutChange関数からの戻り値を受け取り画像を変更
			$('#illust').attr('src', illustChange(resultTime));
			// 要素を隠すメソッド
			$('#introduction, .start-message, #ready').hide();
			// 要素を表示するメソッド
			$('.end-message, #again').show();
			// ultraSoul関数からの戻り値をもとにテキストを変更するメソッド
			$('.result-message').text('「 ' + ultraSoul(resultTime) + ' 」');

			// パーフェクトであれば「やり直し」ボタンを表示しない
			if (resultTime <= 2 && resultTime >= 0) {
				$('.retry').hide();
			}
		})
		// 通信に失敗した場合の処理
		.fail(function(data) {
			// アラートで失敗した旨をダイアログで表示
			alert('エラーです。もう一度「スタート」を押してください。');
			// ボタンのテキストとidを変更するメソッド
			$('#end').attr({
				'value': 'スタート',
				'id': 'start'
			});
		})
	});

	// 「やり直したい」ボタンを押した時のイベント
	$(document).on('click', '.retry', function(){
		// 要素を隠すメソッド
		$('.end-message').hide();
	});

	/**
	 * 秒数によって結果画面で表示するメッセージを戻り値として返すための関数
	 * @param {Number} time 秒数を受け取る
	 * @return {Object}     結果メッセージを返す
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
	 * 秒数によって結果画面で表示する画像を戻り値として返すための関数
	 * @param {Number} time 秒数を受け取る
	 * @return {Object}     結果メッセージを返す
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
});
