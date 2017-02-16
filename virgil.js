(function(){
	if(speechSynthesis){
		this.Virgil = function(){
			window.speechSynthesis.getVoices();
			var attrs = {
				synth : window.speechSynthesis,
				voiceList : [],
				voiceNamesToIndex : {},
				ignore : {
					tags : ['html', 'body', 'head', 'script'],
					classes: [],
					ids: [],
					data_attrs: []
				}
			}
			if(arguments[0] && typeof arguments[0] === 'object'){
				for( attr in arguments[0] ){ 
					if(attr == 'ignore'){
						for( item in attr){
							if( attrs['ignore'][item]){ attrs['ignore'][item].push(attr[item]) }
						}
					}
					attrs[attr] = arguments[0][attr];
				}
			}

			for( i in attrs ){ this[i] = attrs[i] }
			this.voiceList = speechSynthesis.getVoices();

			for ( k in this.voiceList ){ this.voiceNamesToIndex[this.voiceList[k].name.toLowerCase()] = k}

			this.test = function(){
				var utter = new SpeechSynthesisUtterance("Testing the default voice settings");
				this.synth.speak(utter);
			}


			// METHODS
			this.voiceLookup = function(lookup){
				if(lookup){
					if(isNaN(lookup) && this.voiceNamesToIndex[(lookup.toLowerCase())]){
						return this.voiceList[this.voiceNamesToIndex[(lookup.toLowerCase())]];
					}
					else if(!isNaN(lookup) && this.voiceList[lookup]){
						return this.voiceList[lookup];
					}
					else{
						console.log("No voice found for " + lookup);
						return false;
					}
				}
				else{
					return this.voiceNamesToIndex;
				}
			}	

			this.setupVoice = function(options){
				this.utter = new SpeechSynthesisUtterance();
				this.utter.pitch = 1;
				this.utter.rate = 1;
				this.utter.voice = null;
				for(option in options){ this.utter[option] = options[option] }
				return this.utter;
			}

			this.configIgnore = function(options){
				if(options){
					for(arg in options){ this.ignore[arg] = options[arg]; }
				}
			}

			this.speak = function(b){
				if(!this.utter){ this.utter = new SpeechSynthesisUtterance() }
				if((typeof(b) == 'object') && !(this.ignore.tags.indexOf(b.target.nodeName.toLowerCase()) >= 0 )){
					this.utter.text = b.target.textContent ? b.target.textContent : b.target.alt ? b.target.alt : "There is nothing to read in this element or it is part of the ignore attribute.";
				}
				else{
					this.utter.text = b && typeof(b) == 'string' ? b : ""
				}
				this.synth.speak(this.utter);
			}

			this.clickHandler = this.speak.bind(this);

			this.clickInit = function(options){
				window.addEventListener('click', this.clickHandler, false);
			}

			this.endClick = function(){
				window.removeEventListener('click', this.clickHandler, false);
			}
		}
	}
	// FALLBACK
	else{
		console.log('SpeechSynthesis API Is Not Supported In This Browser');
	}
})();
