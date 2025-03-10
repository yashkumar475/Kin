
// AWS IoT Configuration
const brokerUrl = "wss://a33kmmzjqzsgb9-ats.iot.us-east-1.amazonaws.com/mqtt";
const topic = "gym/sensor/data";

// MQTT Client Connection
const client = mqtt.connect(brokerUrl, {
    
    reconnectPeriod: 1000 // Auto-reconnect every second if disconnected
});

client.on("message", (topic, message) => {
    console.log("📥 Received Raw Data:", message.toString()); // Raw Data को Print कर

    try {
        let sensorData = JSON.parse(message.toString());
        console.log("✅ Parsed Data:", sensorData); // JSON Parse Check

        updateTable(sensorData);
    } catch (error) {
        console.error("❌ JSON Parsing Error:", error);
    }
});









document.addEventListener("DOMContentLoaded", function () {
    const chartData = [
        { id: "chart1", title: "RPM", value: 75 },
        { id: "chart3", title: "Temperature", value: 45 },
        { id: "chart5", title: "Current", value: 50 },
        { id: "chart4", title: "Voltage", value: 85 }
    ];

    chartData.forEach(data => {
        var options = {
            series: [data.value],
            chart: {
                type: 'radialBar',
                height: 250
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                    },
                    dataLabels: {
                        name: { offsetY: 20,show: true, fontSize: '16px' },
                        value: { offsetY: 30, fontSize: '22px', formatter: val => val + "%" }
                    }
                }
            },
            labels: [data.title],
            colors: ["#008FFB"]
        };

        let chartElement = document.createElement("div");
        chartElement.id = data.id;
        document.querySelector(".info-data").appendChild(chartElement);

        var chart = new ApexCharts(document.querySelector(`#${data.id}`), options);
        chart.render();
    });
});




// Table Script


function updateTable(sensorData) {
    let tableBody = document.getElementById("sensorDataTableBody");
    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    // नया Row बनाना
    let newRow = tableBody.insertRow(0); // New data सबसे ऊपर Add होगा

    // JSON Data से Values लेना
    let columns = ["Timestamp", "Equipment_ID", "Temperature_C", "Light_Lux", "RPM_rev_min", "Current_A", "Voltage_V"];
    
    columns.forEach((column, index) => {
        let cell = newRow.insertCell(index);
        cell.innerHTML = sensorData[column] !== undefined ? sensorData[column] : "N/A";
    });

    // पुराने Data को 10 Rows तक Limit करना (Extra Rows हटाना)
    while (tableBody.rows.length > 10) {
        tableBody.deleteRow(10);
    }
}



