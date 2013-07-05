var fs = require('fs');
var content = fs.readFileSync(__dirname+'/LPConsumer.js', 'utf8');
eval (content);

content = fs.readFileSync(__dirname+'/http_client.js', 'utf8');
eval(content);
require('hersclient');

module.exports = {
	LongPollBuffer:require('./LPBuffer.js').LongPollBuffer,
	LongPollConsumer:LongPollConsumer,
	HTTP_LongPollClient : HTTP_LongPollClient
}
