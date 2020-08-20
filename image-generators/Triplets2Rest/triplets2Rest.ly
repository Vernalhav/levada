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
	% Variable indicating the string to insert (see rhythms_data.json)
    \tuplet 3/2 {c'8 r8 c8}
}

% For all color changes, see Context then Layout object
% Context reference: http://lilypond.org/doc/v2.18/Documentation/notation/contexts-explained
% Layout obkect reference: https://lilypond.org/doc/v2.18/Documentation/internals/all-layout-objects
