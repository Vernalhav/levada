# Where to save asset files with make asset
SOURCE=
ASSET_DIR=../src/assets/RhythmicFigures
MASTER_INDEX_PATH=../src/assets/RhythmicFigures/index.ts

# Not meant to be changed
SRC_NAME=$(basename $(notdir $(SOURCE)))
OUTPUT_DIR= $(shell echo $(SRC_NAME) | awk '{ print toupper( substr( $$0, 1, 1 ) ) substr( $$0, 2 ); }')
RHYTHM_IMG=$(SRC_NAME).png

TEMPLATE_SCRIPT=scripts/mktemplate.py
PATCH_SCRIPT=scripts/patch_index.py

LY_TEMPLATE=templates/template.ly
TS_TEMPLATE=templates/template.ts

ifeq ($(SOURCE),)
$(info You must set the SOURCE string to be <rhythmicFigureName> in camelCase)
all:

else
all: asset patch

# Creates directory, generates image and .ly from figure name
# and generates the figure's index.ts (i.e. assets/RhythmicFigures/Quavers/index.ts)
# NOTE: FIGURE NAME MUST BE PRESET IN rhythms_data.json!
$(RHYTHM_IMG) rhythmic_figure_index.ts: $(TEMPLATE_SCRIPT)
	python3 $(TEMPLATE_SCRIPT) $(SRC_NAME)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 lilypond/$(SOURCE).ly
	rm -f *.eps $(RHYTHM_IMG)
	mv $(SRC_NAME)-*.png $(RHYTHM_IMG)
# Lilypond creates an A4 image in the output directory that doesn't interest us.
# We want the snippet that is created in the current directory to be renamed to the target image

# Moves the output of mktemplate.py to the correct directory in assets/RhythmicFigures/<figure>
asset: $(RHYTHM_IMG) rhythmic_figure_index.ts
	mkdir -p $(ASSET_DIR)/$(OUTPUT_DIR)
	mv $(RHYTHM_IMG) $(ASSET_DIR)/$(OUTPUT_DIR)
	mv rhythmic_figure_index.ts $(ASSET_DIR)/$(OUTPUT_DIR)/index.ts

# Creates patchfile to update assets/RhythmicFigures/index.ts
patchfile: $(PATCH_SCRIPT) index.ts
	python3 $(PATCH_SCRIPT) $(SRC_NAME)

index.ts:
	cp $(MASTER_INDEX_PATH) .

# Updates assets/RhythmicFigures/index.ts to include new figure in export
patch: patchfile index.ts
	patch index.ts patchfile
	mv index.ts $(MASTER_INDEX_PATH)
	rm patchfile

update: asset

.PHONY: all asset patch update
endif