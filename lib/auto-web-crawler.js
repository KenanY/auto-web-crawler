var jsdom = require('jsdom'),
time,
url,
idxFunc,
rule = {},
done;
var mv = function(){
	idxFunc(function(res){
		var idx = res;
		idx.forEach(function(val){
			jsdom.env({
				"url":url+val,
				"scripts": ["http://code.jquery.com/jquery.js"],
				"done":function(errors,window){
					try{
						var $ = window.jQuery;
						var	temp = {};
						for(var key in rule){
							temp[key] = eval(rule[key]);
						}
						window.close();
						done(temp);
					}catch(e){
						console.error(e);
					}
				}
			});
		});
		setTimeout(mv,time);
	})
}
exports = function(opt){
	time = opt.time;
	url = opt.url;
	idxFunc = opt.idxFunc;
	rule = opt.rule;
	done = opt.done;
	mv();
}
module.exports.run = exports;