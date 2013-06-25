HTTP_LongPollClient = function (url, cbmap) {
	url = url || {};
	url.schema = url.schema || 'http';
	url.port = url.port || '80';
	url.address = url.address || 'localhost';
	this.url = url;
	this.consumer = new LongPollConsumer();
	var self = this;
	cbmap = cbmap || {};

	cbmap.cb = ('function' == typeof(cbmap.cb)) ? cbmap.cp : function (data) {console.log('default handler: ', data)};

	function hook () {
		var request = new Request (
				url.schema, url.address, url.port, url.command, {last : self.consumer.last}, 
				function (data) {
					console.log(data);
					var waiting = self.consumer.consume(data);
					hook();
					cbmap.cb(waiting);
				}, 
				cbmap.errcb, cbmap.downcb
		);
	}
	hook();
}
