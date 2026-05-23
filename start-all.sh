#!/bin/bash

# Tourista AR - Complete Stack Startup Script
# Starts: TOURI AI Model + Backend + Frontend

set -e

echo "=========================================="
echo "  Tourista AR - Complete Stack Startup"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Navigate to project root
cd "$(dirname "$0")/.."

# TOURI AI Model path - uses environment variable if set
TOURI_AI_PATH=${TOURI_AI_PATH:-"/Volumes/Untitled/TOURI AI Model/Touri Ai"}
TOURI_AI_MODEL_PATH="$TOURI_AI_PATH/tourista_ai_model"

echo -e "${YELLOW}Checking TOURI AI Model...${NC}"
if [ -d "$TOURI_AI_MODEL_PATH" ]; then
    echo -e "${GREEN}✓ TOURI AI Model found${NC}"
    echo -e "${GREEN}  Path: $TOURI_AI_MODEL_PATH${NC}"
else
    echo -e "${YELLOW}⚠ TOURI AI Model not found at $TOURI_AI_MODEL_PATH${NC}"
    echo -e "${YELLOW}  Set TOURI_AI_PATH environment variable to the correct path${NC}"
fi

# Start TOURI AI Model (if available)
if [ -d "$TOURI_AI_MODEL_PATH" ]; then
    echo -e "${YELLOW}Starting TOURI AI Model on port 8000...${NC}"
    export PYTHONPATH="$TOURI_AI_PATH:$PYTHONPATH"
    cd "$TOURI_AI_MODEL_PATH"
    python3 -m uvicorn api.endpoints:app --host 0.0.0.0 --port 8000 &
    TOURI_PID=$!
    echo -e "${GREEN}✓ TOURI AI Model started (PID: $TOURI_PID)${NC}"
    cd - > /dev/null
else
    echo -e "${YELLOW}⚠ Skipping TOURI AI Model (not found)${NC}"
fi

# Start Backend
echo -e "${YELLOW}Starting Backend on port 5002...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
cd - > /dev/null

# Wait a moment for services to initialize
sleep 2

# Start Frontend
echo -e "${YELLOW}Starting Frontend on port 3000...${NC}"
npm run dev:app &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}All services started successfully!${NC}"
echo "=========================================="
echo ""
echo "Services:"
echo "  - TOURI AI Model: http://localhost:8000"
echo "  - Backend API:   http://localhost:5002"
echo "  - Frontend:      http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo "=========================================="

# Wait for all background processes
wait