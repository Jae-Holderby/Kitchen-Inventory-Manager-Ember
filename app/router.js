import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('members')
  this.route('ingredients')
  this.route('recipes')
  this.route('foods')


});

export default Router;
