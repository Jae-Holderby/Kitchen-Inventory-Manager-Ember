import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      food: this.get('store').findAll("food")
    })
  }
});
