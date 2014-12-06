# Bangular RESTful web service

This is intended to be used with the [Bangular] (Backbone.js + Angular.js) code example.

### The aim

To provide a simple yet expandable RESTful web service to work with the [Bangular] Angular.js demo.

### This is not intended to be a final solution

I published this code to help demonstrate the functionality of [Bangular] (and also maybe help people see how to structure node.js backend apps). There could be bugs, this is not 100% complete, and there are likely better ways structure / build node.js apps.

Similar to the [Bangular] UI: Use this as a guide, not a final solution.  I'll add things to this repo over the coming weeks/months, and when I'm done I plan to write a few blog posts and tutorials explaining it in detail.

### Still to come

- Tutorial / documentation to explain it
- Tutorials on how to expand / improve the functionality

### Getting started

##### Requirements

- [Node.js]
- An [MySQL] server

##### Instructions

1. Download or clone the GIT repo
2. From the directory you downloaded/cloned the repo in to: install node.js dependencies using **npm install**
```sh
$ npm install
```
3. Create a new MySQL database for bangular
4. Import **schema.sql** in to your new database
5. In the **app/config** directory re-name **local.json.default** to **local.json** and update the MySQL host, login and database details inside to the one you just created
6. Update the **webService** config details if you want the api to run on a host and/or port other than '127.0.0.1:7133'
7. Start the web service!
```sh
$ node ./
```
8. The **URL** in the welcome message tells you where the web service is set-up (http://127.0.0.1:7133 unless you modified it in the configuration)
9. GET http://127.0.0.1:7133/todos/1 to make sure it's working as expected.  You should get something like this:
```json
{
    "ID": 1,
    "Summary": "My first todo",
    "Details": "Detailed information about my first todo",
    "Created": "2014-12-06T06:33:19.000Z",
    "Deleted": null
}
```

### Special thanks to

- [Bookshelf.js]
- [Knex.js]
- [Underscore.js]
- [restify] based on [express]
- [q]
- [Node.js]

[Bangular]:https://github.com/mycetophorae/bangular
[Bookshelf.js]:http://bookshelfjs.org/
[Knex.js]:http://knexjs.org/
[Underscore.js]:http://underscorejs.org/
[node.js]:http://nodejs.org
[restify]:https://www.npmjs.org/package/restify
[express]:http://expressjs.com/
[MySQL]:http://www.mysql.com/
[q]:https://github.com/kriskowal/q