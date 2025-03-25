@echo off
setlocal enabledelayedexpansion

set "exception_dirs=.deploy foo bar"
set "exception_files=foo.bat bar.bat"

for /d %%D in ("F:\foo\bar\*") do (
  set "delete_dir=true"
  for %%E in (%exception_dirs%) do (
    if /i "%%~nxD"=="%%E" set "delete_dir=false"
  )
  if "!delete_dir!"=="true" (
    echo Deleting directory: %%~fD
    rmdir /s /q "%%~fD"
  )
)

for %%F in ("F:\foo\bar\*") do (
  set "delete_file=true"
  for %%E in (%exception_files%) do (
    if /i "%%~nxF"=="%%E" set "delete_file=false"
  )
  if "!delete_file!"=="true" (
    echo Deleting file: %%~fF
    del /q "%%~fF"
  )
)

endlocal
goto :eof