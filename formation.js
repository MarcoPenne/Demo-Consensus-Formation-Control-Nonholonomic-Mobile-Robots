
let unit = 20;

let controller;
let screen_measures;
let time = 0;
let canvas;
let percentage = 0.8;

function setup() {

    unit = Math.min(percentage*window.innerHeight/42, percentage*window.innerWidth/52);

    canvas = createCanvas(52*unit, 42*unit);
    canvas.position((window.innerWidth-52*unit)/2, (window.innerHeight-42*unit)/2);

    screen_measures = [-16, 36, -21, 21];
    car1 = new Car(-10, 12, Math.PI/4, color(0, 0, 0),unit, screen_measures);
    car2 = new Car(12, -12, -Math.PI/2, color(0, 255, 0),unit, screen_measures);  
    car3 = new Car(10, 8, 2/3*Math.PI, color(0, 0, 255),unit, screen_measures);
    car4 = new Car(-1, -15, Math.PI, color(255, 0, 0),unit, screen_measures);  
    
    // K, G, B, R 
    adiacency_matrix = [[1, 1, 0, 1],
                        [1, 1, 1, 0],
                        [0, 1, 1, 1],
                        [1, 0, 1, 1]]

    controller = new FormationController([car1, car2, car3, car4], Math.PI/4, 1, 8, adiacency_matrix)
    //let txt = createDiv('This is an HTML string!');
    //txt.position(50, 50);
}

window.onresize = function(){
    unit = Math.min(percentage*window.innerHeight/42, percentage*window.innerWidth/52);
    
    canvas = createCanvas(52*unit, 42*unit);
    canvas.position((window.innerWidth-52*unit)/2, (window.innerHeight-42*unit)/2);
}

function reset(){
    car1 = new Car(-10, 12, Math.PI/4, color(0, 0, 0),unit, screen_measures);
    car2 = new Car(12, -12, -Math.PI/2, color(0, 255, 0),unit, screen_measures);  
    car3 = new Car(10, 8, 2/3*Math.PI, color(0, 0, 255),unit, screen_measures);
    car4 = new Car(-1, -15, Math.PI, color(255, 0, 0),unit, screen_measures);  

    controller = new FormationController([car1, car2, car3, car4], Math.PI/4, 1, 8, adiacency_matrix)
}

function draw() {
    
    if (time>10){
        reset();
    }
    background(255, 255, 255);
    draw_grid()
    let actions = controller.compute_actions()
    //print(actions)
    //dT = deltaTime*1e-3;
    dT = 0.01
    time += dT
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
    x_values = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35];
    for(let i=0; i<x_values.length; i++){
        let tmp = coord2screen(x_values[i], 0);
        line(tmp[0], 0*unit, tmp[0], 42*unit);
    }

    // h lines
    y_values = [-20, -15, -10, -5, 0, 5, 10, 15, 20];
    for(let i=0; i<y_values.length; i++){
        let tmp = coord2screen(0, y_values[i]);
        line(0*unit, tmp[1], 52*unit, tmp[1]);
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