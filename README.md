# things that you could put in here

- heroku deploy step-by-step
- other setup step-by-step (npm, git, createdb etc)
- any other how-to notes

# my advice to you

- notice that bundle.js ends up in server/public!
- if you change the name or location of server/public, don't forget to change your webpack too
- if a file exports an UppercaseObject (Sequelize model or React component) capitalize the filename
- optional: make an index.js file in /client/components which imports all your components and then exports them; that way you have one single place you can import them all from.
