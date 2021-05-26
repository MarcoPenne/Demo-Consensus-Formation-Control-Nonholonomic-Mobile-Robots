class RendezvousController{

    constructor(cars, adiacency_matrix){
        this.cars = cars;
        this.N = this.cars.length;
        this.adiacency_matrix = adiacency_matrix;
    }

    compute_actions(){
        let actions = []
        let u_i, w_i, phi_ij;
        for(let i=0; i<this.N; i++){
            u_i = 0;
            w_i = 0;
            for(let j=0; j<this.N; j++){
                
                if (true){//this.adiacency_matrix[i][j]==1){
                    if (Math.abs(this.cars[j].x - this.cars[i].x)<1e-2 && Math.abs(this.cars[j].y - this.cars[i].y)<1e-2){
                        phi_ij = 0;
                    }else{
                        //phi_ij = Math.atan((this.cars[j].y - this.cars[i].y)/(this.cars[j].x - this.cars[i].x));
                        phi_ij = Math.atan2((this.cars[j].y - this.cars[i].y),(this.cars[j].x - this.cars[i].x));
                    }
                    //w_i -= this.angle_sub(this.cars[i].theta, phi_ij)
                    w_i -= (this.cars[i].theta - phi_ij);
                    u_i -= (this.cars[i].x - this.cars[j].x)*Math.cos(this.cars[i].theta) + 
                           (this.cars[i].y - this.cars[j].y)*Math.sin(this.cars[i].theta)
                }
            }

            actions.push([u_i, w_i]);
        }
        return actions;
    }

    angle_sub(alpha, beta){
        return Math.atan2(Math.sin(alpha - beta), Math.cos(alpha - beta))
    }
}