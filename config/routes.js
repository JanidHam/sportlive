/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  '/agregar-cliente': {
    view: 'addclient'
  },

  'GET /editar-cliente': 'ClientController.getClientById',/*{
    view: 'editclient',
    locals: { client: '1'}
  },*/
  
  'POST /asist-client': 'ClientscheduleController.getAsistByClient',

  'POST /class-update-id': 'ClientscheduleController.setAsistByClass',

  'POST /release-schedule-client': 'ClientscheduleController.deleteClassesByClient',

  'POST /remove-inAsist-client': 'ClientscheduleController.deleteInAsistByID',

  'POST /list-clients': 'ClientController.getAllClients',

  'POST /delete-client': 'ClientController.deleteClienteByID',

  'POST /find-class-client': 'ClientscheduleController.findClassByDayAndHour',

  'POST /add-client': 'ClientController.addNewClient',

  'POST /classes-schedule': 'ClassscheduleController.getClassSchedule',

  'POST /classes-schedule-client': 'ClassscheduleController.getClassScheduleByClient',

  'POST /hours': 'HourController.getAllHours',

  'POST /active-disciplines': 'DisciplinaController.getActiveDisciplines',

  'POST /active-packages': 'PaqueteController.getActivePackages'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
