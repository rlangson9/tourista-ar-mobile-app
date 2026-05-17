#!/bin/bash
export PYTHONPATH="/Volumes/Untitled/TOURI AI Model/Touri Ai:$PYTHONPATH"
cd "/Volumes/Untitled/TOURI AI Model/Touri Ai/tourista_ai_model"
python3 -m uvicorn api.endpoints:app --host 0.0.0.0 --port 8000
