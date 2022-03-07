@echo OFF

echo ~~~~~~~~~~~~~~~~~~~Backend~~~~~~~~~~~~~~~~~~~
cd backend
set BACKENDREPORT=Report.txt
set BACKENDCOVERAGE=Coverage.txt
set BACKENDSTYLE=Style.txt
set BACKENDMETRICS_RAW=Raw.txt
set BACKENDMETRICS_CC=CyclomaticComplexity.txt
set BACKENDMETRICS_MI=MaintainabilityIndex.txt

echo ~~~~~~~~~~~~~~~~~~~Running tests~~~~~~~~~~~~~~~~~~~
coverage run --branch --source='.' manage.py test tests -v 2 >> %BACKENDREPORT% 2>&1
type %BACKENDREPORT%

echo ~~~~~~~~~~~~~~~~~~~Generating coverage report~~~~~~~~~~~~~~~~~~~
coverage report -m  --omit="*/test*,*/core*" >> %BACKENDCOVERAGE%
coverage html --omit="*/test*,*/core*"
type %BACKENDCOVERAGE%

echo ~~~~~~~~~~~~~~~~~~~Generating linting report~~~~~~~~~~~~~~~~~~~
pylint companion_api >> %BACKENDSTYLE%
type %BACKENDSTYLE%

echo ~~~~~~~~~~~~~~~~~~~Generating metric report~~~~~~~~~~~~~~~~~~~
radon raw companion_api accounts core >> %BACKENDMETRICS_RAW%
type %BACKENDMETRICS_RAW%
radon cc companion_api accounts core >> %BACKENDMETRICS_CC%
type %BACKENDMETRICS_CC%
radon mi companion_api accounts core >> %BACKENDMETRICS_MI%
type %BACKENDMETRICS_MI%

echo ~~~~~~~~~~~~~~~~~~~Migrating reports to ./reports~~~~~~~~~~~~~~~~~~~
if not exist "./reports" mkdir "./reports"
if not exist ".reports/tests" mkdir "./reports/tests"
move /y %BACKENDREPORT% ./reports/tests
move /y %BACKENDCOVERAGE% ./reports/tests
if exist "./reports/htmlcov" rmdir /s /q "./reports/htmlcov"
move /y htmlcov ./reports
move /y %BACKENDSTYLE% ./reports
if not exist "./reports/metrics" mkdir "./reports/metrics"
move /y %BACKENDMETRICS_RAW% ./reports/Metrics
move /y %BACKENDMETRICS_CC% ./reports/Metrics
move /y %BACKENDMETRICS_MI% ./reports/Metrics
cd ..

echo ~~~~~~~~~~~~~~~~~~~Frontend~~~~~~~~~~~~~~~~~~~
cd frontend
set FRONTENDREPORT=Report.txt

echo ~~~~~~~~~~~~~~~~~~~Running tests~~~~~~~~~~~~~~~~~~~
call npm test -- --coverage --watchAll=false >> %FRONTENDREPORT% 2>&1
type %FRONTENDREPORT%

echo ~~~~~~~~~~~~~~~~~~~Migrating reports to tests/Reports~~~~~~~~~~~~~~~~~~~
if not exist "./reports" mkdir "./reports"
if not exist ".reports/tests" mkdir "./reports/tests"
move /y %FRONTENDREPORT% ./reports/tests
cd ..

echo ~~~~~~~~~~~~~~~~~~~Done!~~~~~~~~~~~~~~~~~~~
pause
