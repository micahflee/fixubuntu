/* jshint indent:2, node:true */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    copy: {
      dist: {
        files: [
          { src: '*.html', dest: 'dist/', expand: true },
          { dest: 'dist/', src: ['.htaccess', 'favicon.ico'], expand: true },
          { dest: 'dist/', src: 'assets/fonts/*', expand: true },
          { dest: 'dist/', src: 'assets/img/*', expand: true }
        ]
      }
    },

    concat: {
      css: {
        src: ['assets/css/normalize.css',
              'assets/css/monokai.css',
              'assets/css/style.css'],
        dest: 'dist/assets/css/pack.css'
      },
    },

    uncss: {
      options: {
        ignore: [
          /(#|\.)hljs(\-[a-zA-Z]+)?/
        ],
        htmlroot: 'dist',
        stylesheets: ['/assets/css/pack.css']
      },
      dist: {
        src: 'dist/**/*.html',
        dest: '<%= concat.css.dest %>'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= concat.css.dest %>': '<%= concat.css.dest %>'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: 'dist',
        dest: 'dist',
        src: '**/*.html'
      }
    },

    filerev: {
      css: {
        src: 'dist/assets/css/**/{,*/}*.css'
      },
      fonts: {
        src: 'dist/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
      },
      images: {
        src: ['dist/assets/img/**/*.{jpg,jpeg,gif,png}', '!dist/assets/img/opg.png']
      },
    },

    useminPrepare: {
      html: 'dist/index.html',
      options: {
        dest: 'dist',
        root: 'dist'
      }
    },

    usemin: {
      css: 'dist/assets/css/pack*.css',
      html: 'dist/**/*.html'
    },

    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      dev: {
        files: ['assets/**/*', 'index.html', 'Gruntfile.js'],
        tasks: 'dev'
      },
      build: {
        files: ['assets/**/*', 'index.html', 'Gruntfile.js'],
        tasks: 'build'
      }
    },

    connect: {
        options: {
            hostname: 'localhost',
            livereload: 35729,
            port: 4000
        },
        livereload: {
            options: {
                base: 'dist/',
                open: true  // Automatically open the webpage in the default browser
            }
        }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true
      },
      files: {
        src: 'dist/**/*.html'
      }
    },

    clean: {
      dist: 'dist/'
    }

  });

  // Load any grunt plugins found in package.json.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'replace',
    'useminPrepare',
    'concat',
    'uncss',
    'cssmin',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'copy',
    'useminPrepare',
    'concat',
    'filerev',
    'usemin',
    'connect',
    'watch:build'
  ]);

  grunt.registerTask('test', [
    'build',
    'validation'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'watch:build'
  ]);

};
