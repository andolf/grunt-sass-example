module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          compass: true,
          style: 'expanded'
        },
        files: {
          'stylesheets/app.css': 'sass/application.scss'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'stylesheets/app.min.css': 'stylesheets/app.css'
        }
      }
    },

    watch: {
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'cssmin']);
};