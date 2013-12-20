Something that has become more or less a staple horse of mine in new projects is working with [Grunt](http://gruntjs.com/) and [SASS](http://sass-lang.com/). If you don't know about Grunt; it's basically a task runner written in JavaScript that automates a lot of processes for you. It can minify and concatenate JavaScript- and CSS-files and also, which is useful in this case, compile SASS code and more!

Just in case you're new to [Node](http://nodejs.org/) (which Grunt runs on) I'll start at the bottom and move upwards (or downwards in this text). If you already know about Node and its package manager, [NPM](https://npmjs.org/) feel free to skip ahead.

Installing Node
First we need to install Node as that is a requirement for Grunt. If you're running on Mac OS X (first of all, congratulations!) the easiest way is to install [Homebrew](http://brew.sh/) which is an excellent package manager for OS X. Just follow it's installation steps and then in the terminal write:

$ brew install node

If you're running on Windows, you need to install Node manually by downloading the installer located on the website.

Don't worry about NPM, when you're installing Node you're getting it for free which is total awesomeness!

Downloading Grunt
Now that we have Node and NPM installed, we can download Grunt. Now all Node projects has it's information about it's dependencies and libraries written in a file known as **package.json**.  So create folder and in it create a file named package.json that has the following code written in it.

{
  "name": "myapp",
  "version": "0.1.0",
  "scripts": {
    "start": "node app.js"
  },
  "devDependencies": {
    "grunt": "*",
    "grunt-contrib-sass": "*",
    "grunt-contrib-watch": "*",
    "grunt-contrib-cssmin": "*"
  },
  "engines": {
    "node": "0.10.x"
  }
}

After that, run npm install in the terminal. Now NPM will download all the Grunt dependencies and their respective latest versions (through the wildcard specified) as listed in package.json under devDependencies. It's good practice to keep Grunt and it's plugins as developer dependencies since this usually means they won't be needed for the project to run but are mostly being used as a tool during development and therefor are not needed to be downloaded during deploy (which package.json is also used for when deploying for example to [Heroku](https://www.heroku.com/)).

As you've probably noticed (by writing the code above or by typing npm list which lists all packages downloaded to the project) there's also a few extra plugins such as sass, watch and cssmin for Grunt. We will get to those later.

Setting up Gruntfile.js
Alright, now that we got Node, NPM and Grunt (and the plugins we want), how do we go from here? Well, it's time to write some Grunt tasks!

Create a file named Gruntfile.js next to package.json and in it paste the following code:

module.exports = function(grunt) { // the general grunt function that is run

  grunt.initConfig({ // here we setup our config object with package.json and all the tasks
    pkg: grunt.file.readJSON('package.json'),

    sass: { // sass tasks
      dist: {
        options: {
          compass: true, // we're getting compass while we're at it for extended functionality
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'stylesheets/app.css': 'sass/application.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'stylesheets/app.min.css': 'stylesheets/app.css'
        }
      }
    },

    watch: { // watch task for general work
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['stylesheets/app.css'],
        tasks: ['cssmin']
      }
    }
  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // registering the default task that we're going to use along with watch
  grunt.registerTask('default', ['sass', 'cssmin']);
};

If you want more information about how exactly the Gruntfile works, I highly recommend the documentation on [getting started](http://gruntjs.com/getting-started) provided by Grunt.

Setting up SASS and Compass
SASS is a pre-processor for CSS which is neat because it allows you to do all sorts of good stuff that you're normally not able to do in CSS. The downside is that it can't be read by your conventional browser until you compile it to CSS, but the upside is that it's very flexible and powerful and also very comfortable to work with, especially in large projects where you can keep all your stuff clean.

Now we since specified in our Gruntfile that our SASS files are located in a directory called sass, let's create just that, in the root of our project. Next, following Compass practices we want to create a file called application.scss. This is our root of our SASS styling that keeps everything together and is the file that is compiled in the end to a CSS file that can actually be read by browsers.

In it write the following:

@import "base";
@import "layout";

Now, that line imports some files, but we don't have anything like that! No worries. Again, following Compass, create a new file, now named _base.scss. This is our base file which keeps all our variables and properties that are used in the rest of our SASS files to keep things clean and consistent. Because of these conventions, the underscore is ignored on import but signifies in the structure that it doesn't have any actual layout, only variables and/or mixins.

Testing it out, write in _base.scss:

$red: #f00;

Next, create a file called layout.scss. This is our starting point for styling. In it, write:

body {
  color: $red;
}

Now we're applying the value of the variable $red in _base to the body element. Some simple stuff just so we can see the fruits of our labour.

Running Grunt
Now in the terminal in the root of project run:

grunt

You should see the following printed out:
Running "sass:dist" (sass) task
File "stylesheets/app.css" created.

Running "cssmin:dist" (cssmin) task
File stylesheets/app.min.css created.

Done, without errors.

This effectively means that Grunt has now compiled our SASS file application.scss to stylesheets/app.css, then immediately created a duplicated minified file called app.css.min that be used in production that you can also check out to see the result of. It looks like standard CSS! To add to that, if you write in the terminal:

grunt watch

... Grunt goes into watch mode, which means that whenever Grunt detects changes (for example when saving) in any of the SASS files, it will automatically compile the code into new CSS files, overwriting the previous, making it easier to make changes, whether small or big.

That's it!
You can check out the full source code located at Github.