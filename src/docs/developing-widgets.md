### Developing a Widget

A widget can be as minimal as a single javascript file, or a consist of multiple javascript files, stylesheets, and other assets. In order to bring a widget into the user interface, however, a specific directory structure and set of support files are required. These help provide a consistent pattern that the user interface code can recognize in order to properly load the widget into the runtime environment.

This structure is in the form of a *plugin*. Plugins can be used to introduce widgets, support libraries, assets, menu items, and primary routes and panels into the user interface. In fact, the KBase UI relies on plugins to provide all but the most basic UI elements.

Although it is not impossible to create a widget plugin from scratch, it is rather tedious. It would consist of following a dozen or so instructive steps on creating directories, sample files to copy, and so forth. To save you from this tedium, the Dev Toolkit provides a set of grunt tasks for creating different types of widgets. 

Creating a widget is not covered here. See the specific widget development tutorials:

- [Creating a data vis widget](developing-data-vis-widget.html)
- Creating a generic widget
- Creating a panel