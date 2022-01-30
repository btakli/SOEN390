@ECHO OFF
cd backend
SET BACKENDREPORT=BackendTestReport.txt
SET BACKENDCOVERAGE=BackendTestCoverage.txt
ECHO "~~~~~~~~~~~~~~~~~~~Running backend tests and placing report in SOEN390/Reports/%BACKENDREPORT%...~~~~~~~~~~~~~~~~~~~"
coverage run --branch --source='.' manage.py test tests -v 2 >> %BACKENDREPORT% 2>&1
type %BACKENDREPORT%   
ECHO "~~~~~~~~~~~~~~~~~~~Generating coverage report and placing it in SOEN390/Reports/%BACKENDCOVERAGE%...~~~~~~~~~~~~~~~~~~~"

coverage report -m  --omit="*/test*" >> %BACKENDCOVERAGE% 
coverage html --omit="*/test*"
type %BACKENDCOVERAGE%
if not exist "./tests/Reports" mkdir "./tests/Reports"
move /y %BACKENDREPORT% ./tests/Reports
move /y %BACKENDCOVERAGE% ./tests/Reports
if exist "./tests/Reports/htmlcov" rmdir /s /q "./tests/Reports/htmlcov"
move /y htmlcov ./tests/Reports
ECHO "~~~~~~~~~~~~~~~~~~~Done!~~~~~~~~~~~~~~~~~~~"
PAUSE