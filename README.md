# HYPED Base-Station Frontend
This repo holds all the code responsible for the frontend of the HYPED base-station frontend, and is included as a submodule in [the repo for the backend](https://github.com/Hyp-ed/base-station-2019). It is a single page React app that connects to the backend through a websocket and communicates over the STOMP protocol.

### How to run
There is no need to 'run' the frontend, it is already packaged together in a jar file with the backend. Download the latest release [here](https://github.com/Hyp-ed/base-station-2019/releases) and follow the instructions [here](https://github.com/Hyp-ed/base-station-2019/blob/master/README.md).

# Running a development version of the base-station

The base-station is made up of a Java backend and a React App (Javascript) frontend. In the release version of the backend, the backend and frontend are packaged together into one .jar file. However, if you'd like to setup a development server of the React App in order to work on the project, there are a few things to configure.

### Installing dependencies

This section requires ```brew``` installed on your computer. (If you don't have `brew` set up, click [here](https://brew.sh/) for more info) In order for the React App to run we need to install some dependent libraries. In the directory containing the frontend repo, run:

```
$ brew install node
$ brew install npm
```
or on linux:
```
$ sudo apt-get install node
$ sudo apt-get install npm
```
After installing node and npm:
```
$ sudo npm install yarn -g
```

Note: do not use `sudo apt-get install yarn`. This will install a different package with the same name.

### Running the development server
Clone this repository and navigate to its directory in terminal to get started. After successfully installing the dependencies, you should be able to start the dev server, and a browser window should open.

```
$ yarn start
```

### Testing changes

Once the server is running any changes you make to the source code will automatically update the GUI in your browser.

If you'd like to test your changes with a simulated pod run, you can use [this guide](https://github.com/Hyp-ed/base-station-2019/blob/master/README.md) to run the latest release backend, which will serve the state of the pod to your development frontend GUI as well as the release GUI (in general the dev server frontend GUI will be accessible at `localhost:3000` and the release GUI will be at `localhost:8080`, when they are running). Once the backend and the development frontend are running, you can use
```
$ ./hyped <flags>
```
in the standard hyped repo directory on the same computer. Use `./hyped --f` to see which `<flags>` are available. The hyped executable should connect to the backend, and the backend should serve the state of the executable to both frontend windows. To confirm this, check that the pod-state displays "CONNECTED".



<br>

![screenshot](https://i.imgur.com/BrU8SX7.jpg)
