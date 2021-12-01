# cvs-app-mobile-ionic-5

Ionic 5 migration project for [Commercial Vehicle Services mobile application](https://github.com/dvsa/cvs-app-mobile)

The app, added to DVSA mobile devices, allows assessors to check and record all aspects of a vehicle’s safety digitally
​

## Synopsis

​
This project contains the mobile app that demonstrates a business workflow for CVS Alpha.
​

## Architecture

[VTA High Level View](https://wiki.dvsacloud.uk/display/HVT/VTA+High+Level++View)

### End to end design

[All in one view](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=79254695)

### Microservices and backend

VTA uses the following AWS backend microservices:

- [Activity/Visit Microservice](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=81626518)
- [ATF Microservice](https://wiki.dvsacloud.uk/display/HVT/ATF+Microservice)
- [Defects Microservice](https://wiki.dvsacloud.uk/display/HVT/Defects+Microservice)
- [Preparers Microservice](https://wiki.dvsacloud.uk/display/HVT/Preparers+Microservice)
- [Technical Records Microservice](https://wiki.dvsacloud.uk/display/HVT/Technical+Records+Microservice)
- [Test Number Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Number+Microservice)
- [Test Results Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Results+Microservice)
- [Test Types Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Types+Microservice)

[Azure](https://docs.microsoft.com/en-us/azure/active-directory/) is used for identity management and in itegrates with [EDH](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=68583709)

## Getting Started

This project using Ionic, if you don't have ionic follow [these steps](https://ionicframework.com/docs/v1/guide/installation.html).
Please install and configure [nvm](https://github.com/nvm-sh/nvm) with this node version so it can be used during installation 12.x.
The application currently run on 12+, please run `nvm use` once the correct node(s) versions have been downloaded with nvm.

### Security

#### scanrepo

Please install and run the following securiy programs as part of your testing process:

[repo-security-scanner](https://github.com/UKHomeOffice/repo-security-scanner) and after installing run it with `git log -p | scanrepo`.

#### Sonarqube

In order to generate SonarQube reports on local, follow the steps (brew or docker approach is recommended):

- install sonarqube using brew - [formula](https://formulae.brew.sh/formula/sonarqube) -
- change `sonar.host.url` to point to localhost, by default, sonar runs on `http://localhost:9000`.
- run the sonar server - `sonar start` - then perform your analysis - `npm run sonar-scanner` -
- report will be available on `http://localhost:9000/dashboard?id=org.sonarqube%3Acvs-app-mobile`.

or alternatively you can manually install sonar server and its scanner:

- Download SonarQube server - [sonarqube](https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-7.6.zip)
- Download SonarQube scanner - [scanner](https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-macosx.zip)
- Add sonar-scanner in environment variables -> In bash_profile add the line `export PATH=<PATH_TO_SONAR_SCANNER>/sonar-scanner-3.3.0.1492-macosx/bin:$PATH` - Add sonar-scanner in environment variables -> In bash_profile add the line `"export PATH=<PATH_TO_SONAR_SCANNER>/sonar-scanner-3.3.0.1492-macosx/bin:$PATH"`
- Start the SonarQube server -> `cd <PATH_TO_SONARQUBE_SERVER>/bin/macosx-universal-64 ./sonar.sh start` - Start the SonarQube server - `cd <PATH_TO_SONARQUBE_SERVER>/bin/macosx-universal-64 ./sonar.sh start`
- In the microservice folder run the command -> `npm run sonar-scanner` - In the microservice folder run the command - `npm run sonar-scanner`

### API Reference

​
This repo does not contain references to API endpoints, and requires them to be injected at build time using values from `.env` file. The `scripts/config/create-config.ts` generates a `config/application.<appType>.ts`. Please rename your `env` file to `.env` with the appropriate values/secrets.

### Running the project

It is recommended to use 12.x to run this project with the relevant node version(s), please refer to the package.json meta-data to find out about the version or `.nvmrc` file in the project.

To get a working build running locally follow these steps:

1. Clone the repository.

2. Rename the `env` to `.env`. Go to [.env](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App#GettingstartedwiththeMobileApp-.env) section and under the subheading .env copy and paste the content into the `.env` file.
   Source your `.env` file by running `source .env` (**Linux users**)

3. You can use `nvm use` to switch to the supported version of 12.x if you have more than one version of node installed
   Run `npm install`.

4. You can launch the app in the web browser of choice at this stage: <br>
   Run `npm run start` or `npm run emulate:web` to start.
   **Gotcha:** ⚠️ The authentication process requires a new tab to be opened so that the user name and password can be entered. Most browsers block this by default. So you should allow the browser pop up option ⚠️ .

<!-- Before making the Cordova build make sure you have your config files set up (`GoogleService-Info.plist` and `application.json` files)</br> -->

### Build in xCode and run app natively (ios only)

The application runs on [Xcode 13](https://developer.apple.com/xcode/resources/) which will need to be installed on your machine.
Once the platform is successfully installed, you can run the following script:

**** Details to be added ****

#### Known issues

**** Details to be added ****


- Github issues:

  - Xcode backward compatibility: [Cordova.h and Info.plist missing files](https://github.com/apache/cordova-ios/issues/760).
  - cordova-plugin-statusbar: [Github](https://github.com/apache/cordova-plugin-statusbar)
  - cordova-plugin-inappbrowser: [Github](https://github.com/apache/cordova-plugin-inappbrowser/issues/709)
  - cordova-plugin-ionic-webview: [Github](https://github.com/ionic-team/cordova-plugin-ionic-webview)

#### in the emulator:

You can run the following script - `npm run serve:livereload` to run the application in the emulator with the live reload once you retrieve your IPhone emulator id.

You will first need to get your iPhone 8 Plus that you can find under `Simulator > Hardware menu > Devices > Manage devices`.
The ID will be shown on the `Identifier` key.
You can then copy paste the value in the `env` file to the following variable to your `.env` (Please see placeholder `env` file in project):

```
export IPHONE8_P_ID=
```

## For testing on an iOS device:

**** Details to be added ****

## Contributing to the project

### Code style

- Hooks are applied on pre-commit, commit-msg and prepush using [husky](https://github.com/typicode/husky).
- Code is linted with [eslint](https://eslint.org/) - `npm run lint`
- [Typescript](https://github.com/basarat/typescript-book) is used and we follow the [angular coding style](https://angular.io/guide/styleguide) with the following [clean code principles](https://github.com/ryanmcdermott/clean-code-javascript)

### Committing code

Before commiting code, please make sure [scanrepo](https://github.com/UKHomeOffice/repo-security-scanner) is configured.</br>
We use [commitlint](https://github.com/conventional-changelog/commitlint#readme) when commiting code so make sure you are familiar with [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

## Testing

### Unit testing and integration

In order to test, you need to run the following:

- `npm run test` for unit tests.

Framework: [Jasmine](https://jasmine.github.io/2.0/introduction.html) with Karma runner.

## Infrastructure

For the CI/CD and automation please refer to the following pages for further details:

- [Pipeline](https://wiki.dvsacloud.uk/display/HVT/CVS+Pipeline+Infrastructure)
- [Development processes](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=36870584)

## Sentry Integration and Setup for production logs

The app would have been fully integrated with Sentry at this stage in the setup process. However if you wish to create a different sentry account you would need to follow these steps:

- Create an account in https://sentry.io/signup/ and create a default project to receive mobile app generated errors
- `npm install --save-dev @sentry/wizard` to help in configuring the mobile app with Sentry.io for the first time i.e. when the app does not exist in Sentry
- Add the relevant Sentry keys to your `.env` file.
- Run `npm run config` when used locally or in the pipeline will create:
  - `sentry.properties` file provided that `.env` file already exist with required key/value pairs
    This file would have also being generated during @sentry/wizard integration setup
  - `SENTRY_DNS` when set to blank in the `.env` file will disable sentry integration with the mobile app. Hence no logs will be sent to sentry for analysis.
