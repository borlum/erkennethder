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
		
		var statusLight = this.find('.status');
		statusLight.css('height', settings.height);
		statusLight.css('width', settings.width);
		statusLight.css('background', 'url("off.png") no-repeat center');
		statusLight.css('background-size', '8%');
		
		var resp = 0;
		var title = 0;

		if (title = this.find('.title')) {
			title.text(settings.title);
		}

		if (resp = this.find('.resp')) {
			resp.text('(Måske...)');
		}

		/*What to do @ update event?*/
		function updateStatus() {
			//Hent data
			$.getJSON(URL, function(data) {
				//Hvis Kenneth er der
				if (data.status == 1) {
					//TÆND!
					statusLight.css('background', 'url("on.png") no-repeat center');
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

$('#kenneth').statusWidget({width: '377px', url: 'http://kennethapi.roevhat.dk/', interval: 250, title: 'Er Komponenten åben?'});

$('#simon').statusWidget({width: '377px', url: 'http://simonapi.roevhat.dk/', interval: 250, title: 'Er Simons dør åben?'});