 var PointCount = 0

class __TwoDimensionalVec2 {
    constructor (X, Y) {
        this.X = X
        this.Y = Y
        this.Type = "Vector2D"
        this.ExpressionID = "Point"+PointCount
        PointCount ++
    }

    plot() {
        Calc.setExpression({
            type: "expression",
            latex: `(${this.X},${this.Y})`,
            id: this.ExpressionID,
        })
    }

    add(Value) {
        switch (Value.Type) {
            case ("Vector2D") : {
                this.X += Value.X
                this.Y += Value.Y
                break
            }
        }
        
        return {X: this.X, Y: this.Y,}
    }
}

var Vec2 = __TwoDimensionalVec2

var Proton = {
    __TickData: { // tick time not made yet 
        TickCount: 0,
        TickTime: 0,
    },

    __TickFunction: () => {},
    __Ticking: false,
    __GraphingMode: "2D",
    __Camera: {
        RotationX: 0,
        RotationY: 0,
        RotationZ: 0,
    },
    
    plotFunction: (Equation, Accuracy) => {
        var Max = 10*Accuracy
        var EquationLatex = `(-10,${Equation(-Max)})`
        
        for (let X = (-Max)+1; X < Max; X++) {
            EquationLatex += `,(${X/Accuracy},${Equation(X/Accuracy)})`
        }
        Calc.setExpression({
            type: "expression",
            latex: EquationLatex,
        })
    },

    Point: (X, Y) => {
        
    },

    setMode: (Mode) => {
        if (Mode.toLowerCase() == "3D") {
            Proton.__Mode = "3D"
        }
    },

    on: (Event, Function) => {
        switch ( Event) {
            case ("Tick") : { // more soon
                Proton.__TickFunction = Function
                break
            }
        }
    },
    
    tick: undefined,

    start: () => {
        Proton.__Ticking = true
        requestAnimationFrame(Proton.tick)
    },

    pause: () => {
        Proton.__Ticking = false
    },
}

Proton.tick = () => {
    Proton.__TickFunction(Proton.__TickData)
    Proton.__TickData.TickCount += 1
    if (Proton.__Ticking) {
        requestAnimationFrame(Proton.tick)
    }
}
