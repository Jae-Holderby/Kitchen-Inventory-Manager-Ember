import DS from 'ember-data';

export default DS.Model.extend({
  food: DS.attr(),
  quantity: DS.attr('number'),
  food_type: DS.attr('string'),
  member_id: DS.attr('number'),
  member_name: DS.attr()
});
