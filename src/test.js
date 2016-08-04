function distToDegrees(lat, long, distance) {
    var startLat = endLat = lat;
    var startLong = endLong = long;
    var stepDistance = 0.0000001;

    var countedDistance = 0;
    var tempLat = endLat;
    while (countedDistance < distance) {
        tempLat += stepDistance;
        countedDistance = measure(startLat, startLong, tempLat, endLong);
    }
    var latDegreeDist = Math.abs(startLat - tempLat)

    countedDistance = 0;
    var tempLong = endLong;
    while (countedDistance < distance) {
        tempLong += stepDistance;
        countedDistance = measure(startLat, startLong, endLat, tempLong);
    }
    var longDegreeDist = Math.abs(startLong - tempLong);

    return [latDegreeDist, longDegreeDist];
}

var foo = distToDegrees(53,23,1);
console.log(foo);

function measure(lat1, lon1, lat2, lon2) { // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}

function generateTiles(qty) {

    var iterations = -1;
    var counter = 1;
    while (iterations < 0) {
        var calculated = calculateHexAmount(counter);
        if (calculated >= qty) {
            iterations = counter;
        } else {
            counter++;
        }
    }
    var maxLevel = iterations;
    var startX = 0;
    var startY = 1;
    var coords = [];
    push(0, 0);

    for (var p = 0; p < maxLevel - 1; p++) {
        var coordX = startX;
        var coordY = startY + p;
        var currentLevel = p + 2;
        addYSides(coordX, coordY);

        for (var i = 0; i < currentLevel - 1; i++) {
            coordX += 0.5;
            coordY -= 0.5;
            add4Sides(coordX, coordY);
        }

        for (var i = 0; i < currentLevel - 2; i++) {
            coordY -= 1;
            addXSides(coordX, coordY);
        }
    }

    return coords;

    function add4Sides(x, y) {
        push(x, y);
        push(x, -y);
        push(-x, -y);
        push(-x, y);
    }

    function addYSides(x, y) {
        push(x, y);
        push(x, -y);
    }

    function addXSides(x, y) {
        push(x, y);
        push(-x, y);
    }


    function push(x, y) {
        if (coords.length < qty) {
            coords.push([x, y]);
        }
    }

    function calculateHexAmount(width) {
        return 3 * width * (width - 1) + 1;
    }
}

// console.log(JSON.stringify(generateTiles(8)));
