SOURCE=rhythms/crotchets/test.ly

OUTPUT_DIR=$(dir $(SOURCE))
SRC_NAME=$(notdir $(SOURCE))

all: $(SOURCE)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 $(SOURCE)
	rm -f *.eps $(SRC_NAME:%.ly=%.png)
	mv $(SRC_NAME:%.ly=%)-*.png $(<:%.ly=%.png)

.PHONY: clean

clean:
	rm -f *.eps *.png
