var fs = require('fs');
var content = fs.readFileSync(__dirname+'/LPConsumer.js', 'utf8');
eval (content);

module.exports = {
	LongPollBuffer:require('./LPBuffer.js').LongPollBuffer,
	LongPollConsumer:LongPollConsumer
}
