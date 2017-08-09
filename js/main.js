document.addEventListener("DOMContentLoaded", function () {
    var CENTER_X = Math.floor(window.innerWidth / 2), CENTER_Y = Math.floor(window.innerHeight / 2), RADIUS = 300, TAU = Math.PI * 2, canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), inputPoints = document.getElementById("inputPoints"), inputMultiplier = document.getElementById("inputMultiplier"), infoLink = document.getElementById("infolink");
    infoLink.addEventListener("click", toggleInfo);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    inputPoints.addEventListener("change", render);
    inputMultiplier.addEventListener("change", render);
    render();
    function render() {
        var points = parseInt(inputPoints.value), multiplier = parseInt(inputMultiplier.value), baseAngle = TAU / points;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, TAU);
        ctx.stroke();
        for (var n = 1; n <= points; n++) {
            var res = n * multiplier, angle1 = baseAngle * n - TAU / 4, angle2 = baseAngle * res - TAU / 4, p1 = { x: CENTER_X + RADIUS * Math.cos(angle1), y: CENTER_Y + RADIUS * Math.sin(angle1) }, p2 = { x: CENTER_X + RADIUS * Math.cos(angle2), y: CENTER_Y + RADIUS * Math.sin(angle2) }, textSize = ctx.measureText(n.toString()), textWidth = textSize.width, textPos = { x: CENTER_X + (RADIUS + 20) * Math.cos(angle1) - textWidth / 2, y: CENTER_Y + (RADIUS + 20) * Math.sin(angle1) };
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
    function toggleInfo() {
        var elem = document.getElementById("info");
        if (elem.style.visibility !== "visible") {
            console.log("visible");
            elem.style.visibility = "visible";
        }
        else {
            console.log("hidden");
            elem.style.visibility = "hidden";
        }
    }
});
