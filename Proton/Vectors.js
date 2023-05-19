class Vec2 {
    constructor (X, Y) {
        this.X = X
        this.Y = Y
    }
}

class Vec3 {
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
        
        let Fin = Vector.scale(cos(Angle)) .add(Norm.cross(Vector).scale(sin(Angle))) .add(Norm.scale(Norm.dotProduct(Vector)).scale(1-cos(Angle)))
        this.X = Fin.X; this.Y = Fin.Y; this.Z = Fin.Z;
    }

    project() {
        // NOT THE FINAL FUNCTION
        return new Vec2((this.X - Camera.X) / (this.Z * tan((Camera.Fov*PI) / 180)), (this.Y - Camera.Y) / (this.Z * tan((Camera.Fov*PI) / 180)))
    }
}
