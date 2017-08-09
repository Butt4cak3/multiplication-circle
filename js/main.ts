document.addEventListener("DOMContentLoaded", () => {
	const CENTER_X = Math.floor(window.innerWidth / 2),
		CENTER_Y = Math.floor(window.innerHeight / 2),
		RADIUS = 300,
		TAU = Math.PI * 2,
		canvas = document.getElementById("canvas") as HTMLCanvasElement,
		ctx = canvas.getContext("2d"),
		inputPoints = document.getElementById("inputPoints") as HTMLInputElement,
		inputMultiplier = document.getElementById("inputMultiplier") as HTMLInputElement;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	inputPoints.addEventListener("change", render);
	inputMultiplier.addEventListener("change", render);

	render();

	function render() {
		let points = parseInt(inputPoints.value),
			multiplier = parseInt(inputMultiplier.value),
			baseAngle = TAU / points;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, TAU);
		ctx.stroke();

		for (let n = 1; n <= points; n++) {
			const res = n * multiplier,
				angle1 = baseAngle * n - TAU / 4,
				angle2 = baseAngle * res - TAU / 4,
				p1 = { x: CENTER_X + RADIUS * Math.cos(angle1), y: CENTER_Y + RADIUS * Math.sin(angle1) },
				p2 = { x: CENTER_X + RADIUS * Math.cos(angle2), y: CENTER_Y + RADIUS * Math.sin(angle2) },
				textSize = ctx.measureText(n.toString()),
				textWidth = textSize.width,
				textPos = { x: CENTER_X + (RADIUS + 20) * Math.cos(angle1) - textWidth / 2, y: CENTER_Y + (RADIUS + 20) * Math.sin(angle1) };

			ctx.strokeText(n.toString(), textPos.x, textPos.y);

			ctx.beginPath();
			ctx.arc(p1.x, p1.y, 5, 0, TAU);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
		}
	}
});
