module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [
          { dest: 'dist/', src: ['.htaccess', 'favicon.png', 'fixubuntu.sh'] },
          { dest: 'dist/', src: 'fonts/**' },
          { dest: 'dist/', src: 'img/**' }
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
          'dist/css/pack-<%= pkg.version %>.css': [
            'css/normalize.css',
            'css/shCore.css',
            'css/shThemeRDark.css',
            'css/style.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        /*compress: true,*/
        mangle: true,
        preserveComments: false,
        report: 'min'
      },
      compress: {
        files: {
          'dist/js/pack-<%= pkg.version %>.js': [
            'js/plugins.js',
            'js/shCore.js',
            'js/shBrushBash.js'
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
