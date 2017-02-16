# Virgil

Messing around with the SpeechSynthesis API to create a sort of screen reader

## Setup
### Loading the script
`<script src='/virgil.js'></script>`

### Create the instance
`let v = new Virgil`

This will create a new instance of the class and set up default (unless you specify other attributes)

### Test
`v.test`

This trigger a test voice to sound

### voiceLookup
`v.voiceLookup()`

- When no arguments are specified, this will return an object containing all of the available voices. The object will have the voice name as the key and the `v.voiceList` index as the value. Ex: `{'whisper' : 57}`.
- If you know the name of the voice, you can call `v.voiceLookup(name)` (ex: `v.voiceLookup('whisper')`) and it will return the voice object for that name.
- If you know the `v.voiceList` index, you can call `v.voiceLookup(index)` (ex: `v.voiceLookup(57)`) to get the voice object.

### setupVoice
`v.setupVoice(options)`

- If no arguments are specified, it will create a default `SpeechSynthesisUtterance` instance.
- You can pass the voice object, pitch, and rate to this.
Example:
```
v.setupVoice({'pitch' : 2, 'rate' : 0, 'voice' : this.voiceList[57]})
```

### configureIgnore
`v.configureIgnore(options)`

- WIP (This is going to be used to specify which elements should be ignored when clicked)

### clickInit
`v.clickInit()`

- This binds the click event to the speak event and passes the clicked element (if you want to click an element and have it read the text inside of it)

### endClick
`v.endClick()`

- This removes the click event (if you no longer want it to read what you click out loud)

### speak
`v.speak(e)`

- If `v.setupVoice()` was not called previously, it will set up a default `SpeechSynthesisUtterance` instance
- If `e` is an object, it indicates that it is an `event` passed from the click handler, in which case it checks the clicked element against the `v.ignore` config to see if it should get the text or ignore it.
-- If the clicked element is not in the `ignore` config, it gets the `textContent` if it is available; if none is available it checks for `alt` text (images)
- If `e` is a string, it just says the string out loud; otherwise it does not say anything