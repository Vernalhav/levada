# Image generators  
This is the place where we create new Rhythmic Figures and add them to the main site's assets.  
The intent is to be as straightforward and automated as possible, but there are a few caveats which I hope will be improved in the future.  

# Usage  
The first step to create your rhythmic figure is to open up `rhythms_data.json` and add an object to the list. The object should be as follows:  
```
<figure name>: {
    ly_rhythm: <lilypond rhythm string>,
    levada_rhythm: [
        { type: "note" | "rest", duration: <fraction of the semibreve as string> },
        ...
    ]
}
```  
**IMPORTANT NOTE:** figure name should be in camelCase and fraction of the semibreve should be a string, preferably with spaces between the digits so the linter doesn't complain later.