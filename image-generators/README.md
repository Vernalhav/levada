# Image generators  
This is the place where we create new Rhythmic Figures and add them to the main site's assets.  
The intent is to be as straightforward and automated as possible, but there are a few caveats which I hope will be improved in the future.  

# Usage  
- The first step to create your rhythmic figure is to open up `rhythms_data.json` and add an object to the list. The object should be as follows:  
```
<figure name>: {
    ly_rhythm: <lilypond rhythm string>,
    levada_rhythm: [
        { type: "note" | "rest", duration: <fraction of the semibreve as string> },
        ...
    ]
}
```  
Lilypond rhythm string is the string with the notes/rests and their duration that will generate the desired image when sent through lilypond (see its lackluster documentation). All other configurations (colors, resolution, transparent background, file format, etc.) have been set either in `template.ly` or in `Makefile`.
**IMPORTANT NOTE:** figure name should be in camelCase and fraction of the semibreve should be a string, preferably with spaces between the symbols (i.e. "1 / 12") so the linter doesn't complain later.  
  
- After you've defined it, use `make SOURCE=<FigureName>/<figureName>`, where FigureName is the same as figureName (camelCase), but with the first letter capitalized. This command will create all necessary directories. I would like to make it be only `make SOURCE=<figureName>` but couldn't figure out an elegant way to capitalize the first letter using Make.