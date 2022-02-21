const recipes = {
  cappuccino: {
    water: 120,
    milk: 100,
    corn: 10
  },
  espresso: {
    water: 100,
    milk: 0,
    corn: 20
  },
  moccachino: {
    water: 100,
    milk: 0,
    corn: 20
  }
}


class CoffeeMachine {
  constructor() {
    this._water = 0;
    this._milk = 0;
    this._corn = 0;
    this._recipeType = 'undefined';
    this._garbage = 0;
    this._status = 'free';
    this._cookingTime = 2000;
    this._callCounter = 0;
    this._cookingPause = 2000;
  }

  setAmount(type, value) {
    if (value < 0) throw new Error("Задано отрицательное количество");
    this[`_${type}`] = value;
  }
  _getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _cook(recipe) {
    return new Promise(resolve => {
      this._water = this._water - recipes[recipe].water
      this._milk = this._milk - recipes[recipe].milk
      this._corn = this._corn - recipes[recipe].corn
      const report = `
      Заберите ваш кофе - ${recipe}
      Осталось воды: ${this._water}
      Осталось молока: ${this._milk}
      Осталось зерна: ${this._corn}
      `;
      setTimeout(() => {
  
        resolve(report);

      }, this._cookingTime);
    })
  }


  _systemCheck() {
    let systemCheckFlag = true;
    this._garbage = ++this._garbage
    if (this._water < recipes[recipe].water)
      console.log(`Не достаточно воды - набираем...`);
    if (this._milk < recipes[recipe].milk || this._corn < recipes[recipe].corn) {
      throw new Error("Не достаточно ингредиентов");
      systemCheckFlag = false;
    }
    if (this._garbage > 7) {
      throw new Error(`Емкости для мусора и отработанной воды заполенны. Заполненность: ${this._garbage}. Максимум: 3`);
      systemCheckFlag = false;
    }
    return systemCheckFlag;

  }


  start(recipe) {

     const cookingManager = async (item) => {
      this._status = 'busy'; 
      console.log(`Начинаем готовить ваш кофе - ${recipe}`)
      this._cook(item)
      .then(result => {
        console.log(result)
        this._status = 'free';
      })
    }

    if (this._systemCheck) {
      async function processQueue(recipe) {      
        if (this._status == 'free') {
          this._callCounter++
          await cookingManager(recipe);
        }
        else {
          this._callCounter++
          let callTimer = this._cookingTime * this._callCounter + this._cookingPause * this._callCounter;
          setTimeout(async () =>{
            await cookingManager(recipe);      
          },  this._cookingTime * this._callCounter + this._cookingPause * this._callCounter)
        }
    }
      processQueue.call(this,recipe)
    }
  }

}

// создаём кофеварку
let coffeeMachine = new CoffeeMachine();

// // добавляем  расходники
coffeeMachine.setAmount('water', 3000);
coffeeMachine.setAmount('milk', 2000);
coffeeMachine.setAmount('corn', 2000);

// // выбираем рецепт и готовим 
coffeeMachine.start('cappuccino')
coffeeMachine.start('espresso', )
coffeeMachine.start('moccachino')