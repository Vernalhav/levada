# Where to save asset files with make asset
ASSET_DIR=../src/assets/RhythmicFigures

# Which file to copy from when creating a new copy
COPY_MODEL=Triplets/triplets.ly

# Not meant to be changed
OUTPUT_DIR=$(dir $(SOURCE))
SRC_NAME=$(notdir $(SOURCE))
SOURCE_LAST_DIR=$(notdir $(OUTPUT_DIR:%/=%))

TARGET=$(SOURCE:%.ly=%.png)

all: $(TARGET)

$(TARGET): $(SOURCE)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 $(SOURCE)
	rm -f *.eps $(SRC_NAME:%.ly=%.png)
	mv $(SRC_NAME:%.ly=%)-*.png $(TARGET)

asset: $(TARGET)
	mkdir -p $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	cp $(TARGET) $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	python3 mktemplate.py $(SRC_NAME:%.ly=%)
	mv index.ts $(ASSET_DIR)/$(SOURCE_LAST_DIR)

copy: $(COPY_MODEL)
	mkdir -p $(DIRNAME)
	cp $(COPY_MODEL) $(DIRNAME)/$(SRCNAME).ly

.PHONY: all clean asset copy

clean:
	rm -f *.eps *.png
