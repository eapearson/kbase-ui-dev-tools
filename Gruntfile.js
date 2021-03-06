'use strict';
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
    // Config
    // TODO: maybe read something from the runtime/config directory so we don't 
    // need to tweak this and accidentally check it in...
    var DEV_DIR = '../dev';

    function devDir(subdir) {
        if (subdir) {
            return path.normalize(DEV_DIR + '/' + subdir);
        }
        return path.normalize(DEV_DIR);
    }

    function pluginDir(pluginId, subdir) {
        var thePluginDir = path.normalize(DEV_DIR + '/repos/' + pluginId);
        if (subdir) {
            thePluginDir = path.normalize(thePluginDir + '/' + subdir);
        }
        return thePluginDir;
    }

    // Project configuration
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mkdir: {
            'build-dev': {
                options: {
                    create: [
                        devDir('repos'),
                        devDir('runtime'),
                        devDir('docs'),
                        devDir('config')
                    ]
                }
            }
            //'create-plugin': {
            //    options: {
            //        create: [
            //            pluginDir(pluginName, 'src/plugin/source/javascript'),
            //            pluginDir(pluginName, 'src/plugin/source/css'),
            //            pluginDir(pluginName, 'src/plugin/source/data')
            //        ]
            //    }
            // }
        },
        markdown: {
            'build-dev': {
                files: [
                    {
                        expand: true,
                        cwd: 'src/docs',
                        src: '**/*.md',
                        dest: devDir('docs'),
                        ext: '.html',
                        
                    }
                ],
                options: {
                    template: 'src/docs/template.html',
                    markdownOptions: {
                        gfm: true
                    }
                }
            }
        },
        gitclone: {
            'build-dev': {
                options: {
                    cwd: devDir('repos'),
                    repository: 'https://github.com/eapearson/ui-common.git',
                    branch: 'ease-dev-campaign',
                    directory: 'ui-common'
                }
            }
        },
        //gitinit: {
        //    'plugin': {
        //        options: {
        //            cwd:pluginDir(grunt.option('plugin'))                    
        //        }
        //    }
        //},
        copy: {
            'create-data-widget-plugin': {
                options: {
                    force: true
                },
                files: [
                    {
                        cwd: 'src/templates/data-widget-plugin',
                        src: '**',
                        dest: pluginDir(grunt.option('plugin')),
                        expand: true
                    }
                ]
            },
            'create-plugin': {
                options: {
                    force: true
                },
                files: [
                    {
                        cwd: 'src/templates/plugin',
                        src: '**',
                        dest: pluginDir(grunt.option('plugin')),
                        expand: true,
                        rename: function (dest, src) {
                            // var m = src.match(/^(.*)_gitignore$/);
                            // if (m) {
                            //    src = m[1] + '.gitignore';
                            // }
                            if (src === '_gitignore') {
                                src = '.gitignore';
                            }
                            return dest + '/' + src;
                        }
                    }
                ]
            }
        },
        clean: {
            'clean-dev': {
                src: [devDir()],
                options: {
                    force: true
                }
            }
        }

    });

    grunt.registerTask('check-plugin', 'Set up for creating a plugin - fail and emit message if anything goes wrong', function () {
        var plugin = grunt.option('plugin');
        if (!plugin) {
            console.log('Plugin not provided, use --plugin to do so');
            return false;
        }
        var dir = pluginDir(plugin);
        if (fs.existsSync(dir)) {
            console.log('Plugin ' + plugin + ' already exists');
            return false;
        }
        return true;
    });

    grunt.registerTask('create-data-widget-plugin', [
        'check-plugin',
        'copy:create-data-widget-plugin'
    ]);
    
    grunt.registerTask('create-plugin', [
        'check-plugin',
        'copy:create-plugin'
    ]);

    // Does the whole building task
    grunt.registerTask('build-dev', [
        'mkdir:build-dev',
        'markdown:build-dev',
        'gitclone:build-dev'
    ]);

    grunt.registerTask('clean-dev', [
        'clean:clean-dev'
    ]);
    
    grunt.registerTask('build-docs', [
        'markdown:build-dev'
    ]);

};