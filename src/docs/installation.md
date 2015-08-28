# Installation

The "product" of this project is a development environment in which you, the developer, may create one or more components and integrate them into the KBase User Interface. There is no real magic here. All of the tools provided herein can be conducted manually. In fact, you may find that if you become experienced with developing for KBase that you do not even need to use these tools.

### Prerequisites

Before any of the tools will work, or you can even download the tools (by the preferred method) you will need to have a few developer-friendly tools installed on your workstation. These tools include:

- git
- nodejs
- grunt

#### Macintosh

- ```git``` - an installer may be downloaded from [http://www.git-scm.com/](http://www.git-scm.com/)
- ```nodejs``` - an installer for the nodejs javascript system may be downloaded from [https://nodejs.org/](https://nodejs.org/)
- ```grunt``` - the grunt task runner is installed via the ```npm``` program which is installed with nodejs. It is not necessary, but advisable, to install the grunt command line program on your Mac system. Most modules installed by npm are installed locally in your project, but since grunt is a major dependency of not just the dev tools, but the KBase UI Client and Server and Widgets. It is also easier to integrate into your IDE or editor of choice if it is already installed on your Mac. 
    - From the Mac terminal:
    - ```sudo npm install -g grunt-cli```


#### Linux

[ to be done ]

#### Windows

Is anyone developing on windows?

### Setting Up

**1.** First you will want to create a top-level directory to serve as the container this project.

- For example:
    - ```mkdir /Users/erik/work/projects/my-first-plugin```

**2.** Then you will want to obtain the KBase UI Developer Tools. You may do this from an archive that has been made available to you, or from github. I'd recommend getting it from github.

- Download the KBase UI Developer tools:
    - to get the latest version just clone it from github:
    - ```cd /Users/erik/work/projects/my-first-plugin```
    - ```git clone https://github.com/eapearson/kbase-ui-dev-tools.git```

**3.** Install the necessary nodejs modules with npm.

- ```cd kbase-ui-dev-tools```
- ```npm install```

**4.** Finally you will use the grunt task *build-dev* to create the necessary directories and install the starter files

- ```grunt build-dev```
