(function ( $ ) {
	$.fn.statusWidget = function(userSettings) {
		
		// Default settings
		var settings = $.extend({
			width: '50px',
			height: '50px',
			radius: '25px',
			idleColor: 'yellow',
			yesColor: 'green',
			noColor: 'red',
			interval: 5000,
			url: 'http://127.0.0.1/'
			}, userSettings);
			
		/*STYLE IT BABY!*/
		this.css('background', settings.idleColor);
		this.css('width', settings.width);
		this.css('height', settings.height);
		this.css('border-radius', settings.radius);
		
		/*API URL (Arduino IP)*/
		var URL = settings.url;
		
		/*UPDATE INTERVAL*/
		window.setInterval(updateStatus, settings.interval);
		
		var statusLight = this;
		
		/*What to do @ update event?*/
		function updateStatus() {
			//Hent data
			$.getJSON( URL + 'status.json', function(data) {
				//Hvis Kenneth er der
				if (data.status == 1) {
					//Grøn indikator!
					statusLight.css('background', settings.yesColor);
				} else if (data.status == 0) {
					//Ellers rød indikator!
					statusLight.css('background', settings.noColor);
				}
			});
		}
		return this;
	};
}( jQuery ));

$('#status').statusWidget({url: 'http://172.26.13.44/', interval: 250});