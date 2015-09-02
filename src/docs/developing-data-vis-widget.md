# Developing a new data visualization widget

[index](index.html)

## Scope

Set up a development environment in which a developer can create and iterate over a new data visualization widget.

## Summary

The general work flow for creating and developing a new data visualization widget is:

- install the ui dev tools
- set up the ui runtime
- create a data vis widget skeleton
- update ui runtime config to load the new data vis widget
- start the ui runtime server
- work on the widget 
    - modify
    - reload browser
    - repeat until complete

## Steps

- Install the KBase UI Toolkit
- Create the Widget plugin base
- Configure the runtime to use the widget
- Connect widget to a repository

### Install the KBase UI Tookit

This is covered in the [installation guide](installation.html).

### Create the Widget Project Directory

In order to create the framework for a data vis widget, all you need to do is invoke a single *grunt* task from the command line. Grunt is a javascript-based "task runner". With grunt it is possible to configure and run "tasks", which are essentially pre-configured procedures, to copy and modify files, and perform many types of operations. Typically grunt is used for copy and massage html, javascript, css, and asset files for web projects. However, it is fairly general purpose and can be used and extended to perform a wide range of tasks.

**1.** you will need to enter the following command line from the Dev Tools directory.

```
grunt create-data-widget-plugin mywidget
```

where ```mywidget``` is the id you wish to provide the widget

> TODO: how to look up existing widgets?

This creates a skeletal plugin filesystem within the repos directory, and initializes it as git repository. The plugin project directory includes sample files and configuration which will actually make a working data vis widget for the *Communities.Collection* type.

> TODO: pick a data type for examples

The plugin project directory contains the following elements:

- directory structure suitable for plugin development.
    - note that the files within the ```source``` subdirectory are the actual files of the ui plugin.
- working sample files for all common types: javascript, css, json, yaml.
- a plugin config file which will actually wire this plugin into the runtime
- a package.json helps the directory integrate into common IDEs
- a README.md  and LICENSE help you prepare it for synchronization with a public git repository like github.

> NOTE: currently the grunt git plugin does not support git init, so the github repository step in the next section covers this.

### Create a github repository

This tutorial presumes to use github as a git repository service. You many use any service you like. This flexibility is especially relevant during the early stages of a project in which you may wish to use a git service for project backup and sharing, yet not make it public and open source just quite yet.

**1.** Visit your github account

**2.** Create a repository named with this pattern: 'kbase-ui-plugin-ID'.

The 'kbase-ui-plugin-' prefix serves to assure that the namespace for this repository is unique within any git repo service. For instance, a repo service may be created which contains all KBase UI plugins as well as other KBase-related repos. This naming convension also assists in searching for UI plugins across a repository service. 

The ID itself is a unique plugin identifier. Since a plugin may contain multiple widgets and other types of javascript modules, you should consider the scope of your plugin and name it accordingly. 

For instance, if you are working in the Anderson lab and wish to eventually product a set of widgets for various data types, you may wish to call the plugin *kbase-ui-plugin-anderson-lab-widgets*. On the other hand, if you are an individual and want to keep the project limited to one widget, you may name it *kbase-ui-plugin-john_smith-widget1*.

> maybe we can set up a repo which serves as a ui plugin catalog?

**3.** Update your online repository for the first time

Make sure you are in the plugin directory. It will have been created in your ```dev/repos``` directory. 

From your plugin directory, issue the following commands:

```
git init
git add -A
git commit -m "Initial commit of my new plugin"
git remote add origin https://github.com/eapearson/kbase-ui-plugin-test
git push origin master
```

You may also use the git management tool of course. For insance, I use the NetBeans IDE, which has git tools built-in.

### Configure the UI Runtime

As described in the [architecture](architecture.html) documents, the KBase UI consists of the core app, plugins, and a runtime configuration to determine how the UI server runs and which plugins to load.

In the development environment we can use the runtime configuration feature to point our UI runtime to the local copy of the new plugin. This ensures a rapid development process, because all changes can be made to the local repo and loaded directly from it. Eventually we'll change this configuration to load the plugin directly from the repository.

**1.** Edit the UI Runtime Configuration

The developer runtime uses several configuration files to wire up the runtime environment. The ```dev/runtime/client.yml``` config file contains a section for establishing which plugins are to be loaded into the web app. In order to activate the new plugin, three lines need to be added anywhere in the plugins section. The plugins section will already have several internal plugins installed, including login, about, userprofile, dashboard, and contact.

> NOTE: the location of the plugins config may change in the near future, although the format will stay the same

```
plugins:
    -
        login
    -
        about
    - 
        directory: DEV/repos/my-plugin/src/plugin
```

Lets review this configuration.

The built-in plugins just specify a bare string. The plugin mapper knows that a bare string indicates the id of an internal plugin, and will load the plugin from the internal location.

Plugins added to the system will have a directory property. This property tells the plugin manager which directory contains the root of the plugin files. This mechanism provides us a lot of flexibility in installing plugins. In the development workflow, the plugins are located in the ```dev/repos``` directory. (Plugins in a production environment follow a different patter ... this is descussed in the [deployment](deployment.html) chapter.)

The first component of the plugin directory is ```DEV```. This is a special directory component used by the KBase UI server to dispatch to a custom directory. By default, the KBUI server will restrict all file access to the server root (the client directory). Since we need the plugin to be loaded from outside of the server root, the DEV special path component instructs the server to look for a special directory mapping. This mapping is provided by the next path component, in this case ```repos```. In the server configuration (```dev/config/server```) the repos path component is mapped to ```dev/repos```. The next segment of the plugin directory path, ```kbase-ui-plugin-my-plugin```, specifies the plugin directory we just created. The final segment, ```src/plugin```, is the location within the standard plugin development environment for the actual plugin source files.

#### Standard Plugin Directory Layout

A plugin follows a standard directory layout. This, in combination with the plugin configuration file, seems to provide a nice balance between convention and configuration.

The 

#### Development Plugin Directory Layout



