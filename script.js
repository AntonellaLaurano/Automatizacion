var firebaseConfig = {
apiKey: "AIzaSyDtXOvG9tmXRYjDD7O3EYjzz2syivlbTAA",
authDomain: "horno-panadero.firebaseapp.com",
databaseURL: "https://horno-panadero-default-rtdb.firebaseio.com",
projectId: "horno-panadero",
storageBucket: "horno-panadero.appspot.com",
messagingSenderId: "310370306205",
appId: "1:310370306205:web:64ff344cc779b97dffac74"
};

firebase.initializeApp(firebaseConfig);

google.charts.load('current', {'packages':['gauge', 'corechart']});
google.charts.setOnLoadCallback(drawChartTemperature);
google.charts.setOnLoadCallback(drawChartLine1);

function drawChartTemperature() {
    var temperature = firebase.database().ref('Nodemcu/TThermok').limitToLast(1);

    temperature.on('value', function (snapshot) {
        temperature = snapshot.val();
        if (temperature) {
            var value;
            var data = [];
            for (var key in temperature) {
                value = temperature[key];
                data.push(value);
            }
        }
        if (data) {
            temperature = data[0];
        }
    });


    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['', 0]
    ]);

    var options = {
        width: 600, height: 240,
        greenFrom: 0, greenTo: 100,
        yellowFrom:100, yellowTo: 200,
        redFrom: 200, redTo: 320,
        
        majorTicks: [0, 40, 80, 120, 160, 200, 240, 280, 320],
        minorTicks: 4,
        max: 320,
    };

    var chart = new google.visualization.Gauge(document.getElementById('gauge'));

    chart.draw(data, options);

    setInterval(function() {
        data.setValue(0, 1, temperature);
        chart.draw(data, options);
    }, 13000);
}

function drawChartLine1() {
    const cant = 50;
    var temperature = firebase.database().ref('Nodemcu/TThermok').limitToLast(cant);

    temperature.on('value', function (snapshot) {
        temperature = snapshot.val();
        if (temperature) {
            var value;
            var data = [];
            for (var key in temperature) {
                value = temperature[key];
                data.push(value);
            }
            temperature = data;
        }
    });

    var year = firebase.database().ref('Nodemcu/Ano').limitToLast(cant);

    year.on('value', function (snapshot) {
        year = snapshot.val();
        if (year) {
            var value;
            var data = [];
            for (var key in year) {
                value = year[key];
                data.push(value);
            }
            year = data;
        }
    });

    var month = firebase.database().ref('Nodemcu/Mes').limitToLast(cant);

    month.on('value', function (snapshot) {
        month = snapshot.val();
        if (month) {
            var value;
            var data = [];
            for (var key in month) {
                value = month[key];
                data.push(value);
            }
            month = data;
        }
    });

    var day = firebase.database().ref('Nodemcu/Dia').limitToLast(cant);

    day.on('value', function (snapshot) {
        day = snapshot.val();
        if (month) {
            var value;
            var data = [];
            for (var key in day) {
                value = day[key];
                data.push(value);
            }
            day = data;
        }
    });

    var hour = firebase.database().ref('Nodemcu/Hora').limitToLast(cant);

    hour.on('value', function (snapshot) {
        hour = snapshot.val();
        if (hour) {
            var value;
            var data = [];
            for (var key in hour) {
                value = hour[key];
                data.push(value);
            }
            hour = data;
        }
    });

    var minutes = firebase.database().ref('Nodemcu/Minutos').limitToLast(cant);

    minutes.on('value', function (snapshot) {
        minutes = snapshot.val();
        if (minutes) {
            var value;
            var data = [];
            for (var key in minutes) {
                value = minutes[key];
                data.push(value);
            }
            minutes = data;
        }
    });

    var options = {
        curveType: 'function',
        legend: { position: 'right' },
        hAxis: {
            title: "Tiempo", format: 'HH:mm', 
            titleTextStyle: {
                fontSize: 20,
                color: 'white'
            }
        },
        vAxis: {
            title: "Temperatura(°C)", 
            titleTextStyle: {
                fontSize: 20,
                color: 'white'
            }, 
            viewWindowMode: 'explicit', 
            viewWindow: {
                max: 300,
                min: 0
            }
        },
        pointsVisible: true,
        backgroundColor: 'transparent',
    };


    setInterval(() => {
        var totalData = new google.visualization.DataTable();
        totalData.addColumn('date', 'time');
        totalData.addColumn('number', 'Temperature');
        for (let index = 0; index < cant; index++) {
            totalData.addRow([new Date(year[index], month[index]-1, day[index], hour[index], minutes[index]), temperature[index]])
            
        }
        
        var chart = new google.visualization.LineChart(document.getElementById('line'));

        chart.draw(totalData, options);
    }, 1300);
    
}