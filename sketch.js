// let capturer
let canvas
const fps = 60

const sketch = (p) => {
	const balls = []
	const numBalls = 10

	p.preload = () => { }

	p.setup = () => {
		canvas = p.createCanvas(p.windowWidth, p.windowHeight)

		for (let i = 0; i < numBalls; i++) {
			while (true) {
				const radius = p.random(5, 20)
				const proposedPosition = [
					p.random(radius, p.width - radius),
					p.random(radius, p.height - radius)
				]
				let collides = false
				for (let j = 0; j < balls.length; j++) {
					if (getDistance(proposedPosition, balls[j].position) < radius + balls[j].radius) {
						collides = true
						break
					}
				}
				if (collides) continue

				balls.push({
					radius: radius,
					position: proposedPosition,
					velocity: [p.random(p.width / 3), p.random(p.height / 3)]
				})
				break
			}
		}
		p.noFill()
	}

	p.draw = () => {
		p.background(255, 100)
		p.rect(0, 0, p.width, p.height)

		for (let i = 0; i < balls.length; i++) {
			const ball = balls[i]
			if (ball.position[0] < ball.radius || ball.position[0] > p.width - ball.radius) ball.velocity[0] *= -1
			if (ball.position[1] < ball.radius || ball.position[1] > p.height - ball.radius) ball.velocity[1] *= -1

			ball.position = getNextPosition(ball, 1 / fps)
			p.circle(...ball.position, ball.radius * 2)
		}
	}
}

const getDistance = (pos1, pos2) => Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
const getNextPosition = (ball, t) => addArrays(ball.position, scaleArray(ball.velocity, t))

const scaleArray = (arr, scalar) => {
	const result = []
	for (let i = 0; i < arr.length; i++) {
		result.push(arr[i] * scalar)
	}
	return result
}
const addArrays = (arr1, arr2) => {
	if (arr1.length !== arr2.length) throw new Error('arrays have different lengths')
	const result = []
	for (let i = 0; i < arr1.length; i++) {
		result.push(arr1[i] + arr2[i])
	}
	return result
}

const sketchDiv = document.getElementById('sketch')
const myp5 = new p5(sketch, sketchDiv)