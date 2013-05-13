$(document).ready(function() {
	var h3Label = "Received a message from IFrame:";

	addIframeListener();

	// We need to be careful of a race condition. iFrame may have already loaded so we would never get an onLoad
	if (window.iframeLoaded) {
		var iframe = $('#iframe')[0];
		connectToIFrame(iframe);
	}

	function addIframeListener() {
		var iframe = $('#iframe')[0];
		iframe.onload = function() {
			connectToIFrame(iframe);
		}
	}

	function connectToIFrame(iframe) {
		iframe.contentWindow.postMessage('connect', '*');
		updateReceivedText("");
	}

	function updateReceivedText(message) {
		document.getElementById("receivedMessage").innerHTML = h3Label + " " + message;
	}

	function clearText() {
		document.getElementById("message").value = "";
	}

	addEvent(window, 'message', function(e) {
		var response = $.parseJSON(e.data);
		updateReceivedText("status = " + response.status + " message = " + response.message);
	});
	addEvent(document.querySelector('form'), 'submit', function(e) {
		var message = JSON.stringify({
			message: document.getElementById("message").value
		});
		win.postMessage(message, '*');
		clearText();
		if (e.preventDefault) e.preventDefault();
		e.returnValue = false;
	});
	addEvent(document.getElementById("message"), 'click', function(e) {
		clearText();
	});

});