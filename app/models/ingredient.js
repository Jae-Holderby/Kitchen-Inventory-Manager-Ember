import DS from 'ember-data';

export default DS.Model.extend({
  recipe_id: DS.attr('number'),
  food_id: DS.attr('number'),
  quantity: DS.attr('number')
});
