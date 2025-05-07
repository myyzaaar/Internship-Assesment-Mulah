document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Fetch CSV file
        const response = await fetch('Table_Input.csv');
        const csvData = await response.text();

        // 2. Parse CSV into array of objects
        const table1Data = parseCSV(csvData);

        // 3. Populate tables
        populateTable1(table1Data);
        populateTable2(table1Data);
    } catch (error) {
        console.error("Error loading CSV:", error);
        const fallbackData = [
            { index: "A1", value: 41 },
            { index: "A2", value: 18 },
            { index: "A3", value: 21 },
            { index: "A4", value: 63 },
            { index: "A5", value: 2 },
            { index: "A6", value: 53 },
            { index: "A7", value: 5 },
            { index: "A8", value: 57 },
            { index: "A9", value: 60 },
            { index: "A10", value: 93 },
            { index: "A11", value: 28 },
            { index: "A12", value: 3 },
            { index: "A13", value: 90 },
            { index: "A14", value: 39 },
            { index: "A15", value: 80 },
            { index: "A16", value: 88 },
            { index: "A17", value: 49 },
            { index: "A18", value: 60 },
            { index: "A19", value: 26 },
            { index: "A20", value: 28 },
        ];
        populateTable1(fallbackData);
        populateTable2(fallbackData);
    }
});

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return {
            [headers[0]]: values[0].trim(),
            [headers[1]]: parseInt(values[1].trim(), 10)
        };
    });
}

function populateTable1(data) {
    const table1Body = document.querySelector("#table1 tbody");
    table1Body.innerHTML = data.map(item => `
        <tr>
            <td>${item['Index #']}</td>
            <td>${item.Value}</td>
        </tr>
    `).join('');
}

function populateTable2(data) {
    const getValue = (index) => {
        const item = data.find(item => item['Index #'] === index);
        return item ? item.Value : 0;
    };

    const table2Body = document.querySelector("#table2 tbody");
    table2Body.innerHTML = `
        <tr>
            <td>Alpha</td>
            <td>${getValue("A5") + getValue("A20")}</td>
        </tr>
        <tr>
            <td>Beta</td>
            <td>${getValue("A15") / getValue("A7")}</td>
        </tr>
        <tr>
            <td>Charlie</td>
            <td>${getValue("A13") * getValue("A12")}</td>
        </tr>
    `;
}