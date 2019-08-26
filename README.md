## Dashboard for TV in IT Space

Get meeting information from Venueops, 1st and 3rd floor confrence room calendar and display meetings schedule for today.
Display weather in next 5 days using weatherbit.


## Note

For readCalendar in API service, set const TODAY and TOMORROW so that it only display today's schedule in dashboard.

In dashboard component, set function loopScreen so that when event list is longer than TV screen, the window will loop down to bottom then go back up.

I setTimeout for 3 seconds to call loopScreen otherwise the DOM is not loaded fully thus DOM height is not correct.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
