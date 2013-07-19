LongPollConsumer = function () {
	this.last = undefined;
	this.buffer = [];
	this.sid = undefined;
	this.sid_name = undefined;
}

LongPollConsumer.prototype.consume = function (update) {
	if (!update || !(update instanceof Array) || !update.length) return;

	var skd = update.shift();
	if (!skd || 'object' != typeof(skd))  {
		console.log('invalid session key, session ID map ...',skd);
		return;
	}
	for (var name in skd) {
		this.sid_name = name;
		this.sid = skd[name];
		break;
	}

	var ul = update.shift();
	if (!ul  || !ul.length) {
		console.log('invalid update array ...', ul);
		return;
	}
	while (ul.length) {
		this.buffer.push (ul.shift());
	}
	return this.buffer.length;
}

LongPollConsumer.prototype.next = function () {return (this.buffer.length)?this.buffer.shift():undefined;}
