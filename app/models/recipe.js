import DS from 'ember-data';

export default DS.Model.extend({
  recipe: DS.attr(),
  selected: DS.attr('boolean'),
  member_id: DS.attr('number'),
  name: DS.attr(),
  ingredients: DS.attr()
});
