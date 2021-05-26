
let unit = 20;

let controller;
let screen_measures;

function setup() {
    let canvas = createCanvas(30*unit, 35*unit);
    canvas.position((window.innerWidth-30*unit)/2, (window.innerHeight-35*unit)/2);

    screen_measures = [-15, 15, -20, 15];
    car1 = new Car(-10, 12, Math.PI/4, color(0, 0, 0),unit, screen_measures); //black
    car2 = new Car(12, -12, -Math.PI/2, color(0, 255, 0),unit, screen_measures); // 
    car3 = new Car(10, 8, 2/3*Math.PI, color(0, 0, 255),unit, screen_measures);
    car4 = new Car(-1, -15, Math.PI, color(255, 0, 0),unit, screen_measures);  
    

    // K, G, B, R 
    adiacency_matrix = [[1, 1, 0, 1],
                        [1, 1, 1, 0],
                        [0, 1, 1, 1],
                        [1, 0, 1, 1]]

    controller = new RendezvousController([car1, car2, car3, car4], adiacency_matrix)
    //let txt = createDiv('This is an HTML string!');
    //txt.position(50, 50);
}

function draw() {
    background(255, 255, 255);
    draw_grid()
    let actions = controller.compute_actions()
    //print(actions)
    //dT = deltaTime*1e-3;
    dT = 0.01
    car1.move(actions[0][0], actions[0][1], dT);
    car2.move(actions[1][0], actions[1][1], dT);
    car3.move(actions[2][0], actions[2][1], dT);
    car4.move(actions[3][0], actions[3][1], dT);
    
    car1.show();
    car2.show();
    car3.show();
    car4.show();
    //pippo
}

function draw_grid(){
    stroke(0.5, [0.1])

    // v lines
    x_values = [-15, -10, -5, 0, 5, 10, 15];
    for(let i=0; i<x_values.length; i++){
        let tmp = coord2screen(x_values[i], 0);
        line(tmp[0], 0, tmp[0], 35*unit);
    }

    // h lines
    y_values = [-20, -15, -10, -5, 0, 5, 10, 15];
    for(let i=0; i<y_values.length; i++){
        let tmp = coord2screen(0, y_values[i]);
        line(0, tmp[1], 30*unit, tmp[1]);
    }
}

function coord2screen(x, y){
    let x_min, x_max, y_min, y_max;
    x_min = screen_measures[0];
    y_max = screen_measures[3];

    x = x-x_min;
    x = x*unit;
    y = -y+y_max;
    y = y*unit;
    return [x, y];
}