@ECHO OFF
cd backend
SET BACKENDREPORT=BackendTestReport.txt
ECHO "Running backend tests..."
coverage run --branch --source='.' manage.py test tests 

ECHO "Generating report and placing it in SOEN390/Reports/BackendTestReport.txt..."

coverage report -m >> %BACKENDREPORT%
if not exist "./tests/Reports" mkdir "./tests/Reports"
move /y %BACKENDREPORT% ./tests/Reports
ECHO "Done!"
PAUSE