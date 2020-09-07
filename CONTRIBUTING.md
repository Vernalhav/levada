# Contributing  
If you wish to contribute to this project, thank you! You're more than welcome :)  
If you have any questions about the project's code and structure, please open an issue and I'll reply as soon as possible. There should be a few issues opened, so check if there are any that you would like to work on. Don't be shy on joining the discussion even if the issue is already assigned to someone.    
This is my first React project, so if you see any anti-patterns, hacky solutions or things that could be improved in general, please open an issue with the \[Improvement\] tag! I'm always looking for ways to make my code better :)  
Feedback is ALWAYS appreciated!  
  
# Settoing up the development environment  
To contribute, fork the project, open up a new branch (preferably with a semantic name) and then when you're done, open up a Pull Request. I'll review them as soon as possible, so you won't be left waiting long for a merge or for feedback.  
To set up the development environment, simply run `npm install` on the root directory and then `npm start`.  
To install npm, see the [downloads page](https://nodejs.org/en/download/).  
  
# Project Structure  
```bash
├── image-generators            # All automation to generate the rhythmic figure images and specify the way they will be played 
│   ├── lilypond                # Rhythmic figures' lilypond files. This directory is completely optional.
│   ├── scripts                 # Python scripts that build and patch the corresponding template and index files
│   └── templates               # Lilypond and typescript template common to all rhythmic figures
├── sceenshots                  # Project screenshots
├── public                      # Basic HTML and website icon
└── src                         
    ├── assets                  
    │   ├── RhythmicFigures     # All rhythmic figure images and rhythm specifications (as per image-generators/rhythms_data.json)
    │   │   └─── ...
    │   ├── images              # Icons and general purpose images
    │   ├── sounds              # Metronome beat and snap sounds
    │   └── styles              # Global CSS styling
    ├── components              # React components and their individual CSS
    │   └── ...
    ├── pages                   # React elements that correspond to each page and their individual CSS
    │   └── ...
    └── utils                   # Utility functions (playBeat is here!)
```  
The main logic of the application is contained in [pages/MainPage/index.tsx](/src/pages/MainPage/index.tsx), as it controls all other events.  
The sound-playing logic is in [utils/playBeat.tsx](/src/utils/playBeat.tsx).  
All of the process of generating new rhythmic figures, their images and adding them to the site can be found in [image-generators](/image-generators) and better explained on its README.  

# Issues  
Issues are a great way to contribute and to start contributing! If you ever open up an issue that is related to the project's code (mostly bugs and improvements), try to link to the issue's most relevant file/code snippet in the project according to [this guide](https://github.blog/2017-08-15-introducing-embedded-code-snippets/). This is to encourage new contributors to look in the correct places for relevant code and make their lives easier, since it is really hard to get your bearings about where the relevant logic is when in a brand new codebase.  
