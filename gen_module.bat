@echo off
REM Check for correct usage

if "%1"=="" (
    echo Usage: module g ^<module-name^>
    exit /b 1
)

cd src\core || exit /b 1

set MODULE_NAME=%1

REM Create the directory structure
mkdir "%MODULE_NAME%\routes"

REM Create the files
type nul > "%MODULE_NAME%\routes\%MODULE_NAME%.docs.ts"
type nul > "%MODULE_NAME%\routes\%MODULE_NAME%.routes.ts"
type nul > "%MODULE_NAME%\%MODULE_NAME%.controller.ts"
type nul > "%MODULE_NAME%\%MODULE_NAME%.entities.ts"
type nul > "%MODULE_NAME%\%MODULE_NAME%.schema.ts"
type nul > "%MODULE_NAME%\%MODULE_NAME%.service.ts"

echo Module '%MODULE_NAME%' created successfully!
