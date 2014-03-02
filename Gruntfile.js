/* jshint indent:2, node:true */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [
          { dest: 'dist/', src: ['.htaccess', 'favicon.ico', 'fixubuntu.sh'] },
          { dest: 'dist/', src: 'assets/fonts/**' },
          { dest: 'dist/', src: 'assets/img/**' }
        ]
      }
    },

    includereplace: {
      dist: {
        options: {
          globals: {
            version: '<%= pkg.version %>'
          }
        },
        files: [
          { src: '*.html', dest: 'dist/' }
        ]
      }
    },

    cssmin: {
      compress: {
        options: {
          compatibility: 'ie8',
          keepSpecialComments: 0,
          report: 'min'
        },
        files: {
          'dist/assets/css/pack-<%= pkg.version %>.css': [
            'assets/css/normalize.css',
            'assets/css/shCore.css',
            'assets/css/shThemeRDark.css',
            'assets/css/style.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: false,
        report: 'min'
      },
      compress: {
        files: {
          'dist/assets/js/pack-<%= pkg.version %>.js': [
            'assets/js/plugins.js',
            'assets/js/shCore.js',
            'assets/js/shBrushBash.js'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          base: 'dist/',
          keepalive: true,
          port: 4000
        }
      }
    },

    clean: {
      dist: 'dist/*'
    }

  });

  // Load any grunt plugins found in package.json.
  require('load-grunt-tasks')(grunt, {scope: 'dependencies'});
  require('time-grunt')(grunt);

  grunt.registerTask('default', ['clean', 'copy', 'includereplace', 'cssmin', 'uglify']);
};
