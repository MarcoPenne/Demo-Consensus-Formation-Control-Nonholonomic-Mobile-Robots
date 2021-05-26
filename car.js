

class Car{
    constructor(x, y, theta, color, unit, screen_measures){
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.width = 0.8;
        this.length = 1;
        this.unit = unit;
        this.color = color;
        this.screen_measures = screen_measures;
        this.history = [];
    }

    show(){
        let x1, x2, x3, y1, y2, y3;
        x1 = this.x - this.width*Math.sin(this.theta)/2;
        x2 = this.x + this.width*Math.sin(this.theta)/2;
        y1 = this.y + this.width*Math.cos(this.theta)/2;
        y2 = this.y - this.width*Math.cos(this.theta)/2;
        x3 = this.x + this.length*Math.cos(this.theta);
        y3 = this.y + this.length*Math.sin(this.theta);
        
        let tmp = this.coord2screen(x1, y1);
        x1 = tmp[0];
        y1 = tmp[1];
        tmp = this.coord2screen(x2, y2);
        x2 = tmp[0];
        y2 = tmp[1];
        tmp = this.coord2screen(x3, y3);
        x3 = tmp[0];
        y3 = tmp[1];

        fill(this.color);
        triangle(x1, y1, x2, y2, x3, y3);

        let tmp1, tmp2;
        for (let i=0; i<this.history.length-1; i++){
            stroke(this.color);
            tmp1 = coord2screen(this.history[i][0],this.history[i][1])
            tmp2 = coord2screen(this.history[i+1][0],this.history[i+1][1])
            
            line(tmp1[0], tmp1[1], tmp2[0], tmp2[1]);
        }
        stroke(0, 0, 0);
    }

    move(u, w, dT){
        this.history.push([this.x, this.y]);
        // Euler
        /*
        this.x = this.x + u*Math.cos(this.theta)*dT;
        this.y = this.y + u*Math.sin(this.theta)*dT;
        this.theta = this.theta + w*dT;
        */
        // 2nd Runge-Kutta
        /*this.x = this.x + u*Math.cos(this.theta+w*dT/2)*dT;
        this.y = this.y + u*Math.sin(this.theta+w*dT/2)*dT;
        this.theta = this.theta + w*dT;
        */
        // Exact
        if (w>1e-15){
            let thetak1 = this.theta + w*dT;
            this.x = this.x + u/w*(Math.sin(thetak1)-Math.sin(this.theta));
            this.y = this.y - u/w*(Math.cos(thetak1)-Math.cos(this.theta));
            this.theta = this.theta + w*dT;
        }else{
            this.x = this.x + u*Math.cos(this.theta+w*dT/2)*dT;
            this.y = this.y + u*Math.sin(this.theta+w*dT/2)*dT;
            this.theta = this.theta + w*dT;
        }
    }

    coord2screen(x, y){
        let x_min, x_max, y_min, y_max;
        x_min = this.screen_measures[0];
        y_max = this.screen_measures[3];

        x = x-x_min;
        x = x*unit;
        y = -y+y_max;
        y = y*unit;
        return [x, y];
    }
}