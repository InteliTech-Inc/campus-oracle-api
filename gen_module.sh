#!/bin/bash

# Check for correct usage
if [ "$1" != "g" ] || [ -z "$2" ]; then
  echo "Usage: module g <module-name>"
  exit 1
fi

cd src/core/ || exit

MODULE_NAME=$2

# Create the directory structure
mkdir -p "$MODULE_NAME/routes"

# Create the files
touch "$MODULE_NAME/routes/$MODULE_NAME.docs.ts"
touch "$MODULE_NAME/routes/$MODULE_NAME.routes.ts"
touch "$MODULE_NAME/$MODULE_NAME.controller.ts"
touch "$MODULE_NAME/$MODULE_NAME.entities.ts"
touch "$MODULE_NAME/$MODULE_NAME.schema.ts"
touch "$MODULE_NAME/$MODULE_NAME.service.ts"

echo "Module '$MODULE_NAME' created successfully!"
