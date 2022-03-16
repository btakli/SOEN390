@ECHO off
::SETUP PHASE
ECHO ~~~~~~~~~~~~~~~SETUP~~~~~~~~~~~~~~~
cd backend
python -m pip install -r requirements.txt
cd ../
cd frontend
start cmd.exe /c "npm install"

TIMEOUT 30
ECHO ~~~~~~~~~~~~~~~START BACKEND~~~~~~~~~~~~~~~
cd ../
cd backend

start cmd.exe /k "python.exe manage.py makemigrations & python.exe manage.py migrate & python.exe manage.py runserver"
TIMEOUT 30
ECHO ~~~~~~~~~~~~~~~START FRONTEND~~~~~~~~~~~~~~~
cd ../
cd frontend
start cmd.exe /k "npm start"

PAUSE
cd ../





