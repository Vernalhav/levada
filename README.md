<img src="/src/assets/images/levada-logo-black.svg" height="200px"/>

This project aims to be a website in which you can practice your rhythmic solfège through simple
one-beat rhythmic figures.  
  
# Overview  
Sight reading sheet music is a daunting task. Not only do you need to worry about key signatures, accidentals, chords, articulations, but also about rhythm! This project emerged as a result of my journey trying to be a better musician and wanting a good way to practice understanding the most common rhythmic figures. The project was heavily inspired by [Saher Galt's videos](https://www.youtube.com/watch?v=Y5_27Gc28ls&list=PLL_-wssODcBPiAtEQYgAMWLj2WJdMvYlm) on rhythm.  
Currently the site is in its barest-bones version possible, but it's enough to start practicing!  

# Screenshots  
![Desktop screenshot](/screenshots/desktop_screenshot.png) | ![Mobile screenshot](/screenshots/mobile_screenshot.png)  
--------------------------------------------------------------|------------------------------------------------------------- 
# Browser Support  
Chrome | Edge | Firefox  
-------|------|-------  
Yes | Yes | No  
  
On Firefox, the audio doesn't play in sync or at all on BPMs > 60. I really don't know how to fix this issue, so a pull request would be greatly appreciated! Any comments can be made on the relevant issue. Feel free to test this in other browsers and update this README :)  
  
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
The main logic of the application is contained in [the main page](/src/pages/mainPage.tsx), as it controls all other events.

# TODO:  
- Scoring system!!  
- Fix first-beat stop bug  
- Select only a subset of rhythmic figures to appear  
- Componentize buttons container  
- Better firefox support  
- Refactor mainPage's game logic  
- Remove rhythmic figure to image-generators' make  
- Play multi-beat rhythmic figures (and display them in a different way)  
All can be found detailed in the Issues tab.
