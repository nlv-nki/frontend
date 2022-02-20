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
    this._waiter = [];
  }

  setAmount(type, value) {
    if (value < 0) throw new Error("Задано отрицательное количество");
    this[`_${type}`] = value;
  }
  _getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _cook(recipe) {
    return new Promise((resolve, reject) => {
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
      }, 2000);

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
    let waitingQueue = new Map();
    this._status = 'free';
    if (this._systemCheck) {
      waitingQueue.set(this._getRndInteger(0, 5), recipe)
      waitingQueue.forEach(item => {
        if (this._status == 'free') {
          this._status = 'busy';
          this._cook(item)
            .then((result) => {
              console.log(`Начинаем готовить ваш кофе - ${recipe}`)
              return result
            })
            .then(result => {
              console.log(result)
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                }, 5000)
              })
            })
            .then((data) => this._status = 'free')
        }
      })
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