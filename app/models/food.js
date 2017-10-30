import DS from 'ember-data';

export default DS.Model.extend({
    food: DS.attr('string'),
    quantity: DS.attr('number'),
    food_type_id: DS.attr('number'),
    member_id: DS.attr('number')
});
