HTTP_LongPollClient = function (url,access_level,cb_map) {
	var url = url || {};

	var address = url.address || 'localhost';
	var port = url.port || 80;
	var schema = url.schema || 'http';

	var consumer = new LongPollConsumer();
	var cb_map = cb_map || {};

	//var update_cb =  ('function' === typeof(cb_map.update)) ? cb_map.update : function (update) {console.log(update)};
	function is_buffer_ready_valid () {
		return ('function' === typeof(cb_map.buffer_ready));
	}

	function safe_cb (cb) {
		if ('function' === typeof(cb)) return cb.apply(null, Array.prototype.slice.call(arguments, 1));
		return undefined;
	}

	this.check = function (command, data) {
		var self = this;
		data = data || {};
		data.last_update = consumer.last;
		data.hers_session= consumer.sid;

		command = '/'+(access_level || '')+'/noop';
		var request = new Request (schema, address, port, command, data, function (resp) {
			var bfr = consumer.buffer.length;
			if (consumer.consume(resp)) {
				safe_cb(cb_map[(bfr == 0)?'buffer_ready':'buffer_updated'], consumer);
			}


			consumer.consume(resp) && is_buffer_ready_valid() && cb_map.buffer_ready(consumer.buffer.length);
		});
	}
	this.check ();
	this.next = function () {return consumer.next();}
}
