\version "2.20.0"

\paper {
  indent=0\mm
  line-width=120\mm
  oddFooterMarkup=##f
  oddHeaderMarkup=##f
  bookTitleMarkup = ##f
  scoreTitleMarkup = ##f
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

\relative {
	c'4 d e f g a b c2~ c2 c,
}
