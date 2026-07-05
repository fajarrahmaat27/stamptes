    const https = require('https');

    const API_KEY = process.argv[2];

  
    if (!API_KEY) {
        console.error("Error: Harap masukkan API Key saat menjalankan skrip!");
        console.error("Contoh penggunaan: node weather.js API_KEY_KAMU_DISINI");
        process.exit(1);
    }

    const CITY = "Jakarta";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

    https.get(url, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
            rawData += chunk;
        });

        res.on('end', () => {
            try {
                const data = JSON.parse(rawData);
                
                if (data.cod !== "200") {
                    console.error("Gagal mengambil data:", data.message);
                    return;
                }

                console.log("Weather Forecast:");
                
                const printedDates = new Set();
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                for (let i = 0; i < data.list.length; i++) {
                    const item = data.list[i];
                    const dateObj = new Date(item.dt * 1000);
                    
                    const dayName = days[dateObj.getDay()];
                    const dateNum = String(dateObj.getDate()).padStart(2, '0');
                    const monthName = months[dateObj.getMonth()];
                    const year = dateObj.getFullYear();
                    
                    const formattedDate = `${dayName}, ${dateNum} ${monthName} ${year}`;

                    if (!printedDates.has(formattedDate)) {
                        printedDates.add(formattedDate);
                        console.log(`${formattedDate}: ${item.main.temp} °C`);
                    }
                }
            } catch (e) {
                console.error("Error parsing JSON:", e.message);
            }
        });
    }).on('error', (e) => {
        console.error("Ada masalah dengan request:", e.message);
    });