# Campus Oracle

Campus Oracle Backend is a Node.js application that provides a RESTful API for a campus oracle, tertiary students mental health management platform. The application is
built using the Express.js framework and Supabase.

## How to Run the Application in Development

```bash

git clone https://github.com/InteliTech-Inc/campus-oracle-api.git
cd campus-oracle-api
npm install
npm run dev
```
## How to Run the Production Build Locally

```bash

git clone https://github.com/InteliTech-Inc/campus-oracle-api.git
cd campus-oracle-api
npm install
npm start
```

## Table of Contents

- [Overview](#overview)
- [Directory and File Structure](#directory-and-file-structure)
  - [Top-Level Module](#top-level-module)
    - [Routes](#routes)
    - [Controller](#controller-module-namecontrollerts)
    - [Service](#service-module-nameservicets)
    - [Schema](#schema-module-nameschemats)
    - [Entities](#entities-module-nameentitiests)
  - [Special Files](#special-files)
    - [Entry Point](#entry-point)
    - [Route](#route)
    - [Types](#types)
  - [Shared](#shared)
    - [Entities](#entities)
    - [Middleware](#middleware)
    - [Service](#service)
    - [Utils](#utils)
    - [Config](#config)
- [Build Tool](#build)
---

## Overview

The Module Generator creates a feature-based directory structure to organize your project's code. A "module" represents
a self-contained feature or domain in the system. For example:

- **Authentication Module**: Handles user sign-in, sign-out, and account creation.

Each generated module consists of files and folders for routes, controllers, services, schemas, and entities. This
ensures that all the components needed to implement a feature are organized and grouped together.
To generate a new module, run the following command:

#### Linux
```bash

chmod +x gen-module.sh
npm run generate:module <module-name>
where <module-name> is the name of the module you want to create.

e.g npm run generate:module foo
```
#### Windows

```bash

npm run generate:module:win <module-name>
where <module-name> is the name of the module you want to create.

e.g npm run generate:module:win foo
```
---

## Directory and File Structure

The generator creates the following structure for a module named `foo`:

### Top-Level Module

The top-level directory, named after the module, groups all the logic for a specific feature or domain. For example:

- A module named `authentication` will include all the code related to user login, logout, and session management.

---
A top level module can also have multiple dependent features. Foo > bar means Foo is the top-level module and bar is a submodule inside the Foo top level directory.

### Routes:
The `routes` folder contains files for defining the API endpoints and documenting them:

- **/<module-name>.docs.ts**: Handles Swagger/OpenAPI documentation for the module's endpoints. For example, it
  describes the inputs, outputs, and error codes for endpoints such as `/create-user` or `/sign-out`.
- **/<module-name>.routes.ts**: Defines the API endpoints for the module and maps them to the appropriate controllers.
  For instance, endpoints like `/create-user` and `/delete-user` are defined in this file.

---

### Controller: <module-name>.controller.ts
The controller is responsible for handling HTTP requests and responses. It acts as the middle layer between the routes
and the service. Controllers typically:

- Receive requests from the routes.
- Validate the request data (using schemas).
- Call the relevant service functions to perform business logic.
- Return appropriate responses (e.g., success or error messages) to the client.

---

### Service: <module-name>.service.ts

The service layer is where the business logic resides. It encapsulates the operations that the system performs, such as:

- Interacting with databases to retrieve or save data.
- Calling third-party APIs or performing external operations.
- Processing complex logic that goes beyond simple request-response handling.

Services are reusable and can be shared across multiple controllers.

---

### Schema: <module-name>.schema.ts

Schemas define the structure of the data that the module expects. They are used for:

- Validating incoming request payloads to ensure the data matches the expected format.
- Enforcing rules, such as required fields or constraints on the data.

In this project Zod validation library used to implement schemas.

---

### Entities: <module-name>.entities.ts

Entities define how data is modeled within the system. They often map directly to database tables or collections.
Entities specify:

- The properties of the data, such as fields and types.
- Relationships between data models (e.g., one-to-many, many-to-many).

---

### Special Files
The Special Files in this project handle the other core functionality and proper operation of the application. These files serve foundational purposes, such as serving the main entry point of the app (server) and managing the central routing system.

#### Entry Point

The entry point of the application initializes the Express server and sets up the necessary middlewares, routers, and configurations.

File Location: `src/index.ts`

**Responsibilities**:
- Setting up the Express app instance.
- Adding global middlewares (e.g., `body-parser`, `cors`, `configs`, `swagger-docs`).
- Registering the main router.
- Starting the server on a specified port.

#### Route

We have two special route files, the file locations are `src/core/routes.ts` and `src/router.ts`. The `src/core/routes.ts` provides a single entry point for all module-specific routes as shown in the example below.

```typescript
// src/core/routes.ts
import express from 'express'
import { UserRoutes } from 'src/core/user/routes/user.routes.ts'
import { RiderRoutes } from 'src/core/rider/routes/rider.routes.ts'

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/rider', RiderRoutes)

export { router as ROUTES }

```

and the main router found in `src/router.ts` consolidates all the module-specific routes exported from `src/core/routes.ts` and exposes them under a common `/api` base path. 

```typescript
// src/router.ts
import express from 'express'
import { ROUTES } from 'src/core/routes.ts'

const router = express.Router();

router.use('/api', ROUTES);

export default  router
```
This configuration is useful because if in the future, we need to consider api versioning, we'd just have to append the version (eg. `/v1`, `/v2`) to the router file.

Example:

```typescript
// src/router.ts
import express from 'express'
import { ROUTES as VERSION_ONE } from 'src/core/routes.ts'
import { ROUTES as VERSION_TWO } from 'src/core/routes.ts' // assuming this is the second version

const router = express.Router();

router.use('/api/v1', VERSION_ONE);
router.use('/api/v2', VERSION_TWO);

export default  router
```

### Types

The `src/types.d.ts` file is used in this project to define custom type declarations and augment the global scope. It allows us to define types, interfaces, and other type-related elements that enhance TypeScript's static analysis and type checking.
Any custom types or extensions declared in the `types.d.ts` are automatically available across the entire project without needing to import them explicitly.
You can add custom fields or methods to globally available types, such as augmenting the Request interface in Express to include additional properties (e.g., user field for authentication purposes).

Example:

```ts
// types.d.ts
import { Request } from 'express';
import User from "./core/user/user.entities";

declare global {
    namespace Express {
        interface Request {
            user?: User; // Adding the 'user' field to the request object
        }
    }
}

```
#### Usage

```ts
app.get('/profile', (req, res) => {
    if (req.user) {
        // If the user is attached to the request, respond with user details
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

```




---
### Shared
The `Shared` directory contains reusable components and modules that are commonly used across the application. These components are designed to promote code reusability, maintainability, and modularity.

#### Entities
The Entities directory consists of the common entities shared throughout the application. They represent the structure of data.

#### Middleware
The Middleware directory contains reusable logic that can be applied globally or to specific routes. Middleware functions process requests and responses, handling tasks like authentication, validation, or logging.

#### Service
The Service directory contains business logic that is shared across multiple features. Services abstract complex operations, such as Sending Emails, Uploading Images etc., into reusable functions.

#### Utils

The Utils directory includes helper functions that perform common tasks, such as formatting strings, handling dates, or generating unique identifiers.

#### Config

The `/src/shared/config.ts` file manages configuration settings, such as environment variables, API keys for Supabase and SwaggerJsDoc

---

## Build

The project uses `tsup` as the build tool to bundle and transpile TypeScript code into production-ready JavaScript. [tsup](https://tsup.egoist.dev/) is a zero-config TypeScript bundler that simplifies the build process while providing excellent performance and flexibility.

### Usage
The production build can be done locally by running `npm run build`. This command creates a new directory called `dist` which contains the bundled files for production. To run the production build locally, run `npm start`. 

### Configuration
Configuration for tsup is specified in a tsup.config.ts file

Example.

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Entry point of the application
  format: ["cjs", "esm"],  // Output formats
  clean: true,             // Clean output directory before each build
  minify: true,            // Minify the output
  splitting: false,        // Prevent code splitting
  target: "esnext",        // Make the output compatible with 'esnext' features
  minifyIdentifiers: true, // Reduce length of variables
});

```

### Why tsup

- **Zero Configuration**: Works with minimal setup but allows customization.
- **Tree Shaking**: Removes unused code for optimized builds.
- **TypeScript Support**: Native support for `.ts` files without additional configuration.
- **Fast Builds**: Built on esbuild which quick and efficient bundling.
- **Multiple Formats**: Generates CommonJS, ESM, or UMD outputs based on requirements.
---
