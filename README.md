<img src="/src/assets/images/levada-logo-black.svg" height="200px"/>

This project aims to be a website in which you can practice your rhythmic solfège through simple
one-beat rhythmic figures.  
  
# Overview  
Sight reading sheet music is a daunting task. Not only do you need to worry about key signatures, accidentals, chords, articulations, but also about rhythm! This project emerged as a result of my journey trying to be a better musician and wanting a good way to practice understanding the most common rhythmic figures. The project was heavily inspired by [Saher Galt's videos](https://www.youtube.com/watch?v=Y5_27Gc28ls&list=PLL_-wssODcBPiAtEQYgAMWLj2WJdMvYlm) on rhythm.  
Currently the site is in its barest-bones version possible, but it's enough to start practicing!  
1. Use the add or remove beats button to specify the desired amount of beats  
2. Set the BPM to the desired amount  
3. Click the randomize button until a sequence you're happy with appears  
4. Click the mute button  
5. Play the sequence and click whenever you think the note should be played  
6. Unmute, play the sequence again and check your progress :)  

# Screenshots  
![Desktop screenshot](/screenshots/desktop_screenshot.png) | ![Mobile screenshot](/screenshots/mobile_screenshot.png)  
--------------------------------------------------------------|------------------------------------------------------------- 
# Browser Support  
Platform &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Chrome | Edge | Firefox | Safari  
---------|-------|------|---------|-------  
Computer         | Yes | Yes | No | Untested  
iOS              | No  | Untested   | Untested  | No  
Android          | Untested | Untested | Untested | Untested  

On Firefox, the audio doesn't play in sync or at all on BPMs > 60. I really don't know how to fix this issue, so a pull request would be greatly appreciated! Any comments can be made on the relevant issue.  
On iOS, both in Safari and in Chrome, the grid is not aligned properly and the sound is not playing correctly at all.  
Feel free to test this in other browsers and update this README :)  
  
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
    ├── components              # React components
    │   └── ...
    ├── pages                   # React elements that correspond to each page
    │   └── ...
    └── utils                   # Utility functions (playBeat is here!)
```  
The main logic of the application is contained in [pages/MainPage/index.tsx](/src/pages/MainPage/index.tsx), as it controls all other events.  
The sound-playing logic is in [utils/playBeat.tsx](/src/utils/playBeat.tsx).  
All of the process of generating new rhythmic figures and their images and adding them to the site can be found in [image-generators](/image-generators) and better explained on its README.  

# Contributing  
If you wish to contribute to this project, thank you! You're more than welcome :)  
If you have any questions about the project's code and structure, please open an issue and I'll reply as soon as possible. There should be a few issues opened, so check if there are any that you would like to work on. Don't be shy on joining the discussion even if the issue is already assigned to someone.  
To contribute, fork the project, open up a new branch (preferably with a semantic name) and then when you're done, open up a Pull Request. I'll review them as soon as possible, so you won't be left waiting long for a merge or for feedback.  
To set up the development environment, simply run `npm install` on the root directory and then `npm start`.  
  
This is my first React project, so if you see any anti-patterns, hacky solutions or things that could be improved in general, please open an issue with the \[Improvement\] tag! I'm always looking for ways to make my code better :)  
Feedback is ALWAYS appreciated!  

# TODO:  
- Scoring system!!  
- Select only a subset of rhythmic figures to appear  
- Componentize buttons container  
- Refactor mainPage's game logic  
- If possible, fix Firefox and iOS audio issues  
- Fix mobile layout  
- Remove rhythmic figure to image-generators' make  
- Better parsing of dotted notes in image-generators/rhythms_data.json  
- Play multi-beat rhythmic figures (and possibly display them in a different way)  
All these issues are better detailed in the Issues tab. Feel free to contribute!
