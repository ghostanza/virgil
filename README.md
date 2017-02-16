# Virgil

Messing around with the SpeechSynthesis API to create a sort of screen reader

*2.7kb ugly*

*1.8kb minified* 

*780bytes minified + gzipped*

## Setup
### Loading the script
`<script src='/virgil.js'></script>`

### Create the instance
`let v = new Virgil`

This will create a new instance of the class and set up default (unless you specify other attributes)

### Test
`v.test()`

This trigger a test voice to sound

### voiceLookup
`v.voiceLookup(options)`

- When no arguments are specified, this will return an object containing all of the available voices. The object will have the voice name as the key and the `v.voiceList` index as the value. Ex: `{'whisper' : 57}`.
- If you know the name of the voice, you can call `v.voiceLookup(name)` and it will return the voice object for that name. **Example**:
```
v.voiceLookup('whisper')
SpeechSynthesisVoice {voiceURI: "Whisper", name: "Whisper", lang: "en-US", localService: true, default: false}
```
- If you know the `v.voiceList` index, you can call `v.voiceLookup(index)` to get the voice object.
**Example**:
```
v.voiceLookup(57)
SpeechSynthesisVoice {voiceURI: "Whisper", name: "Whisper", lang: "en-US", localService: true, default: false}
```

### setupVoice
`v.setupVoice(options)`

- If no arguments are specified, it will create a default `SpeechSynthesisUtterance` instance.
- You can pass the voice object, pitch, and rate to this.
**Example**:
```
v.setupVoice({'pitch' : 2, 'rate' : 0, 'voice' : this.voiceList[57]})
```

### configureIgnore
`v.configureIgnore(options)`

- WIP (This is going to be used to specify which elements should be ignored when clicked)

### clickInit
`v.clickInit()`

- This binds the click event to the speak event and passes the clicked element. It will read the `textContent` (or `alt` text) of whatever element you click on.

### endClick
`v.endClick()`

- This removes the click event (if you no longer want it to read what you click out loud)

### speak
`v.speak(e)`

- If `v.setupVoice()` was not called previously, it will set up a default `SpeechSynthesisUtterance` instance before proceeding
- If `e` is an object, it indicates that it is an `event` passed from the `clickHandler`, in which case it checks the clicked element against the `v.ignore` config to see if it should get the text or ignore it.
-- If the clicked element is not in the `ignore` config, it gets the `textContent` if it is available; if none is available it checks for `alt` text (images)
- If `e` is a string, it just says the string out loud
- Otherwise it does not say anything
