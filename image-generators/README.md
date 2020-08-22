# Image generators  
This is the place where we create new Rhythmic Figures and add them to the main site's assets.  
The intent is to be as straightforward and automated as possible, but there are a few caveats which I hope will be improved in the future.  

# Usage  
1. The first step to create your rhythmic figure is to open up `rhythms_data.json` and add an object to the list. The object should be as follows:  
```jsonc
"figure name": {
    "ly_rhythm": "lilypond_rhythm_string",  // Used to generate the image
    "levada_rhythm": [                      // Used to play the rhythmic figure
        { "type": "note | rest", "duration": "fraction of the semibreve as string" },
        // You can add more rhythmic elements in the array
    ]
}
```  
- Figure name should be camelCase and unique among all other figures.  
- Lilypond rhythm string is the string with the notes/rests and their duration that will generate the desired image when sent through lilypond (this [doc page](http://lilypond.org/doc/v2.20/Documentation/notation/writing-rhythms) should suffice for most simpler use cases). All other configurations (colors, resolution, transparent background, file format, etc.) have been set either in `template.ly` or in `Makefile`.  
- Levada rhythm is an array of one or more rhythmic elements composed of type and duration. The sum of all durations should be 1/4 because we're considering the quaver to be one beat (n/4 time signature). This is what's used to play the audio (see [playBeat.ts](/src/utils/playBeat.ts))  
    - Type is either "note" or "rest"  
    - Duration is a fraction written as a string, preferably with spaces so that the linter doesn't complain (i.e. "1 / 8" for a quaver)  
  
2. After you've defined it, use `make SOURCE=<figureName>`, where figureName is the figure name defined in the JSON file. This command will create all necessary and files directories and should be already up on the website upon reload.