@echo off
start cmd /k "cd backend && bal run"
start cmd /k "cd frontend && npm run dev"
