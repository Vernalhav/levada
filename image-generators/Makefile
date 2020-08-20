# Where to save asset files with make asset
ASSET_DIR=../src/assets/RhythmicFigures


# Not meant to be changed
OUTPUT_DIR=$(dir $(SOURCE))
SRC_NAME=$(notdir $(SOURCE))
SOURCE_LAST_DIR=$(notdir $(OUTPUT_DIR:%/=%))

TARGET=$(SOURCE:%.ly=%.png)

MASTER_INDEX_PATH=../src/assets/RhythmicFigures/index.ts

all: $(TARGET)

# Creates directory, generates image and .ly from figure name
# and generates the figure's index.ts (i.e. assets/RhythmicFigures/Quavers/index.ts)
# NOTE: FIGURE NAME MUST BE PRESET IN rhythms_data.json!
$(TARGET): mktemplate.py
	python3 mktemplate.py $(SRC_NAME:%.ly=%)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 $(SOURCE)
	rm -f *.eps $(SRC_NAME:%.ly=%.png)
	mv $(SRC_NAME:%.ly=%)-*.png $(TARGET)

# Moves the output of mktemplate.py to the correct directory in assets/RhythmicFigures/<figure>
asset: $(TARGET) index.ts
	mkdir -p $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	cp $(TARGET) $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	mv index.ts $(ASSET_DIR)/$(SOURCE_LAST_DIR)

# Creates patchfile to update assets/RhythmicFigures/index.ts
patchfile: patch_index.py index.ts
	python3 patch_index.py $(SRC_NAME:%.ly=%)

index.ts:
	cp $(MASTER_INDEX_PATH) .

# Updates assets/RhythmicFigures/index.ts to include new figure in export
patch: patchfile index.ts
	patch index.ts patchfile
	mv index.ts $(MASTER_INDEX_PATH)
	rm patchfile

.PHONY: all asset patch