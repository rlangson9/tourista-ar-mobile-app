#!/bin/bash

# TOURI AI Model - Startup Script
# Uses TOURI_AI_PATH environment variable if set, otherwise defaults to the correct path

TOURI_AI_PATH=${TOURI_AI_PATH:-"/Volumes/Untitled/TOURI AI Model/Touri Ai"}
TOURI_AI_MODEL_PATH="$TOURI_AI_PATH/tourista_ai_model"

# Check if TOURI AI model exists
if [ ! -d "$TOURI_AI_MODEL_PATH" ]; then
    echo "ERROR: TOURI AI Model not found at $TOURI_AI_MODEL_PATH"
    echo "Please set TOURI_AI_PATH environment variable to the correct path"
    exit 1
fi

echo "Starting Touri AI Model..."
echo "Path: $TOURI_AI_PATH"
echo ""

# Set Python path and start the server
export PYTHONPATH="$TOURI_AI_PATH:$PYTHONPATH"
cd "$TOURI_AI_MODEL_PATH"
python3 -m uvicorn api.endpoints:app --host 0.0.0.0 --port 8000 --reload
