(function ( $ ) {
	$.fn.statusWidget = function(userSettings) {
		
		// Default settings
		var settings = $.extend({
			height: '100px',
			width: '100px',
			interval: 5000,
			url: 'http://127.0.0.1/'
			}, userSettings);

		this.css('height', settings.height);
		this.css('width', settings.width);
		
		/*API URL (Arduino IP)*/
		var URL = settings.url;
		
		/*UPDATE INTERVAL*/
		window.setInterval(updateStatus, settings.interval);
		
		var statusLight = this;
		var resp = 0;
		var title = 0;

		if ($('#title')) {
			title = $('#title');
			title.text('Er Komponenten åben?');
		}

		if ($('#resp')) {
			resp = $('#resp');
			resp.text('(Måske...)');
		}

		/*What to do @ update event?*/
		function updateStatus() {
			//Hent data
			$.getJSON(URL, function(data) {
				//Hvis Kenneth er der
				if (data.status == 1) {
					//TÆND!
					statusLight.css('background', 'url("on.png") center');
					statusLight.css('background-size', '8%');
					if (resp) {
						resp.text('(Ja!)');
					}
				} else if (data.status == 0) {
					//SLUK!
					statusLight.css('background', 'url("off.png") no-repeat center');
					statusLight.css('background-size', '8%');
					if (resp) {
						resp.text('(Nej!)');
					}
				}
			});
		}
		return this;
	};
}( jQuery ));

$('#status').statusWidget({width: '754px', url: 'http://kennethapi.roevhat.dk/', interval: 250});