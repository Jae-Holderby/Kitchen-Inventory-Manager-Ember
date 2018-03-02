import Ember from 'ember';

export default Ember.Component.extend({
  list: [],
  itemQuantity: ['quantity'],
  sortValueType: ['food'],
  inventorySort: Ember.computed.sort('model.foods', "sortValueType"),
  clicked: false,

  // socketIOService: Ember.inject.service('socket-io'),
  // room: 'inventory',
  // url: 'ws://localhost:3000/',
  // init(){
  //   this._super(...arguments);
  //   let socket = this.get('socketIOService').socketFor(this.get('url'));
  //   socket.emit('open', "Hello there");
  //   socket.on('message', function(){
  //     console.log("anything");
  //   })
  // },

  actions: {
    makeShoppingList(){
      var recipes = this.get('model.recipes').content
      var recipeArray = recipes.map(item => {
        return {
          id: parseInt(item.id),
          recipe_name: item._data.recipe,
          selected: item._data.selected
        }
      })
      var ingredients = this.get('model.ingredients').content
      var ingredientArray = ingredients.map(item => {
        return {
          id: parseInt(item.id),
          recipe_id: item._data.recipe_id,
          food_id: item._data.food_id,
          quantity: item._data.quantity
        }
      })
      var foods =  this.get('model.foods').content
      var foodArray = foods.map(item => {
        return {
          id: parseInt(item.id),
          name: item._data.food,
          type: item._data.food_type,
          quantity: item._data.quantity
        }
      })
      var selectedRecipes = []
      recipeArray.forEach(recipe => {
        if (recipe.selected === true){
          selectedRecipes.push(recipe.id)
        }
      })
      var selectedIngredients = []
      selectedRecipes.forEach(id => {
         ingredientArray.forEach(ingredient => {
          if(id === ingredient.recipe_id)
          selectedIngredients.push(ingredient)
        })
      })
      var selectedFoods = []
      selectedIngredients.forEach(ingredient => {
        foodArray.forEach(food => {
          if (ingredient.food_id === food.id) {
            selectedFoods.push(food)
          }
        })
      })
      var shoppingList = []
      selectedFoods.forEach((food, i) => {
         var quantity = food.quantity - selectedIngredients[i].quantity
        if(quantity < 0){
           shoppingList.push({
             id: food.id,
             name: food.name,
             type: food.type,
             quantity: quantity * -1
           })
        }
      })
      var sortedShoppingList = shoppingList.sort(function(a, b){
        var itemA = a.type
        var itemB = b.type
        return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0
      })
      var newShoppingList = sortedShoppingList.reduce(function(list, item){
          var added = false
          list.forEach(function(food, i) {
            if (food.name === item.name){
              list[i].quantity += item.quantity
              added = true
            }
          })
          if (!added){
            list.push(item)
          }
          return list
      }, [])
      this.set('list', newShoppingList)
    },

    toggleClick: function(){
      console.log(this.get('recipe'))
    }
  },



});
