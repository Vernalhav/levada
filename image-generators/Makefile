# Where to save asset files with make asset
ASSET_DIR=../src/assets/RhythmicFigures

# Which file to copy from when creating a new copy
COPY_MODEL=Triplets/triplets.ly

# Not meant to be changed
OUTPUT_DIR=$(dir $(SOURCE))
SRC_NAME=$(notdir $(SOURCE))
SOURCE_LAST_DIR=$(notdir $(OUTPUT_DIR:%/=%))

TARGET=$(SOURCE:%.ly=%.png)

MASTER_INDEX_PATH=../src/assets/RhythmicFigures/index.ts

all: $(TARGET)

$(TARGET): $(SOURCE)
	lilypond -dclip-systems -dpixmap-format=pngalpha --png -dresolution=200 $(SOURCE)
	rm -f *.eps $(SRC_NAME:%.ly=%.png)
	mv $(SRC_NAME:%.ly=%)-*.png $(TARGET)

asset: $(TARGET) mktemplate.py
	mkdir -p $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	cp $(TARGET) $(ASSET_DIR)/$(SOURCE_LAST_DIR)
	python3 mktemplate.py $(SRC_NAME:%.ly=%)
	mv index.ts $(ASSET_DIR)/$(SOURCE_LAST_DIR)

copy: $(COPY_MODEL)
	mkdir -p $(DIRNAME)
	cp $(COPY_MODEL) $(DIRNAME)/$(SRCNAME).ly

patchfile: patch_index.py index.ts
	python3 patch_index.py $(SRC_NAME:%.ly=%)

index.ts:
	cp $(MASTER_INDEX_PATH) .

patch: patchfile index.ts
	patch index.ts patchfile
	mv index.ts $(MASTER_INDEX_PATH)
	rm patchfile

.PHONY: all clean asset copy patch

clean:
	rm -f *.eps *.png
