import Ember from 'ember';

export default Ember.Component.extend({
  list: [],

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
      console.log(selectedFoods);
      var shoppingList = []
      selectedFoods.forEach((food, i) => {
         var quantity = food.quantity - selectedIngredients[i].quantity
        if(quantity < 0){
           shoppingList.push({
             id: food.id,
             name: food.name,
             quantity: quantity * -1
           })
        }
      })
      this.set('list', shoppingList)
    }
  }
});
