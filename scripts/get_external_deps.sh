#!/bin/bash

OUTPUT_DIR="$(pwd)/extension/external_deps"

# This script is used to download external dependencies for the project,
# as Chrome Manifest V3 does not allow inlining external scripts.

# The following HTML CSS links are used in the project:
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@4.10.2/dist/tokens/CSSCustomProperties.css" />
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets@6.0.0/dist/bundled/essentials.css" />

mkdir -p $OUTPUT_DIR

# Download CSSCustomProperties.css
curl -s https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@4.10.2/dist/tokens/CSSCustomProperties.css > $OUTPUT_DIR/CSSCustomProperties.css

# Download essentials.css
curl -s https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets@6.0.0/dist/bundled/essentials.css > $OUTPUT_DIR/essentials.css

echo "External dependencies downloaded to $OUTPUT_DIR"
