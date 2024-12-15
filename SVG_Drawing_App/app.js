const svgCanvas = document.getElementById('svgCanvas');
const commandInput = document.getElementById('commandInput');
const drawButton = document.getElementById('drawButton');
const clearButton = document.getElementById('clearButton');
const fileInput = document.getElementById('fileInput');
const loadButton = document.getElementById('loadButton');

// Rysowanie osi X
function drawXAxis() {
    const width = svgCanvas.getAttribute('width');
    const height = svgCanvas.getAttribute('height');
    const centerY = height / 2;

    // Grupa dla osi X
    const xAxisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Oś X
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', centerY);
    xAxis.setAttribute('x2', width);
    xAxis.setAttribute('y2', centerY);
    xAxis.setAttribute('stroke', 'black');
    xAxis.setAttribute('stroke-width', 2);
    xAxisGroup.appendChild(xAxis);

    // Ticki
    const tickSize = 5;
    const step = 50; // Odstęp między podziałkami
    const numTicksX = Math.floor(width / step);

    for (let i = -numTicksX; i <= numTicksX; i++) {
        const x = (width / 2) + i * step;
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', x);
        tick.setAttribute('y1', centerY - tickSize);
        tick.setAttribute('x2', x);
        tick.setAttribute('y2', centerY + tickSize);
        tick.setAttribute('stroke', 'black');
        tick.setAttribute('stroke-width', 1);
        xAxisGroup.appendChild(tick);
    }

    svgCanvas.appendChild(xAxisGroup);
    enableDragging(xAxisGroup); // Włącz przeciąganie dla grupy
}


// Rysowanie osi Y
function drawYAxis() {
    const width = svgCanvas.getAttribute('width');
    const height = svgCanvas.getAttribute('height');
    const centerX = width / 2;

    // Grupa dla osi Y
    const yAxisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Oś Y
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', centerX);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', centerX);
    yAxis.setAttribute('y2', height);
    yAxis.setAttribute('stroke', 'black');
    yAxis.setAttribute('stroke-width', 2);
    yAxisGroup.appendChild(yAxis);

    // Ticki
    const tickSize = 5;
    const step = 50; // Odstęp między podziałkami
    const numTicksY = Math.floor(height / step);

    for (let i = -numTicksY; i <= numTicksY; i++) {
        const y = (height / 2) + i * step;
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', centerX - tickSize);
        tick.setAttribute('y1', y);
        tick.setAttribute('x2', centerX + tickSize);
        tick.setAttribute('y2', y);
        tick.setAttribute('stroke', 'black');
        tick.setAttribute('stroke-width', 1);
        yAxisGroup.appendChild(tick);
    }

    svgCanvas.appendChild(yAxisGroup);
    enableDragging(yAxisGroup); // Włącz przeciąganie dla grupy
}

// Dodajemy grupę dla punktów
const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
pointsGroup.setAttribute('id', 'points-group');
svgCanvas.appendChild(pointsGroup);

// Rysowanie punktu
function drawPoint(x, y, radius = 5, color = 'red') {
    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', x);
    point.setAttribute('cy', y);
    point.setAttribute('r', radius);
    point.setAttribute('fill', color);
    point.setAttribute('stroke', 'black');
    point.setAttribute('stroke-width', 1);

    pointsGroup.appendChild(point); // Dodanie punktu do grupy
    enableDragging(point); // Włącz możliwość przeciągania punktu
}

// Funkcja do utrzymywania grupy punktów na samej górze
function keepPointsOnTop() {
    svgCanvas.appendChild(pointsGroup);
}

// Wywołaj `keepPointsOnTop` za każdym razem po dodaniu nowego elementu



//rysowanie asymptoty x
function drawXAsymptote(x, color = 'blue', dashed = true) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', x);
    line.setAttribute('y2', svgCanvas.getAttribute('height'));
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', 2);
    if (dashed) {
        line.setAttribute('stroke-dasharray', '5,5'); // Wzór kreskowania
    }

    svgCanvas.appendChild(line);
    enableDragging(line); // Włącz możliwość przeciągania
}

// rysowanie asymptoty y
function drawYAsymptote(y, color = 'blue', dashed = true) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', y);
    line.setAttribute('x2', svgCanvas.getAttribute('width'));
    line.setAttribute('y2', y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', 2);
    if (dashed) {
        line.setAttribute('stroke-dasharray', '5,5'); // Wzór kreskowania
    }

    svgCanvas.appendChild(line);
    enableDragging(line); // Włącz możliwość przeciągania
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let linearFunctionCounter = 1; // Licznik dla funkcji liniowych

function drawPositiveLinearFunction(x, y, a = 1) {
    const id = `linear-function-${linearFunctionCounter++}`; // Unikalny identyfikator
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    const canvasWidth = parseFloat(svgCanvas.getAttribute('width'));
    const canvasHeight = parseFloat(svgCanvas.getAttribute('height'));

    // Punkt środkowy w układzie SVG (przesunięcie do dołu w SVG, bo y rośnie w dół)
    const centerX = x;
    const centerY = canvasHeight - y;

    // Współrzędne początku i końca linii
    const x1 = 0; // Najlewa krawędź
    const y1 = centerY + a * (centerX - x1); // Równanie prostej przez środek

    const x2 = canvasWidth; // Najprawa krawędź
    const y2 = centerY + a * (centerX - x2); // Równanie prostej przez środek

    // Ustawienie atrybutów SVG
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', 2);
    line.setAttribute('data-id', id); // Unikalny identyfikator
    line.setAttribute('data-x', x); // Przechowywanie środka x
    line.setAttribute('data-y', y); // Przechowywanie środka y
    line.setAttribute('data-a', a); // Przechowywanie nachylenia

    svgCanvas.appendChild(line);

    // Włącz przeciąganie
    enableDragging(line);

    // Tworzenie kontrolek do modyfikacji
    createLinearFunctionControls(id, x, y, a);
}

// Tworzenie dynamicznych kontrolek dla funkcji liniowej
function createLinearFunctionControls(id, x, y, initialA) {
    const controlsContainer = document.getElementById('controls'); // Kontener na kontrolki

    // Tworzenie kontenera dla danej funkcji
    const linearControls = document.createElement('div');
    linearControls.setAttribute('data-id', id);
    linearControls.innerHTML = `
        <h3>Funkcja liniowa: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-a">Parameter a:</label>
        <input type="number" id="${id}-a" step="0.01" value="${initialA}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-delete">Usuń Funkcję</button>
        </div>
    `;
    controlsContainer.appendChild(linearControls);

    // Obsługa zmiany parametru "a"
    const aInput = linearControls.querySelector(`#${id}-a`);
    aInput.addEventListener('input', (event) => {
        const newA = parseFloat(event.target.value);
        updateLinearFunction(id, newA);
    });

    // Obsługa zmiany grubości linii
    const strokeInput = linearControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updateLinearFunctionStroke(id, newStroke);
    });

    // Obsługa usunięcia funkcji
    const deleteButton = linearControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deleteLinearFunction(id);
    });
}

// Funkcja aktualizacji funkcji liniowej
function updateLinearFunction(id, a) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (!line) return;

    const canvasWidth = parseFloat(svgCanvas.getAttribute('width'));
    const canvasHeight = parseFloat(svgCanvas.getAttribute('height'));

    const x = parseFloat(line.getAttribute('data-x')); // Pobierz środek x
    const y = parseFloat(line.getAttribute('data-y')); // Pobierz środek y
    const centerY = canvasHeight - y; // Przeliczenie układu współrzędnych

    // Aktualizacja współrzędnych linii
    const x1 = 0; // Najlewa krawędź
    const y1 = centerY + a * (x - x1);

    const x2 = canvasWidth; // Najprawa krawędź
    const y2 = centerY + a * (x - x2);

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    line.setAttribute('data-a', a); // Aktualizacja parametru "a"
}

// Funkcja aktualizacji grubości linii
function updateLinearFunctionStroke(id, strokeWidth) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (line) {
        line.setAttribute('stroke-width', strokeWidth);
    }
}

// Funkcja usuwania funkcji liniowej
function deleteLinearFunction(id) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (line) line.remove(); // Usuń linię
    if (controls) controls.remove(); // Usuń kontrolki
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let negativeLinearFunctionCounter = 1; // Licznik dla negatywnych funkcji liniowych

function drawNegativeLinearFunction(x, y, slope = -1) {
    const id = `negative-linear-function-${negativeLinearFunctionCounter++}`; // Unikalny identyfikator
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    // Obliczenie punktów krańcowych linii
    const range = 500; // Zwiększony zakres dla dłuższej linii
    const x1 = x - range;
    const y1 = y - slope * range;
    const x2 = x + range;
    const y2 = y + slope * range;

    // Ustawienie atrybutów linii
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', 2);
    line.setAttribute('data-id', id); // Unikalny identyfikator
    line.setAttribute('data-x', x); // Przechowywanie środka x
    line.setAttribute('data-y', y); // Przechowywanie środka y
    line.setAttribute('data-slope', slope); // Przechowywanie nachylenia

    svgCanvas.appendChild(line);
    enableDragging(line); // Dodanie funkcji przeciągania

    // Tworzenie dynamicznych kontrolek
    createNegativeLinearFunctionControls(id, x, y, slope);
}

// Tworzenie dynamicznych kontrolek
function createNegativeLinearFunctionControls(id, x, y, initialSlope) {
    const controlsContainer = document.getElementById('controls'); // Kontener na kontrolki

    // Tworzenie kontenera dla danej funkcji
    const linearControls = document.createElement('div');
    linearControls.setAttribute('data-id', id);
    linearControls.innerHTML = `
        <h3>Negatywna Funkcja Liniowa: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-slope">Nachylenie (slope):</label>
        <input type="number" id="${id}-slope" step="0.1" value="${initialSlope}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-delete">Usuń Funkcję</button>
        </div>
    `;
    controlsContainer.appendChild(linearControls);

    // Obsługa zmiany nachylenia (slope)
    const slopeInput = linearControls.querySelector(`#${id}-slope`);
    slopeInput.addEventListener('input', (event) => {
        const newSlope = parseFloat(event.target.value);
        updateNegativeLinearFunction(id, newSlope);
    });

    // Obsługa zmiany grubości linii (stroke-width)
    const strokeInput = linearControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updateNegativeLinearFunctionStroke(id, newStroke);
    });

    // Obsługa usunięcia funkcji
    const deleteButton = linearControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deleteNegativeLinearFunction(id);
    });
}

// Funkcja aktualizacji funkcji liniowej
function updateNegativeLinearFunction(id, slope) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (!line) return;

    const x = parseFloat(line.getAttribute('data-x')); // Pobierz aktualny środek x
    const y = parseFloat(line.getAttribute('data-y')); // Pobierz aktualny środek y

    // Obliczenie nowych współrzędnych linii
    const range = 500;
    const x1 = x - range;
    const y1 = y - slope * range;
    const x2 = x + range;
    const y2 = y + slope * range;

    // Aktualizacja atrybutów SVG
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    line.setAttribute('data-slope', slope); // Aktualizacja nachylenia
}


// Funkcja aktualizacji grubości linii
function updateNegativeLinearFunctionStroke(id, strokeWidth) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (line) {
        line.setAttribute('stroke-width', strokeWidth);
    }
}

// Funkcja usuwania funkcji liniowej
function deleteNegativeLinearFunction(id) {
    const line = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (line) line.remove(); // Usuń linię
    if (controls) controls.remove(); // Usuń kontrolki
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let parabolaCounter = 1; // Licznik dla identyfikatorów paraboli

function drawParabola(x, y, a = 0.01) {
    const id = `parabola-${parabolaCounter++}`; // Generowanie unikalnego ID

    // Tworzenie ścieżki dla paraboli
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const xMin = -200, xMax = 200, numPoints = 100;

    // Generowanie punktów paraboli
    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints);
        const localY = a * localX * localX;
        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) d += `M${svgX},${svgY}`;
        else d += ` L${svgX},${svgY}`;
    }

    // Ustawianie atrybutów ścieżki
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);
    path.setAttribute('data-id', id); // Dodanie unikalnego identyfikatora
    path.setAttribute('data-x', x); // Przechowywanie współrzędnej x
    path.setAttribute('data-y', y); // Przechowywanie współrzędnej y

    svgCanvas.appendChild(path); // Dodanie paraboli do SVG
    enableDragging(path); // Włącz przeciąganie

    // Tworzenie kontrolek do modyfikacji
    createParabolaControls(id, x, y, a);
}

// Funkcja tworzenia kontrolek HTML dla danej paraboli
function createParabolaControls(id, x, y, initialA) {
    const controlsContainer = document.getElementById('controls'); // Kontener na kontrolki

    // Tworzenie kontenera dla danej paraboli
    const parabolaControls = document.createElement('div');
    parabolaControls.setAttribute('data-id', id);
    parabolaControls.innerHTML = `
        <h3>Parabola: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-a">Parameter a:</label>
        <input type="number" id="${id}-a" step="0.01" value="${initialA}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-delete">Usuń Parabolę</button>
        </div>
    `;
    controlsContainer.appendChild(parabolaControls);

    // Obsługa zmiany parametru "a"
    const aInput = parabolaControls.querySelector(`#${id}-a`);
    aInput.addEventListener('input', (event) => {
        const newA = parseFloat(event.target.value);
        updateParabola(id, newA);
    });

    // Obsługa zmiany grubości linii
    const strokeInput = parabolaControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updateParabolaStroke(id, newStroke);
    });

    // Obsługa usunięcia paraboli
    const deleteButton = parabolaControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deleteParabola(id);
    });
}

// Funkcja aktualizacji ścieżki paraboli
function updateParabola(id, a) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (!path) return;

    // Pobierz aktualne współrzędne paraboli z atrybutów data-x i data-y
    const x = parseFloat(path.getAttribute('data-x'));
    const y = parseFloat(path.getAttribute('data-y'));

    let newD = '';
    const xMin = -200, xMax = 200, numPoints = 100;

    // Generowanie nowego kształtu paraboli z aktualnymi współrzędnymi
    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints);
        const localY = a * localX * localX;
        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) newD += `M${svgX},${svgY}`;
        else newD += ` L${svgX},${svgY}`;
    }

    path.setAttribute('d', newD); // Aktualizacja kształtu
}


// Funkcja aktualizacji grubości linii
function updateParabolaStroke(id, strokeWidth) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (path) {
        path.setAttribute('stroke-width', strokeWidth);
    }
}

// Funkcja usuwania paraboli
function deleteParabola(id) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (path) path.remove(); // Usuń ścieżkę paraboli
    if (controls) controls.remove(); // Usuń kontrolki dla tej paraboli
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rysowanie lewego ramienia paraboli
function drawPositiveParabolaLeftArm(x, y, a = 0.01, color = 'blue') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const xMin = -200; // Lewa granica (ujemne wartości x)
    const xMax = 0;   // Środkowa wartość (parabola kończy się w punkcie wierzchołka)
    const numPoints = 50; // Liczba punktów do narysowania

    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints); // Wartości od xMin do xMax
        const localY = a * localX * localX; // Funkcja paraboli y = ax^2
        const svgX = x + localX; // Przesunięcie środka paraboli
        const svgY = y - localY;

        if (i === 0) {
            d += `M${svgX},${svgY}`; // Start ścieżki
        } else {
            d += ` L${svgX},${svgY}`; // Kolejne punkty
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(path);
    enableDragging(path); // Dodanie możliwości przeciągania
}

// rysowanie prawego ramienia paraboli
function drawPositiveParabolaRightArm(x, y, a = 0.01, color = 'blue') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const xMin = 0;   // Start wierzchołka paraboli
    const xMax = 200; // Prawa granica
    const numPoints = 50; // Liczba punktów do narysowania

    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints); // Wartości od xMin do xMax
        const localY = a * localX * localX; // Funkcja paraboli y = ax^2
        const svgX = x + localX; // Przesunięcie środka paraboli
        const svgY = y - localY;

        if (i === 0) {
            d += `M${svgX},${svgY}`; // Start ścieżki
        } else {
            d += ` L${svgX},${svgY}`; // Kolejne punkty
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(path);
    enableDragging(path); // Dodanie możliwości przeciągania
}

//__________________________________________________________________________________________________________________________

let negativeParabolaCounter = 1; // Licznik dla negatywnych parabol

function drawNegativeParabola(x, y, a = 0.01) {
    const id = `negative-parabola-${negativeParabolaCounter++}`; // Unikalny identyfikator
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const drawPath = (x, y, a) => {
        let d = '';
        const xMin = -200;  // Lewa granica paraboli
        const xMax = 200;   // Prawa granica paraboli
        const numPoints = 100; // Liczba punktów do rysowania

        for (let i = 0; i <= numPoints; i++) {
            const localX = xMin + (xMax - xMin) * (i / numPoints); // Przechodzimy od xMin do xMax
            const localY = -a * localX * localX; // Funkcja paraboli skierowanej w dół: y = -ax^2
            const svgX = x + localX; // Przesunięcie środka paraboli
            const svgY = y - localY;

            if (i === 0) {
                d += `M${svgX},${svgY}`; // Start ścieżki
            } else {
                d += ` L${svgX},${svgY}`; // Kolejne punkty
            }
        }
        return d;
    };

    path.setAttribute('d', drawPath(x, y, a));
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);
    path.setAttribute('data-id', id);
    path.setAttribute('data-x', x);
    path.setAttribute('data-y', y);
    path.setAttribute('data-a', a);

    svgCanvas.appendChild(path);
    enableDragging(path); // Włączamy możliwość przeciągania

    createNegativeParabolaControls(id, x, y, a); // Tworzenie dynamicznych kontrolek
}

function createNegativeParabolaControls(id, x, y, initialA) {
    const controlsContainer = document.getElementById('controls'); // Kontener na kontrolki

    // Tworzenie kontenera dla danej paraboli
    const parabolaControls = document.createElement('div');
    parabolaControls.setAttribute('data-id', id);
    parabolaControls.innerHTML = `
        <h3>Negatywna Parabola: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-a">Parametr a:</label>
        <input type="number" id="${id}-a" step="0.01" value="${initialA}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-delete">Usuń Parabolę</button>
        </div>
    `;
    controlsContainer.appendChild(parabolaControls);

    // Obsługa zmiany parametru `a`
    const aInput = parabolaControls.querySelector(`#${id}-a`);
    aInput.addEventListener('input', (event) => {
        const newA = parseFloat(event.target.value);
        updateNegativeParabola(id, newA);
    });

    // Obsługa zmiany grubości linii
    const strokeInput = parabolaControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updateNegativeParabolaStroke(id, newStroke);
    });

    // Obsługa usuwania paraboli
    const deleteButton = parabolaControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deleteNegativeParabola(id);
    });
}

function updateNegativeParabola(id, a) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (!path) return;

    const x = parseFloat(path.getAttribute('data-x'));
    const y = parseFloat(path.getAttribute('data-y'));

    // Rysowanie nowej ścieżki
    const d = (() => {
        let d = '';
        const xMin = -200;
        const xMax = 200;
        const numPoints = 100;

        for (let i = 0; i <= numPoints; i++) {
            const localX = xMin + (xMax - xMin) * (i / numPoints);
            const localY = -a * localX * localX;
            const svgX = x + localX;
            const svgY = y - localY;

            if (i === 0) {
                d += `M${svgX},${svgY}`;
            } else {
                d += ` L${svgX},${svgY}`;
            }
        }
        return d;
    })();

    path.setAttribute('d', d);
    path.setAttribute('data-a', a); // Aktualizacja parametru `a`
}

function updateNegativeParabolaStroke(id, strokeWidth) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (path) {
        path.setAttribute('stroke-width', strokeWidth);
    }
}

function deleteNegativeParabola(id) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (path) path.remove(); // Usuń parabolię
    if (controls) controls.remove(); // Usuń kontrolki
}


//__________________________________________________________________________________________________________________________

// rysowanie lewego ramienia negatywnej paraboli
function drawNegativeParabolaLeftArm(x, y, a = 0.01, color = 'blue') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const xMin = -200;  // Lewa granica ramienia
    const xMax = 0;     // Środek paraboli
    const numPoints = 100; // Liczba punktów do rysowania

    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints); // Przechodzimy od xMin do 0
        const localY = -a * localX * localX; // Funkcja paraboli skierowanej w dół: y = -ax^2
        const svgX = x + localX; // Przesunięcie środka paraboli
        const svgY = y - localY;

        if (i === 0) {
            d += `M${svgX},${svgY}`; // Start ścieżki
        } else {
            d += ` L${svgX},${svgY}`; // Kolejne punkty
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(path);
    enableDragging(path); // Włączamy możliwość przeciągania
}

// rysowanie prawego ramienia negatywnej paraboli
function drawNegativeParabolaRightArm(x, y, a = 0.01, color = 'blue') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const xMin = 0;     // Początek ramienia (środek paraboli)
    const xMax = 200;   // Prawa granica ramienia
    const numPoints = 100; // Liczba punktów na ścieżce

    for (let i = 0; i <= numPoints; i++) {
        const localX = xMin + (xMax - xMin) * (i / numPoints); // Przechodzimy od 0 do xMax
        const localY = -a * localX * localX; // Funkcja paraboli skierowanej w dół: y = -ax^2
        const svgX = x + localX; // Przesunięcie środka paraboli
        const svgY = y - localY;

        if (i === 0) {
            d += `M${svgX},${svgY}`; // Start ścieżki
        } else {
            d += ` L${svgX},${svgY}`; // Kolejne punkty
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(path);
    enableDragging(path); // Dodanie możliwości przeciągania
}

//_____________________________________________________________________________________________________________________________

let positiveCotangentCounter = 1; // Licznik dla pozytywnych cotangensów

function drawPositiveCotangent(x, y, scale = 50) {
    const id = `positive-cotangent-${positiveCotangentCounter++}`; // Unikalny identyfikator
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('data-id', id);

    // Funkcja do generowania ścieżki cotangensa
    const generateCotangentPath = (x, y, scale) => {
        let d = '';
        const asymptoteLeft = x - Math.PI * scale;
        const asymptoteRight = x + Math.PI * scale;
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const localX = asymptoteLeft + (asymptoteRight - asymptoteLeft) * (i / numPoints);
            const localY = 1 / Math.tan((localX - x) / scale);

            // Pomijamy wartości bliskie asymptotom
            if (Math.abs(localY) > 1e4) continue;

            const svgX = localX;
            const svgY = y - localY * scale;

            if (d === '') {
                d += `M${svgX},${svgY}`;
            } else {
                d += ` L${svgX},${svgY}`;
            }
        }
        return d;
    };

    // Rysowanie cotangensa
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', generateCotangentPath(x, y, scale));
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);
    group.appendChild(path);

    // Rysowanie asymptot
    const asymptoteLeft = x - Math.PI * scale;
    const asymptoteRight = x + Math.PI * scale;

    const createAsymptote = (position) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', position);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', position);
        line.setAttribute('y2', svgCanvas.getAttribute('height'));
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-dasharray', '5,5');
        return line;
    };

    group.appendChild(createAsymptote(asymptoteLeft));
    group.appendChild(createAsymptote(asymptoteRight));

    svgCanvas.appendChild(group);
    enableDragging(group); // Możliwość przeciągania grupy

    createPositiveCotangentControls(id, x, y, scale); // Tworzenie dynamicznych kontrolek
}



function createPositiveCotangentControls(id, x, y, initialScale) {
    const controlsContainer = document.getElementById('controls');

    const cotangentControls = document.createElement('div');
    cotangentControls.setAttribute('data-id', id);
    cotangentControls.innerHTML = `
        <h3>Pozytywny Cotangens: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-scale">Skala:</label>
        <input type="number" id="${id}-scale" step="1" value="${initialScale}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-update">Skaluj</button>
        <button id="${id}-delete">Usuń Cotangens</button>
        </div>
    `;
    controlsContainer.appendChild(cotangentControls);

    // Obsługa zmiany skali i rysowania nowego cotangensa
    const updateButton = cotangentControls.querySelector(`#${id}-update`);
    updateButton.addEventListener('click', () => {
        const scaleInput = cotangentControls.querySelector(`#${id}-scale`);
        const newScale = parseFloat(scaleInput.value);
        const strokeInput = cotangentControls.querySelector(`#${id}-stroke`);
        const newStroke = parseFloat(strokeInput.value);

        // Usuń istniejący cotangens
        deletePositiveCotangent(id);

        // Usuń istniejącą kontrolkę dla starego cotangensa
        const oldControl = document.querySelector(`[data-id="${id}"]`);
        if (oldControl) {
            oldControl.remove(); // Usuń starą kontrolkę
        }

        // Narysuj nowy cotangens z nowym ID
        drawPositiveCotangent(x, y, newScale);

        // Ustaw nową grubość kreski dla nowo narysowanego cotangensa
        const group = svgCanvas.querySelector(`[data-id="${id}"] path`);
        if (group) group.setAttribute('stroke-width', newStroke);
    });

    // Obsługa usuwania
    const deleteButton = cotangentControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deletePositiveCotangent(id);
    });
}

function updatePositiveCotangentStroke(id, strokeWidth) {
    const group = svgCanvas.querySelector(`[data-id="${id}"]`);
    if (!group) return;

    const path = group.querySelector('path');
    if (path) {
        path.setAttribute('stroke-width', strokeWidth);
    }
}

function deletePositiveCotangent(id) {
    const group = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (group) group.remove(); // Usuń grupę
    if (controls) controls.remove(); // Usuń kontrolki
}

































//rysowanie negatywnego cotangensa
function drawNegativeCotangent(x, y, scale = 50, color = 'blue') {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Obliczanie pozycji asymptot
    const asymptoteLeft = x - (Math.PI) * scale;
    const asymptoteRight = x + (Math.PI / 200) * scale;

    // Rysowanie wykresu cotangensa między asymptotami
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const numPoints = 500; // Liczba punktów wykresu

    for (let i = 0; i <= numPoints; i++) {
        const localX = asymptoteLeft + (asymptoteRight - asymptoteLeft) * (i / numPoints);
        const localY = -1 / Math.tan((localX - x) / scale); // Zmieniono znak na ujemny

        if (localX <= asymptoteLeft || localX >= asymptoteRight || Math.abs(localY) > 1e4) continue;

        const svgX = localX;
        const svgY = y - localY * scale;

        if (d === '') {
            d += `M${svgX},${svgY}`; // Start ścieżki
        } else {
            d += ` L${svgX},${svgY}`; // Dodanie kolejnego punktu
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    group.appendChild(path);

    // Rysowanie lewej asymptoty
    const leftAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftAsymptote.setAttribute('x1', asymptoteLeft);
    leftAsymptote.setAttribute('y1', 0);
    leftAsymptote.setAttribute('x2', asymptoteLeft);
    leftAsymptote.setAttribute('y2', svgCanvas.getAttribute('height'));
    leftAsymptote.setAttribute('stroke', 'black');
    leftAsymptote.setAttribute('stroke-dasharray', '5,5');
    group.appendChild(leftAsymptote);

    // Rysowanie prawej asymptoty
    /*const rightAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightAsymptote.setAttribute('x1', asymptoteRight);
    rightAsymptote.setAttribute('y1', 0);
    rightAsymptote.setAttribute('x2', asymptoteRight);
    rightAsymptote.setAttribute('y2', svgCanvas.getAttribute('height'));
    rightAsymptote.setAttribute('stroke', 'black');
    rightAsymptote.setAttribute('stroke-dasharray', '5,5');
    group.appendChild(rightAsymptote);
*/
    svgCanvas.appendChild(group);
    enableDragging(group);
    
}

//___________________________________________________________________________________________________________________________

let positiveTangentCounter = 1; // Licznik dla pozytywnych tangensów

function drawPositiveTangent(x, y, scale = 50) {
    const id = `positive-tangent-${positiveTangentCounter++}`; // Unikalny identyfikator
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('data-id', id);

    // Funkcja do generowania ścieżki tangensa
    const generateTangentPath = (x, y, scale) => {
        let d = '';
        const range = Math.PI * scale / 2; // Zakres rysowania (pomiędzy asymptotami)
        const numPoints = 500; // Liczba punktów

        for (let i = -numPoints; i <= numPoints; i++) {
            const localX = (i / numPoints) * range; // Współrzędna X w zakresie
            const localY = Math.tan(localX / scale); // Tangens skalowany

            // Ignorowanie wartości zbyt dużych (bliskich asymptotom)
            if (Math.abs(localY) > 1e3) continue;

            const svgX = x + localX;
            const svgY = y - localY * scale;

            if (d === '') {
                d += `M${svgX},${svgY}`;
            } else {
                d += ` L${svgX},${svgY}`;
            }
        }
        return d;
    };

    // Rysowanie tangensa
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', generateTangentPath(x, y, scale));
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    // Obliczanie pozycji asymptot
    const leftAsymptoteX = x - Math.PI * scale / 2;
    const rightAsymptoteX = x + Math.PI * scale / 2;

    // Rysowanie lewej asymptoty
    const leftAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftAsymptote.setAttribute('x1', leftAsymptoteX);
    leftAsymptote.setAttribute('y1', 0);
    leftAsymptote.setAttribute('x2', leftAsymptoteX);
    leftAsymptote.setAttribute('y2', svgCanvas.getAttribute('height'));
    leftAsymptote.setAttribute('stroke', 'gray');
    leftAsymptote.setAttribute('stroke-dasharray', '5,5');
    leftAsymptote.setAttribute('stroke-width', 1);

    // Rysowanie prawej asymptoty
    const rightAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightAsymptote.setAttribute('x1', rightAsymptoteX);
    rightAsymptote.setAttribute('y1', 0);
    rightAsymptote.setAttribute('x2', rightAsymptoteX);
    rightAsymptote.setAttribute('y2', svgCanvas.getAttribute('height'));
    rightAsymptote.setAttribute('stroke', 'gray');
    rightAsymptote.setAttribute('stroke-dasharray', '5,5');
    rightAsymptote.setAttribute('stroke-width', 1);

    // Dodanie elementów do grupy
    group.appendChild(leftAsymptote);
    group.appendChild(rightAsymptote);
    group.appendChild(path);

    // Dodanie grupy do SVG
    svgCanvas.appendChild(group);

    // Umożliwienie przeciągania
    enableDragging(group);

    // Tworzenie dynamicznych kontrolek
    createPositiveTangentControls(id, x, y, scale);
}




function createPositiveTangentControls(id, x, y, initialScale) {
    const controlsContainer = document.getElementById('controls');

    const tangentControls = document.createElement('div');
    tangentControls.setAttribute('data-id', id);
    tangentControls.innerHTML = `
        <h3>Pozytywny Tangens: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-scale">Skala:</label>
        <input type="number" id="${id}-scale" step="1" value="${initialScale}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-update">Skaluj</button>
        <button id="${id}-delete">Usuń Tangens</button>
        </div>
    `;
    controlsContainer.appendChild(tangentControls);

    // Obsługa zmiany skali i rysowania nowego tangensa
    const updateButton = tangentControls.querySelector(`#${id}-update`);
    updateButton.addEventListener('click', () => {
        const scaleInput = tangentControls.querySelector(`#${id}-scale`);
        const newScale = parseFloat(scaleInput.value);
        const strokeInput = tangentControls.querySelector(`#${id}-stroke`);
        const newStroke = parseFloat(strokeInput.value);

        // Usuń istniejący tangens
        deletePositiveTangent(id);

        // Usuń istniejącą kontrolkę dla starego tangensa
        const oldControl = document.querySelector(`[data-id="${id}"]`);
        if (oldControl) {
            oldControl.remove(); // Usuń starą kontrolkę
        }

        // Narysuj nowy tangens z nowym ID
        drawPositiveTangent(x, y, newScale);

        // Ustaw nową grubość kreski dla nowo narysowanego tangensa
        const group = svgCanvas.querySelector(`[data-id="${id}"] path`);
        if (group) group.setAttribute('stroke-width', newStroke);
    });

    // Obsługa zmiany grubości linii na żywo
    const strokeInput = tangentControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', () => {
        const newStroke = parseFloat(strokeInput.value);
        const group = svgCanvas.querySelector(`[data-id="${id}"] path`);
        if (group) group.setAttribute('stroke-width', newStroke);
    });

    // Obsługa usuwania
    const deleteButton = tangentControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deletePositiveTangent(id);
    });
}



function deletePositiveTangent(id) {
    const group = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (group) group.remove(); // Usuń grupę
    if (controls) controls.remove(); // Usuń kontrolki
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rysowanie negatywnego tangensu
function drawNegativeTangent(x, y, scale = 50, color = 'blue') {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Obliczenia dla asymptot
    const leftAsymptoteX = x - scale;
    const rightAsymptoteX = x + scale;

    // Rysowanie lewej asymptoty
    const leftAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftAsymptote.setAttribute('x1', leftAsymptoteX);
    leftAsymptote.setAttribute('y1', y - 300);
    leftAsymptote.setAttribute('x2', leftAsymptoteX);
    leftAsymptote.setAttribute('y2', y + 300);
    leftAsymptote.setAttribute('stroke', 'gray');
    leftAsymptote.setAttribute('stroke-dasharray', '5,5');
    leftAsymptote.setAttribute('stroke-width', 1);

    // Rysowanie prawej asymptoty
    const rightAsymptote = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightAsymptote.setAttribute('x1', rightAsymptoteX);
    rightAsymptote.setAttribute('y1', y - 300);
    rightAsymptote.setAttribute('x2', rightAsymptoteX);
    rightAsymptote.setAttribute('y2', y + 300);
    rightAsymptote.setAttribute('stroke', 'gray');
    rightAsymptote.setAttribute('stroke-dasharray', '5,5');
    rightAsymptote.setAttribute('stroke-width', 1);

    // Rysowanie wykresu tangensa (ujemne wartości)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const step = 1; // Dokładność punktów
    const range = scale * 2; // Zakres x
    for (let i = -range; i <= range; i += step) {
        const localX = i;
        const localY = -Math.tan((localX / scale) * Math.PI / 2); // Wartości tangensa (odwrócone)

        if (localY > -300 && localY < 300) { // Ograniczenie zakresu rysowania
            const svgX = x + localX;
            const svgY = y - localY * scale;

            if (i === -range) d += `M${svgX},${svgY}`;
            else d += ` L${svgX},${svgY}`;
        }
    }
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    // Dodanie elementów do grupy
    group.appendChild(leftAsymptote);
    group.appendChild(rightAsymptote);
    group.appendChild(path);

    // Dodanie do SVG i włączenie przeciągania
    svgCanvas.appendChild(group);
    enableDragging(group);
}
//_________________________________________________________________________________________________________________

let positiveSineCounter = 1; // Licznik dla sinusoid

function drawPositiveSine(x, y, amplitude = 50, wavelength = 100) {
    const id = `positive-sine-${positiveSineCounter++}`; // Generowanie unikalnego ID

    // Tworzenie grupy dla sinusoidy
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('data-id', id);

    // Funkcja generująca ścieżkę sinusoidy
    const generateSinePath = (x, y, amplitude, wavelength) => {
        let d = '';
        const step = 1; // Dokładność punktów
        const period = wavelength * 2 * Math.PI; // Jeden pełen okres

        for (let i = 0; i <= period; i += step) {
            const localX = i;
            const localY = Math.sin(i / wavelength) * amplitude;

            const svgX = x + localX;
            const svgY = y - localY;

            if (i === 0) d += `M${svgX},${svgY}`;
            else d += ` L${svgX},${svgY}`;
        }
        return d;
    };

    // Rysowanie ścieżki sinusoidy
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', generateSinePath(x, y, amplitude, wavelength));
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);
    path.setAttribute('data-x', x);
    path.setAttribute('data-y', y);

    // Dodanie ścieżki do grupy
    group.appendChild(path);

    // Dodanie grupy do SVG i włączenie przeciągania
    svgCanvas.appendChild(group);
    enableDragging(group);

    // Tworzenie kontrolek dla sinusoidy
    createPositiveSineControls(id, x, y, amplitude, wavelength);
}

function createPositiveSineControls(id, x, y, initialAmplitude, initialWavelength) {
    const controlsContainer = document.getElementById('controls');

    // Tworzenie kontenera dla danej sinusoidy
    const sineControls = document.createElement('div');
    sineControls.setAttribute('data-id', id);
    sineControls.innerHTML = `
        <h3>Sinusoida: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-amplitude">Amplituda:</label>
        <input type="number" id="${id}-amplitude" step="1" value="${initialAmplitude}">
        </div>
        <div class="control-pair">
        <label for="${id}-wavelength">Długość fali:</label>
        <input type="number" id="${id}-wavelength" step="1" value="${initialWavelength}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
        </div>
        <div class="control-buttons">
        <button id="${id}-delete">Usuń Sinusoidę</button>
        </div>
    `;
    controlsContainer.appendChild(sineControls);

    // Obsługa zmiany amplitudy na żywo
    const amplitudeInput = sineControls.querySelector(`#${id}-amplitude`);
    amplitudeInput.addEventListener('input', (event) => {
        const newAmplitude = parseFloat(event.target.value);
        updatePositiveSine(id, newAmplitude, null);
    });

    // Obsługa zmiany długości fali na żywo
    const wavelengthInput = sineControls.querySelector(`#${id}-wavelength`);
    wavelengthInput.addEventListener('input', (event) => {
        const newWavelength = parseFloat(event.target.value);
        updatePositiveSine(id, null, newWavelength);
    });

    // Obsługa zmiany grubości linii na żywo
    const strokeInput = sineControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updatePositiveSineStroke(id, newStroke);
    });

    // Obsługa usuwania sinusoidy
    const deleteButton = sineControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deletePositiveSine(id);
    });
}

function updatePositiveSine(id, amplitude = null, wavelength = null) {
    const path = svgCanvas.querySelector(`[data-id="${id}"] path`);
    if (!path) return;

    // Pobierz aktualne wartości z atrybutów lub użyj podanych nowych
    const x = parseFloat(path.getAttribute('data-x'));
    const y = parseFloat(path.getAttribute('data-y'));
    const currentAmplitude = amplitude !== null ? amplitude : parseFloat(path.getAttribute('data-amplitude') || 50);
    const currentWavelength = wavelength !== null ? wavelength : parseFloat(path.getAttribute('data-wavelength') || 100);

    // Aktualizuj atrybuty, jeśli zostały zmienione
    if (amplitude !== null) path.setAttribute('data-amplitude', currentAmplitude);
    if (wavelength !== null) path.setAttribute('data-wavelength', currentWavelength);

    // Generowanie nowej ścieżki sinusoidy
    const newD = generateSinePath(x, y, currentAmplitude, currentWavelength);
    path.setAttribute('d', newD);
}

function updatePositiveSineStroke(id, strokeWidth) {
    const path = svgCanvas.querySelector(`[data-id="${id}"] path`);
    if (path) {
        path.setAttribute('stroke-width', strokeWidth);
    }
}

function deletePositiveSine(id) {
    const group = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (group) group.remove(); // Usuń grupę sinusoidy
    if (controls) controls.remove(); // Usuń kontrolki dla tej sinusoidy
}

function generateSinePath(x, y, amplitude, wavelength) {
    let d = '';
    const step = 1; // Dokładność punktów
    const period = wavelength * 2 * Math.PI; // Jeden pełen okres

    for (let i = 0; i <= period; i += step) {
        const localX = i;
        const localY = Math.sin(i / wavelength) * amplitude;

        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) d += `M${svgX},${svgY}`;
        else d += ` L${svgX},${svgY}`;
    }
    return d;
}






























// rysowanie negatywnego sinusa
function drawNegativeSine(x, y, amplitude = 50, wavelength = 100, color = 'blue') {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Rysowanie sinusoidy
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const step = 1; // Dokładność punktów
    const period = wavelength * 2 * Math.PI; // Jeden pełen okres

    for (let i = 0; i <= period; i += step) {
        const localX = i;
        const localY = -Math.sin(i / wavelength) * amplitude; // Odwrócenie sinusoidy

        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) d += `M${svgX},${svgY}`;
        else d += ` L${svgX},${svgY}`;
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    // Dodanie sinusoidy do grupy
    group.appendChild(path);

    // Dodanie do SVG i włączenie przeciągania
    svgCanvas.appendChild(group);
    enableDragging(group);
}


















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let positiveCosineCounter = 1; // Licznik dla cosinusoid

function drawPositiveCosine(x, y, amplitude = 50, wavelength = 100, color = 'black') {
    const id = `positive-cosine-${positiveCosineCounter++}`; // Generowanie unikalnego ID

    // Tworzenie grupy dla cosinusoidy
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('data-id', id);

    // Funkcja generująca ścieżkę cosinusoidy
    const generateCosinePath = (x, y, amplitude, wavelength) => {
        let d = '';
        const step = 1; // Dokładność punktów
        const period = wavelength * 2 * Math.PI; // **Dwa pełne okresy**

        for (let i = 0; i <= period; i += step) {
            const localX = i;
            const localY = Math.cos(i / wavelength) * amplitude;

            const svgX = x + localX;
            const svgY = y - localY;

            if (i === 0) d += `M${svgX},${svgY}`;
            else d += ` L${svgX},${svgY}`;
        }
        return d;
    };

    // Rysowanie ścieżki cosinusoidy
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', generateCosinePath(x, y, amplitude, wavelength));
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);
    path.setAttribute('data-x', x);
    path.setAttribute('data-y', y);
    path.setAttribute('data-amplitude', amplitude);
    path.setAttribute('data-wavelength', wavelength);

    // Dodanie ścieżki do grupy
    group.appendChild(path);

    // Dodanie grupy do SVG i włączenie przeciągania
    svgCanvas.appendChild(group);
    enableDragging(group);

    // Tworzenie kontrolek dla cosinusoidy
    createPositiveCosineControls(id, x, y, amplitude, wavelength);
}

function createPositiveCosineControls(id, x, y, initialAmplitude, initialWavelength) {
    const controlsContainer = document.getElementById('controls');

    // Tworzenie kontenera dla danej cosinusoidy
    const cosineControls = document.createElement('div');
    cosineControls.setAttribute('data-id', id);
    cosineControls.innerHTML = `
    <h3>Cosinus: ${id}</h3>
    <div class="control-pair">
        <label for="${id}-amplitude">Amplituda:</label>
        <input type="number" id="${id}-amplitude" step="1" value="${initialAmplitude}">
    </div>
    <div class="control-pair">
        <label for="${id}-wavelength">Długość fali:</label>
        <input type="number" id="${id}-wavelength" step="1" value="${initialWavelength}">
    </div>
    <div class="control-pair">
        <label for="${id}-stroke">Stroke-Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="2">
    </div>
    <div class="control-buttons">
        <button id="${id}-delete">Usuń Cosinusoidę</button>
    </div>
`;
controlsContainer.appendChild(cosineControls);


    // Obsługa zmiany amplitudy na żywo
    const amplitudeInput = cosineControls.querySelector(`#${id}-amplitude`);
    amplitudeInput.addEventListener('input', (event) => {
        const newAmplitude = parseFloat(event.target.value);
        updatePositiveCosine(id, newAmplitude, null);
    });

    // Obsługa zmiany długości fali na żywo
    const wavelengthInput = cosineControls.querySelector(`#${id}-wavelength`);
    wavelengthInput.addEventListener('input', (event) => {
        const newWavelength = parseFloat(event.target.value);
        updatePositiveCosine(id, null, newWavelength);
    });

    // Obsługa zmiany grubości linii na żywo
    const strokeInput = cosineControls.querySelector(`#${id}-stroke`);
    strokeInput.addEventListener('input', (event) => {
        const newStroke = parseFloat(event.target.value);
        updatePositiveCosineStroke(id, newStroke);
    });

    // Obsługa usuwania cosinusoidy
    const deleteButton = cosineControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deletePositiveCosine(id);
    });
}

function updatePositiveCosine(id, amplitude = null, wavelength = null) {
    const path = svgCanvas.querySelector(`[data-id="${id}"] path`);
    if (!path) return;

    // Pobierz aktualne wartości z atrybutów lub użyj podanych nowych
    const x = parseFloat(path.getAttribute('data-x'));
    const y = parseFloat(path.getAttribute('data-y'));
    const currentAmplitude = amplitude !== null ? amplitude : parseFloat(path.getAttribute('data-amplitude') || 50);
    const currentWavelength = wavelength !== null ? wavelength : parseFloat(path.getAttribute('data-wavelength') || 100);

    // Aktualizuj atrybuty, jeśli zostały zmienione
    if (amplitude !== null) path.setAttribute('data-amplitude', currentAmplitude);
    if (wavelength !== null) path.setAttribute('data-wavelength', currentWavelength);

    // Generowanie nowej ścieżki cosinusoidy
    const newD = generateCosinePath(x, y, currentAmplitude, currentWavelength);
    path.setAttribute('d', newD);
}

function updatePositiveCosineStroke(id, strokeWidth) {
    const path = svgCanvas.querySelector(`[data-id="${id}"] path`);
    if (path) {
        path.setAttribute('stroke-width', strokeWidth);
    }
}

function deletePositiveCosine(id) {
    const group = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (group) group.remove(); // Usuń grupę cosinusoidy
    if (controls) controls.remove(); // Usuń kontrolki dla tej cosinusoidy
}

function generateCosinePath(x, y, amplitude, wavelength) {
    let d = '';
    const step = 1; // Dokładność punktów
    const period = wavelength * 2 * Math.PI; // Jeden pełen okres

    for (let i = 0; i <= period; i += step) {
        const localX = i;
        const localY = Math.cos(i / wavelength) * amplitude;

        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) d += `M${svgX},${svgY}`;
        else d += ` L${svgX},${svgY}`;
    }
    return d;
}

//__________________________________________________________________________________________________________________________
















// rysowanie negatywnego cosinusa
function drawNegativeCosine(x, y, amplitude = 50, wavelength = 100, color = 'blue') {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Rysowanie cosinusoidy (negatywnej)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    const step = 1; // Dokładność punktów
    const period = wavelength * 2 * Math.PI; // Jeden pełen okres

    for (let i = 0; i <= period; i += step) {
        const localX = i;
        const localY = -Math.cos(i / wavelength) * amplitude; // Negatywna cosinusoidalna funkcja

        const svgX = x + localX;
        const svgY = y - localY;

        if (i === 0) d += `M${svgX},${svgY}`;
        else d += ` L${svgX},${svgY}`;
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    // Dodanie cosinusoidy do grupy
    group.appendChild(path);

    // Dodanie do SVG i włączenie przeciągania
    svgCanvas.appendChild(group);
    enableDragging(group);
}

//rysowanie X
function drawXTick(x, y, length = 10, color = 'black') {
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    // Ustawienie atrybutów znacznika
    tick.setAttribute('x1', x);
    tick.setAttribute('y1', y - length / 2);
    tick.setAttribute('x2', x);
    tick.setAttribute('y2', y + length / 2);
    tick.setAttribute('stroke', color);
    tick.setAttribute('stroke-width', 2);

    // Dodanie do SVG i włączenie przeciągania
    svgCanvas.appendChild(tick);
    enableDragging(tick); // Włączenie możliwości przeciągania
}

// rysowanie ticka y
function drawYTick(x, y, length = 10, color = 'black') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    // Współrzędne poziomego ticka na osi Y
    const x1 = x - length / 2;
    const x2 = x + length / 2;

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(line);
    enableDragging(line); // Dodanie możliwości przeciągania
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let polynomialCounter = 1; // Counter for unique polynomial IDs

function drawPolynomial(coefficients, startX = 300, startY = 300, color = 'black', strokeWidth = 2) {
    const id = `polynomial-${polynomialCounter++}`; // Unique identifier

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('data-id', id);

    // Generate and set the path's "d" attribute
    generatePolynomialPath(path, coefficients, startX, startY);

    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', strokeWidth);
    path.setAttribute('fill', 'none');

    svgCanvas.appendChild(path);
    enableDragging(path);

    // Create the control panel for the polynomial
    createPolynomialControls(id, coefficients, startX, startY, strokeWidth);
}

function generatePolynomialPath(path, coefficients, startX, startY) {
    const points = [];
    for (let x = -300; x <= 300; x += 1) {
        let y = 0;
        const normalizedX = x / 50; // Normalize X to fit the polynomial scale
        for (let i = 0; i < coefficients.length; i++) {
            y += coefficients[i] * Math.pow(normalizedX, coefficients.length - 1 - i);
        }
        points.push([startX + x, startY - y * 50]); // Scale and adjust position
    }

    const d = points
        .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
        .join(' ');

    path.setAttribute('d', d); // Set the generated path
}

function createPolynomialControls(id, coefficients, startX, startY, strokeWidth) {
    const controlsContainer = document.getElementById('controls');

    // Remove any existing control panel with the same ID
    const existingControl = controlsContainer.querySelector(`[data-id="${id}"]`);
    if (existingControl) {
        existingControl.remove();
    }

    // Create a control panel for the polynomial
    const polynomialControls = document.createElement('div');
    polynomialControls.setAttribute('data-id', id);
    polynomialControls.innerHTML = `
        <h3>Polynomial: ${id}</h3>
        <div class="control-pair">
        <label for="${id}-coefficients">Coefficients (comma-separated):</label>
        <input type="text" id="${id}-coefficients" value="${coefficients.join(',')}">
        </div>
        <div class="control-pair">
        <label for="${id}-stroke">Stroke Width:</label>
        <input type="number" id="${id}-stroke" step="0.1" value="${strokeWidth}">
        </div>
        <div class="control-buttons">
        <button id="${id}-update">Update Polynomial</button>
        <button id="${id}-delete">Delete Polynomial</button>
        </div>
    `;
    controlsContainer.appendChild(polynomialControls);

    // Handle the "Update Polynomial" button
    const updateButton = polynomialControls.querySelector(`#${id}-update`);
    updateButton.addEventListener('click', () => {
        const coefficientsInput = polynomialControls.querySelector(`#${id}-coefficients`);
        const newCoefficients = coefficientsInput.value.split(',').map(Number);

        const strokeInput = polynomialControls.querySelector(`#${id}-stroke`);
        const newStrokeWidth = parseFloat(strokeInput.value);

        // Remove the existing polynomial and control panel
        deletePolynomial(id);

        const oldControl = document.querySelector(`[data-id="${id}"]`);
        if (oldControl) {
            oldControl.remove(); // Usuń starą kontrolkę
        }
        // Redraw the polynomial with the new coefficients and stroke width
        drawPolynomial(newCoefficients, startX, startY, 'black', newStrokeWidth);
    });

    // Handle the "Delete Polynomial" button
    const deleteButton = polynomialControls.querySelector(`#${id}-delete`);
    deleteButton.addEventListener('click', () => {
        deletePolynomial(id);
    });
}


function deletePolynomial(id) {
    const path = svgCanvas.querySelector(`[data-id="${id}"]`);
    const controls = document.querySelector(`[data-id="${id}"]`);
    if (path) path.remove(); // Remove the SVG path
    if (controls) controls.remove(); // Remove the control panel
}












//rysowanie strzalki na x
function drawXArrow(x, y, length = 50, color = 'black') {
    const arrowGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    arrowGroup.setAttribute('transform', `translate(${x}, ${y})`);

    // Linia główna strzałki
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', length);
    line.setAttribute('y2', 0);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', 2);
    arrowGroup.appendChild(line);

    // Grot strzałki
    const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrowHead.setAttribute('points', `${length},0 ${length - 10},-5 ${length - 10},5`);
    arrowHead.setAttribute('fill', color);
    arrowGroup.appendChild(arrowHead);

    svgCanvas.appendChild(arrowGroup);

    // Umożliwienie przesuwania
    enableDragging(arrowGroup);
}

// rysowanie strzałki na y
function drawYArrow(x, y, length = 50) {
    const svg = document.querySelector('svg');

    // Główna linia strzałki
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y - length);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', 2);

    // Groty strzałki
    const arrowHeadLeft = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrowHeadLeft.setAttribute('x1', x - 5);
    arrowHeadLeft.setAttribute('y1', y - length + 10);
    arrowHeadLeft.setAttribute('x2', x);
    arrowHeadLeft.setAttribute('y2', y - length);
    arrowHeadLeft.setAttribute('stroke', 'black');
    arrowHeadLeft.setAttribute('stroke-width', 2);

    const arrowHeadRight = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrowHeadRight.setAttribute('x1', x + 5);
    arrowHeadRight.setAttribute('y1', y - length + 10);
    arrowHeadRight.setAttribute('x2', x);
    arrowHeadRight.setAttribute('y2', y - length);
    arrowHeadRight.setAttribute('stroke', 'black');
    arrowHeadRight.setAttribute('stroke-width', 2);

    // Grupa `g` na potrzeby przesuwania
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.appendChild(line);
    group.appendChild(arrowHeadLeft);
    group.appendChild(arrowHeadRight);
    group.setAttribute('transform', `translate(0, 0)`);

    // Dodanie obsługi przesuwania
    enableDragging(group);

    // Dodanie do SVG
    svg.appendChild(group);
}

// rysowanie stałej funkcji liniowej
function drawConstantLinearFunction(x1, x2, y) {
    const svg = document.querySelector('svg');

    // Tworzenie linii
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', 'blue'); // Możesz zmienić kolor linii
    line.setAttribute('stroke-width', 2);

    // Dodanie obsługi przesuwania
    enableDragging(line);

    // Dodanie do SVG
    svg.appendChild(line);
}










function drawHyperbola(centerX, centerY, a = 50, b = 30, color = 'red') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const numPoints = 200; // Więcej punktów dla płynnej krzywej
    const xStart = a + 1; // Minimalna wartość x (start za wierzchołkiem)
    const xEnd = 300; // Maksymalna wartość x
    let d = '';

    // Rysowanie prawej gałęzi hiperboli
    for (let i = 0; i <= numPoints; i++) {
        const localX = xStart + (xEnd - xStart) * (i / numPoints); // Od a+1 do xEnd
        const localY = b * Math.sqrt((localX * localX) / (a * a) - 1); // Wyliczenie Y
        const svgX = centerX + localX; // Przesunięcie względem środka
        const svgY1 = centerY + localY; // Górna część
        const svgY2 = centerY - localY; // Dolna część

        if (i === 0) {
            d += `M${svgX},${svgY1}`; // Start górnej części
        } else {
            d += ` L${svgX},${svgY1}`; // Kolejne punkty górnej części
        }

        if (i === 0) {
            d += ` M${svgX},${svgY2}`; // Start dolnej części
        } else {
            d += ` L${svgX},${svgY2}`; // Kolejne punkty dolnej części
        }
    }

    // Rysowanie lewej gałęzi hiperboli
    for (let i = 0; i <= numPoints; i++) {
        const localX = -xStart - (xEnd - xStart) * (i / numPoints); // Od -a-1 do -xEnd
        const localY = b * Math.sqrt((localX * localX) / (a * a) - 1); // Wyliczenie Y
        const svgX = centerX + localX; // Przesunięcie względem środka
        const svgY1 = centerY + localY; // Górna część
        const svgY2 = centerY - localY; // Dolna część

        if (i === 0) {
            d += ` M${svgX},${svgY1}`; // Start górnej części
        } else {
            d += ` L${svgX},${svgY1}`; // Kolejne punkty górnej części
        }

        if (i === 0) {
            d += ` M${svgX},${svgY2}`; // Start dolnej części
        } else {
            d += ` L${svgX},${svgY2}`; // Kolejne punkty dolnej części
        }
    }

    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', 2);

    svgCanvas.appendChild(path); // Dodanie hiperboli do SVG
}










function saveSVG() {
    const svgCanvas = document.getElementById('svgCanvas');
    const serializer = new XMLSerializer();

    // Dodanie przestrzeni nazw SVG, jeśli jej brak
    if (!svgCanvas.getAttribute('xmlns')) {
        svgCanvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    const source = serializer.serializeToString(svgCanvas);

    // Dodanie deklaracji XML i przestrzeni nazw
    const fullSource = `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        ${source}
    `.trim();

    // Utworzenie obiektu Blob z zawartością SVG
    const blob = new Blob([fullSource], { type: 'image/svg+xml;charset=utf-8' });

    // Utworzenie linku do pobrania pliku
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'canvas.svg'; // Nazwa pliku
    downloadLink.click();

    // Zwolnienie pamięci zajmowanej przez obiekt URL
    URL.revokeObjectURL(url);
}


// Obsługa kliknięcia przycisku Zapisz
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveSVG);


// Wykonywanie pojedynczej komendy
function executeCommand(command) {
    const parts = command.trim().split(/\s+/);

    switch (parts[0]) {
        case 'positive_parabola': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawParabola(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'x_axis': {
            drawXAxis();
            break;
        }
        case 'y_axis': {
            drawYAxis();
            break;
        }
        case 'point': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                drawPoint(x, y);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'x_asymptote': {
            if (parts.length >= 2) {
                const x = parseInt(parts[1], 10);
                const color = parts.length >= 3 ? parts[2] : 'purple';
                const dashed = parts.length >= 4 ? parts[3] === 'true' : true;
                drawXAsymptote(x, color, dashed);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'y_asymptote': {
            if (parts.length >= 2) {
                const y = parseInt(parts[1], 10);
                const color = parts.length >= 3 ? parts[2] : 'green';
                const dashed = parts.length >= 4 ? parts[3] === 'true' : true;
                drawYAsymptote(y, color, dashed);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_linear_function': {
            if (parts.length >= 3) {
                const x = parseFloat(parts[1]);
                const y = parseFloat(parts[2]);
                const a = parts.length >= 4 ? parseFloat(parts[3]) : 1;
                const color = parts.length >= 5 ? parts[4] : 'orange';
                drawPositiveLinearFunction(x, y, a, color);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_linear_function': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const slope = parts.length === 4 ? parseFloat(parts[3]) : -1;
                const color = parts.length === 5 ? parts[4] : 'red';
                drawNegativeLinearFunction(x, y, slope, color);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_parabola_left_arm': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawPositiveParabolaLeftArm(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_parabola_right_arm': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawPositiveParabolaRightArm(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_parabola': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawNegativeParabola(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_parabola_left_arm': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawNegativeParabolaLeftArm(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_parabola_right_arm': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const a = parts.length === 4 ? parseFloat(parts[3]) : 0.01;
                drawNegativeParabolaRightArm(x, y, a);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_ctg': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const scale = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawPositiveCotangent(x, y, scale);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_ctg': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const scale = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawNegativeCotangent(x, y, scale);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_tg': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const scale = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawPositiveTangent(x, y, scale);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_tg':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const scale = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawNegativeTangent(x, y, scale);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_sin':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const amplitude = parts.length >= 4 ? parseFloat(parts[3]) : 50;
                const wavelength = parts.length === 5 ? parseFloat(parts[4]) : 100;
                drawPositiveSine(x, y, amplitude, wavelength);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_sin':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const amplitude = parts.length >= 4 ? parseFloat(parts[3]) : 50;
                const wavelength = parts.length === 5 ? parseFloat(parts[4]) : 100;
                drawNegativeSine(x, y, amplitude, wavelength);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'positive_cos':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const amplitude = parts.length >= 4 ? parseFloat(parts[3]) : 50;
                const wavelength = parts.length === 5 ? parseFloat(parts[4]) : 100;
                drawPositiveCosine(x, y, amplitude, wavelength);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'negative_cos':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const amplitude = parts.length >= 4 ? parseFloat(parts[3]) : 50;
                const wavelength = parts.length === 5 ? parseFloat(parts[4]) : 100;
                drawNegativeCosine(x, y, amplitude, wavelength);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'x_tick':{
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const length = parts.length === 4 ? parseFloat(parts[3]) : 10;
                drawXTick(x, y, length);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'y_tick': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const length = parts.length === 4 ? parseFloat(parts[3]) : 10;
                drawYTick(x, y, length);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'polynomial': {
            if (parts.length >= 4) {
                const x = parseInt(parts[1], 10); // Startowy x
                const y = parseInt(parts[2], 10); // Startowy y
                const coefficients = parts.slice(3).map(Number); // Współczynniki wielomianu
                drawPolynomial(coefficients, x, y);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'x_arrow': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const length = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawXArrow(x, y, length);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'y_arrow': {
            if (parts.length >= 3) {
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);
                const length = parts.length === 4 ? parseFloat(parts[3]) : 50;
                drawYArrow(x, y, length);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'constant_linear_function': {
            if (parts.length >= 4) {
                const x1 = parseInt(parts[1], 10);
                const x2 = parseInt(parts[2], 10);
                const y = parseInt(parts[3], 10);
                drawConstantLinearFunction(x1, x2, y);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
        case 'hyperbola': {
            if (parts.length >= 5) {
                const centerX = parseInt(parts[1], 10);
                const centerY = parseInt(parts[2], 10);
                const a = parseInt(parts[3], 10);
                const b = parseInt(parts[4], 10);
                drawHyperbola(centerX, centerY, a, b);
            } else {
                console.error(`Niepoprawna komenda: ${command}`);
            }
            break;
        }
           
        default: {
            console.error(`Nieznana komenda: ${command}`);
        }
    }
}



// Wykonywanie komend z tekstu
function executeCommandsFromText(fileContent) {
    const commands = fileContent.split('\n'); // Rozdziel linie na komendy
    commands.forEach((command) => {
        if (command.trim()) {
            executeCommand(command.trim());
        }
    });
}

// Obsługa kliknięcia przycisku Rysuj
drawButton.addEventListener('click', () => {
    const command = commandInput.value.trim();
    executeCommand(command);
});

// Obsługa kliknięcia przycisku Wczytaj plik
loadButton.addEventListener('click', () => {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;
            executeCommandsFromText(fileContent);
        };

        reader.readAsText(file);
    } else {
        alert('Proszę wybrać plik!');
    }
});

// Czyszczenie płótna
clearButton.addEventListener('click', () => {
    // Czyszczenie canvasu
    svgCanvas.innerHTML = '';
    
    // Czyszczenie dynamicznych kontrolek
    const controlsContainer = document.getElementById('controls');
    controlsContainer.innerHTML = '';
});


function enableDragging(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;

        if (element.tagName === 'line' && element.getAttribute('x1') !== element.getAttribute('x2')) {
            // Obsługa funkcji liniowej
            offsetX = event.clientX;
            offsetY = event.clientY;
        } else if (element.tagName === 'line' && element.getAttribute('x1') === element.getAttribute('x2')) {
            // Obsługa ticków pionowych (y_tick) i asymptoty pionowej
            offsetX = event.clientX - parseFloat(element.getAttribute('x1'));
            offsetY = event.clientY;
        } else if (element.tagName === 'line' && element.getAttribute('y1') === element.getAttribute('y2')) {
            // Obsługa ticków poziomych (x_tick) oraz stałych funkcji liniowych
            offsetX = parseFloat(element.getAttribute('x1'));
            offsetY = event.clientY - parseFloat(element.getAttribute('y1'));
        } else if (element.tagName === 'path') {
            // Obsługa wielomianu
            const transform = element.getAttribute('transform');
            const translateMatch = transform ? transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/) : null;
            const currentX = translateMatch ? parseFloat(translateMatch[1]) : 0;
            const currentY = translateMatch ? parseFloat(translateMatch[2]) : 0;

            offsetX = event.clientX - currentX;
            offsetY = event.clientY - currentY;
        } else if (element.tagName === 'g') {
            // Obsługa grup, np. strzałek (x_arrow, y_arrow)
            const transform = element.getAttribute('transform');
            const translateMatch = transform ? transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/) : null;
            const currentX = translateMatch ? parseFloat(translateMatch[1]) : 0;
            const currentY = translateMatch ? parseFloat(translateMatch[2]) : 0;

            offsetX = event.clientX - currentX;
            offsetY = event.clientY - currentY;
        } else {
            // Obsługa elementów z transformacją
            const transform = element.getAttribute('transform');
            const translateMatch = transform ? transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/) : null;
            const currentX = translateMatch ? parseFloat(translateMatch[1]) : 0;
            const currentY = translateMatch ? parseFloat(translateMatch[2]) : 0;

            offsetX = event.clientX - currentX;
            offsetY = event.clientY - currentY;
        }
    });

    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            if (element.tagName === 'line' && element.getAttribute('x1') !== element.getAttribute('x2')) {
                // Przesuwanie funkcji liniowej
                const deltaX = event.clientX - offsetX;
                const deltaY = event.clientY - offsetY;

                const x1 = parseFloat(element.getAttribute('x1')) + deltaX;
                const y1 = parseFloat(element.getAttribute('y1')) + deltaY;
                const x2 = parseFloat(element.getAttribute('x2')) + deltaX;
                const y2 = parseFloat(element.getAttribute('y2')) + deltaY;

                element.setAttribute('x1', x1);
                element.setAttribute('y1', y1);
                element.setAttribute('x2', x2);
                element.setAttribute('y2', y2);

                // Aktualizacja data-x i data-y
                const centerX = parseFloat(element.getAttribute('data-x')) + deltaX;
                const centerY = parseFloat(element.getAttribute('data-y')) - deltaY; // Oś Y rośnie w dół
                element.setAttribute('data-x', centerX);
                element.setAttribute('data-y', centerY);

                offsetX = event.clientX;
                offsetY = event.clientY;
            } else if (element.tagName === 'line' && element.getAttribute('x1') === element.getAttribute('x2')) {
                // Przesuwanie ticków pionowych (y_tick) i asymptoty pionowej
                const deltaX = event.clientX - offsetX;
                const deltaY = event.clientY - offsetY;

                const newX = parseFloat(element.getAttribute('x1')) + deltaX;
                const y1 = parseFloat(element.getAttribute('y1')) + deltaY;
                const y2 = parseFloat(element.getAttribute('y2')) + deltaY;

                element.setAttribute('x1', newX);
                element.setAttribute('x2', newX);
                element.setAttribute('y1', y1);
                element.setAttribute('y2', y2);

                offsetX = event.clientX;
                offsetY = event.clientY;
            } else if (element.tagName === 'line' && element.getAttribute('y1') === element.getAttribute('y2')) {
                // Przesuwanie ticków poziomych (x_tick) oraz stałych funkcji liniowych
                const deltaY = event.clientY - offsetY;

                const newY = parseFloat(element.getAttribute('y1')) + deltaY;

                element.setAttribute('y1', newY);
                element.setAttribute('y2', newY);

                offsetY = event.clientY;
            } else if (element.tagName === 'path') {
                // Przesuwanie wielomianu
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                element.setAttribute('transform', `translate(${x}, ${y})`);
            } else if (element.tagName === 'g') {
                // Przesuwanie grup, np. strzałek (x_arrow, y_arrow)
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                element.setAttribute('transform', `translate(${x}, ${y})`);
            } else {
                // Przesuwanie elementów z transformacją
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                element.setAttribute('transform', `translate(${x}, ${y})`);
            }
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

















