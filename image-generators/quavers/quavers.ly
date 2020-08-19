\version "2.20.0"

\paper {
  indent=0\mm
}

\layout {
    clip-regions = #(list
        (cons
            (make-rhythmic-location 1 0 0)
            (make-rhythmic-location 4 0 0)))
}

\new Staff \with {
    \remove "Staff_symbol_engraver"
    \remove "Key_engraver"
    \remove "Time_signature_engraver"
    \remove "Clef_engraver"
}

\relative c' {
	\time 4/4
	\set Timing.beamExceptions = #'()
	\override Voice.NoteHead.color = #white
	\override Voice.Beam.color = #white
	\override Voice.Stem.color = #white
	\override Voice.Rest.color = #white
	\override Voice.TupletBracket.color= #white
	\override Voice.TupletNumber.color= #white
	c8 c8
}
