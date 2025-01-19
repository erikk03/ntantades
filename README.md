# EAM PROJECT 3 2024-2025

## TEAM MEMBERS

ΚΑΓΙΑΤΣΚΑ ΕΡΙΚ - 1115202100043 - sdi2100043\
ΚΑΛΑΜΠΟΚΗΣ ΕΥΑΓΓΕΛΟΣ - 1115202100045 - sdi2100045

## HOW TO RUN

1. npm install (node_modules folder will be created)
2. npm run dev (use --host to expose)
3. open http://localhost:5173/ (port can be different based on machine)

## USER CREDENTIALS

### PARENTS

| EMAIL           | PASSWORD |
| --------------- | -------- |
| parent@taxis.gr | password |
| user@taxis.gr   | password |

### NANNIES

| EMAIL          | PASSWORD |
| -------------- | -------- |
| nanny@taxis.gr | password |
| user2@taxis.gr | password |

## GITHUB REPOSITORY

Clone using the web url:\
https://github.com/erikk03/ntantades.git

## FILE DESCRIPTION

/public folder: Has images that are used in the website\
/src: The code\
.env: Environment variables used to store sensitive data\
/src/components: jsx components build for specific use\
/src/config: Configurative and usefull files for firebase use\
/src/data: js file with data for the dropdown inputs\
/src/pages: main home page, parent and nanny pages\
/src/styles: css file with basic style\
/src/App.jsx: Protected routes and url are here\
/src/main.jsx: The main jsx file\

## WHAT WE IMPLEMENTED

Everything descriped in the project assigment. Also a lot of effort was given to some crucial backend logic.
Firestore is being used to save all important data. Local Storage used temporary, till the data is ready to be saved on firestore, then cleared from local storage.
