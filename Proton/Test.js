Proton.plotFunction((x) => {
    return 2**x
}, 10)

let MyPoint = new Vec2(3,3)
MyPoint.plot()

Proton.on("Tick", (Event) => {
    console.log("e")
})

Proton.start()
