@echo OFF

echo ~~~~~~~~~~~~~~~~~~~Backend~~~~~~~~~~~~~~~~~~~
cd backend
set BACKENDREPORT=BackendTestReport.txt
set BACKENDCOVERAGE=BackendTestCoverage.txt
set BACKENDSTYLE=BackendStyle.txt
set BACKENDMETRICS=BackendMetrics.txt

echo ~~~~~~~~~~~~~~~~~~~Running tests~~~~~~~~~~~~~~~~~~~
coverage run --branch --source='.' manage.py test tests -v 2 >> %BACKENDREPORT% 2>&1
type %BACKENDREPORT%

echo ~~~~~~~~~~~~~~~~~~~Generating coverage report~~~~~~~~~~~~~~~~~~~
coverage report -m  --omit="*/test*" >> %BACKENDCOVERAGE%
coverage html --omit="*/test*"
type %BACKENDCOVERAGE%

echo ~~~~~~~~~~~~~~~~~~~Generating linting report~~~~~~~~~~~~~~~~~~~
pylint companion_api >> %BACKENDSTYLE%
type %BACKENDSTYLE%

echo ~~~~~~~~~~~~~~~~~~~Generating metric report~~~~~~~~~~~~~~~~~~~
echo Raw Metrics >> %BACKENDMETRICS%
radon raw companion_api >> %BACKENDMETRICS%
echo; >> %BACKENDMETRICS%
echo Clomatic Complexity >> %BACKENDMETRICS%
radon cc companion_api >> %BACKENDMETRICS%
echo; >> %BACKENDMETRICS%
echo Maintainability Index >> %BACKENDMETRICS%
radon mi companion_api >> %BACKENDMETRICS%
type %BACKENDMETRICS%

echo ~~~~~~~~~~~~~~~~~~~Migrating reports to tests/Reports~~~~~~~~~~~~~~~~~~~
if not exist "./tests/Reports" mkdir "./tests/Reports"
move /y %BACKENDREPORT% ./tests/Reports
move /y %BACKENDCOVERAGE% ./tests/Reports
if exist "./tests/Reports/htmlcov" rmdir /s /q "./tests/Reports/htmlcov"
move /y htmlcov ./tests/Reports
move /y %BACKENDSTYLE% ./tests/Reports
move /y %BACKENDMETRICS% ./tests/Reports
cd ..

echo ~~~~~~~~~~~~~~~~~~~Frontend~~~~~~~~~~~~~~~~~~~
cd frontend2
set FRONTENDREPORT=FrontendTestReport.txt

echo ~~~~~~~~~~~~~~~~~~~Running tests~~~~~~~~~~~~~~~~~~~
call npx jest -i --ci --coverage >> %FRONTENDREPORT%

echo ~~~~~~~~~~~~~~~~~~~Migrating reports to tests/Reports~~~~~~~~~~~~~~~~~~~
if not exist "./tests/Reports" mkdir "./tests/Reports"
move /y %FRONTENDREPORT% ./tests/Reports
cd ..

echo ~~~~~~~~~~~~~~~~~~~Done!~~~~~~~~~~~~~~~~~~~
pause
