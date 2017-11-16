import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      foods: this.get('store').findAll("food"),
      recipes: this.get('store').findAll('recipe'),
      ingredients: this.get('store').findAll('ingredient')
      // recipe: this.get('store').findRecord('recipe', params.recipe_id)
    })
  }
});
