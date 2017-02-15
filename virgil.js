(function(){
	if(speechSynthesis){
		this.Access = function(){
			// start to fetch voices
			window.speechSynthesis.getVoices();

			//defaults
			var attrs = {
				voice : null,
				pitch : 1,
				rate : 1,
				ignoreObjs : {
					tags : ['html', 'body', 'head'],
					classes: [],
					ids: [],
					// <div data-foo-bar = '123'></div>
					// data_attrs: [{ foo-bar : '123'}] 
					data_attrs: []
				}
			}

			// process changes to defaults
			if(arguments[0] && typeof arguments[0] === 'object'){
				this.options = extendDefaults(attrs, arguments[0]);
			}
			else{
				this.options = attrs;
			}

			function extendDefaults(source, options){
				for (attr in attrs){
					if(attrs.hasOwnProperty(attr)){
						source[attr] = attrs[attr];
					}
				}
				return source;
			}

			// by now the voices have propogated so call it again to fetch/set them
			this.options.voiceList = speechSynthesis.getVoices();
		}
	}
	else{
		console.log('SpeechSynthesis API Is Not Supported In This Browser');
	}
})();
