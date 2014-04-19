/* jshint indent:2, node:true */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    copy: {
      dist: {
        files: [
          { src: '*.html', dest: 'dist/' },
          { dest: 'dist/', src: ['.htaccess', 'favicon.ico', 'fixubuntu.sh'] },
          { dest: 'dist/', src: 'assets/fonts/**' },
          { dest: 'dist/', src: 'assets/img/**' }
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
      js: {
        src: ['assets/js/plugins.js',
              'assets/js/highlight.pack.js'],
        dest: 'dist/assets/js/pack.js'
      }
    },

    uncss: {
      options: {
        htmlroot: "dist",
        ignore: [
          /(#|\.)hljs(\-[a-zA-Z]+)?/
        ]
      },
      dist: {
        src: "dist/**/*.html",
        dest: "<%= concat.css.dest %>"
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

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: false
      },
      dist: {
        files: {
          '<%= concat.js.dest %>': '<%= concat.js.dest %>'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
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
        src: 'dist/assets/fonts/**/*.{eot,svg,ttf,woff}'
      },
      images: {
        src: ['dist/assets/img/**/*.{jpg,jpeg,gif,png}', '!dist/assets/img/opg.png']
      },
      js: {
        src: 'dist/assets/js/**/{,*/}*.js'
      }
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
        livereload: true
      },
      files: ['assets/**/*', 'index.html', 'fixubuntu.sh', 'Gruntfile.js'],
      tasks: 'build'
    },

    connect: {
      server: {
        options: {
          base: 'dist/',
          port: 4000
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
    'useminPrepare',
    'concat',
    'uncss',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('test', [
    'build',
    'validation'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect',
    'watch'
  ]);

};
