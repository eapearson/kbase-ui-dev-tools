# Developing a new data visualization widget

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

In order to create the framework for a data vis widget, you will need to enter the following command line from data Dev Tools directory.

```
grunt create-data-widget-plugin mywidget
```

where ```mywidget``` is the id you wish to provide the widget

> TODO: how to look up existing widgets?

This creates a skeletal plugin filesystem within the repos directory, and initializes it as git repository. The plugin project directory is includes sample files and configuration which will actually make a working data vis widget for the *Communities.Collection* type.

The plugin project directory contains the following elements:

- directory structure suitable for plugin development.
    - note that the files within the ```source``` subdirectory are the actual files of the ui plugin.
- working sample files for all common types: javascript, css, json, yaml.
- a plugin config file which will actually wire this plugin into the runtime
- a package.json helps the directory integrate into common IDEs
- a README.md  and LICENSE help you prepare it for synchronization with a public git repository like github.

### Create a github repository

This tutorial presumes to use github as a git repository service. You many use any service you like. This flexibility is especially relevant during the early stages of a project in which you may wish to use a git service for project backup and sharing, yet not make it public and open source just quite yet.

**1.** Visit your github account

**2.** Create a repository named with this pattern: 'kbase-ui-plugin-ID'.

The 'kbase-ui-plugin-' prefix serves to assure that the namespace for this repository is unique within kbase-ui-plugins. This assists in searching for UI plugins across a repository service, as well as ensuring that accounts with multiple plugin repos will avoid name clashes. 

The ID is a unique plugin identifier. Since a plugin may contain multiple widgets and other types of javascript modules, you should consider the scope of your plugin and name it accordingly. 

For instance, if you are working in the Anderson lab and wish to eventually product a set of widgets for various data types, you may wish to call the plugin *kbase-ui-plugin-anderson-lab-widgets*. On the other hand, if you are an individual and want to keep the project limited to one widget, you may name it *kbase-ui-plugin-john_smith-widget1*.

> maybe we can set up a repo which serves as a ui plugin catalog?

**3.** Update your online repository for the first time

```
git add -A
git commit -m "Initial commit of my new plugin"
git remote add origin "https://github.org/eapearson/kbase-ui-plugin-test"
git push orgin/kbase-ui-plugin-test
```

### Configure the UI Runtime

As described in the [architecture](architecture.html) documents, the KBase UI consists of the core app, plugins, and a runtime configuration to determine how the UI server runs and which plugins to load.

In the development environment we can use the runtime configuration feature to point our UI runtime to the local copy of the new plugin. This ensures a rapid development process, because all changes can be made to the local repo and loaded directly from it. Eventually we'll change this configuration to load the plugin directly from the repository.

**1.** Edit the file 

