LongPollConsumer = function () {
	this.last = undefined;
	this.buffer = [];
}

LongPollConsumer.prototype.consume = function (update) {
	if (!update) return;
	if (!(update instanceof Array)) return;
	/// if buffer is empty raise dirty ... if not, consumer should drain him out first ....
	var should_raise = this.buffer.length;
	while (update.length) {
		var u = update.shift();
		this.last = u.hash;
		this.buffer.push (u);
	}
	return this.buffer.length;
}


module.exports = {
	LongPollConsumer : LongPollConsumer
}
