var PointCount = 0

class __ThreeDimensionalVec3 {
    constructor (X, Y, Z) {
        this.X = X
        this.Y = Y
        this.Z = Z
    }

    scale(Num) {
        return new Vec3(this.X*Num, this.Y*Num, this.Z*Num)
    }

    add(Vector) {
        return new Vec3(this.X+Vector.X, this.Y+Vector.Y, this.Z+Vector.Z)
    }

    cross(Vector) {
        return new Vec3(this.Y * Vector.Z - this.Z * Vector.Y, this.Z * Vector.X - this.X * Vector.Z, this.X * Vector.Y - this.Y * Vector.X)
    }

    dotProduct(Vector) {
        return this.X*Vector.X + this.Y*Vector.Y + this.Z*Vector.Z
    }

    normalize() {
        let Mag = sqrt(this.X*this.X + this.Y*this.Y + this.Z*this.Z)
        return new Vec3(this.X/Mag, this.Y/Mag, this.Z/Mag)
    }

    magnitude() {
        return sqrt(this.X*this.X + this.Y*this.Y + this.Z*this.Z)
    }

    rotate(Axis, Angle) {
        let Vector = new Vec3(this.X, this.Y, this.Z)
        let Mag = sqrt(Axis.X*Axis.X + Axis.Y*Axis.Y + Axis.Z*Axis.Z)
        let Norm = new Vec3(Axis.X/Mag, Axis.Y/Mag, Axis.Z/Mag)
        
        Vector.scale(cos(Angle)) .add(Norm.cross(Vector).scale(sin(Angle))) .add(Norm.scale(Norm.dotProduct(Vector)).scale(1-cos(Angle)))
    }

    project() {
        return new Vec2((this.X - Camera.X) / (this.Z * tan((Camera.Fov*PI) / 180)), (this.Y - Camera.Y) / (this.Z * tan((Camera.Fov*PI) / 180)))
    }
}

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

class __ThreeDimensionalVec2 {
    constructor (X, Y) {
        this.X = X
        this.Y = Y
        this.Type = "Vector2D"
        this.ExpressionID = "Point"+PointCount
        PointCount ++
    }

    
}

var Vec2 = __TwoDimensionalVec2
var Vec3 = undefined

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
    
    tick: undefined,
}
Proton.plotFunction = (Equation, Accuracy) => {
    var Max = 10*Accuracy
    var EquationLatex = `(-10,${Equation(-Max)})`
    
    for (let X = (-Max)+1; X < Max; X++) {
        EquationLatex += `,(${X/Accuracy},${Equation(X/Accuracy)})`
    }
    Calc.setExpression({
        type: "expression",
        latex: EquationLatex,
    })
}

Proton.Point = (X, Y) => {
    
}

Proton.setMode = (Mode) => {
    if (Mode.toLowerCase() == "3D") {
        Proton.__Mode = "3D"
    }
}

Proton.on = (Event, Function) => {
    switch ( Event) {
        case ("Tick") : { // more soon
            Proton.__TickFunction = Function
            break
        }
    }
}

Proton.tick = () => {
    Proton.__TickFunction(Proton.__TickData)
    Proton.__TickData.TickCount += 1
    if (Proton.__Ticking) {
        requestAnimationFrame(Proton.tick)
    }
}

Proton.start = () => {
    Proton.__Ticking = true
    requestAnimationFrame(Proton.tick)
}

Proton.pause = () => {
    Proton.__Ticking = false
}

Proton.createScene = (Type, Settings) => {
    Vec2 = __ThreeDimensionalVec2
    Vec3 = __ThreeDimensionalVec3
}
