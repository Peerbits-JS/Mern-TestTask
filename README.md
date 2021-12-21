# Peerbits Task Backedn

Backend application for the Test project.

## Motivation

app that Register user and send welcome mail to users

## Table of contents

- [Peerbits Task Backedn](#peerbits-task-backedn)
  * [Motivation](#motivation)
  * [Table of contents](#table-of-contents)
  * [Tech/framework/modules used](#tech-framework-modules-used)
  * [Features](#features)
  * [Installation & Configuration](#installation---configuration)
  * [API Reference](#api-reference)
  * [How to use?](#how-to-use-)
      - [Folder Structure](#folder-structure)
  * [Troubleshooting & FAQs](#troubleshooting---faqs)
  * [Contribute](#contribute)

## Tech/framework/modules used

-   Node JS @ 14.x
-   Typescript @ 3.9.x
-   Mongo DB @ 4.2.x
-   NPM

## Features

-   User : It creates new User .

## Installation & Configuration

after cloning the project do follow these steps

1. Install dependencies via npm:

```bash
npm i # (for local setup)
```

```bash
npm i --only=prod  # (if it's on server)
```

2. Create .env file identical to example.env with valid values
3. Make sure to set `SERVER_ENV` to `local` for local setup and change values accordingly in different environments.
5. To start the server

```bash
npm start
```

## API Reference

Please get the postman collection from docs directory of this project.

## How to use?

After done all changes or without any changes.

```bash
npm start
```

Go on browser/postman fire, We will get response.

```
http://localhost:3500/
```

You can also use local frontend setup to interact with GUI/Panel.

#### Folder Structure

Common structure that is used in this project is as following

```
.
└── src
    └── components
        └── module
            ├── module.route.ts
            ├── module.controller.ts
            ├── module.model.ts
            ├── module.helper.ts
            ├── module.DAL.ts
            └── module.types.d.ts
```

| File                 | Usage/Description                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| module.route.ts      | All the routes for this feature will be defined here. It will not include any kind of business logic. It will just redirect to controller function for the particular route.      |
| module.controller.ts | Controller will business logic to the API or it will use helpers to do the business logic                                                                                         |
| module.model.ts      | If feature will use DB then interfaces and schema for model will be defined here                                                                                                  |
| module.helper.ts     | Helper functions should be defined here which will be used as business logic for the controller functions. however it won't have any kind of DB query directly used.              |
| module.DAL.ts        | Data access layer will contain all the queries required for DB operations. controller or helper will call functions from DAL and they won't use any DB query directly without DAL |
| module.types.d.ts    | if some types for function/variable/return type are large then that types will be defined here instead of inline                                                                  |

## Troubleshooting & FAQs

-   Getting `nodemailer` error then remove node modules and do `npm i` again

## Contribute

To contribute to the project, please keep these things in mind:

-   Environment branches used: development, staging, master. Master pointing to production, staging & development pointing to respective environments.
-   Project uses git-flow style branching strategy. Base branch for Git-flow is staging. Working branch is development.
-   Use smaller commits, and write descriptive commit messages.
-   Fix all possible Lint errors before merging feature branch into any environment.
