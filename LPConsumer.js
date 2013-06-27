LongPollConsumer = function () {
	this.last = undefined;
	this.buffer = [];
	this.sid = undefined;
}

LongPollConsumer.prototype.consume = function (update) {
	if (!update) return;
	if (update.sid) this.sid = update.sid;
	if (!this.sid) return;
	update = update.update;
	if (!(update instanceof Array)) return;
	/// if buffer is empty raise dirty ... if not, consumer should drain him out first ....
	while (update.length) {
		var u = update.shift();
		try {
			u.data = JSON.parse(u.data);
			this.buffer.push (u);
			this.last = u.hash;
		}catch (e) {
		}
	}

	console.log('have '+this.buffer.length+' updates pending');
	return this.buffer.length;
}

LongPollConsumer.prototype.next = function () {return (this.buffer.length)?this.buffer.shift():undefined;}
