SOURCE=test.ly

all: $(SOURCE)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 $(SOURCE)

.PHONY: clean

clean:
	rm *.eps *.png