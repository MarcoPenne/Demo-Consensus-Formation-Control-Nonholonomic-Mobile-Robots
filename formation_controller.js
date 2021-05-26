class FormationController{

    constructor(cars, theta_d, u_d, c, adiacency_matrix){
        this.cars = cars;
        this.N = this.cars.length;
        this.theta_d = theta_d;
        this.u_d = u_d;
        this.c = c;
        this.adiacency_matrix = adiacency_matrix;
    }

    compute_actions(){
        let actions = []
        let u_i, w_i, phi_ij, d_i, norm_d_2, k_d, new_k_d, avg_kd;
        for(let i=0; i<this.N; i++){
            u_i = 0;
            w_i = 0;

            avg_kd = 0;
            for(let j=0; j<this.N; j++){
                
                if(true){
                //if (this.adiacency_matrix[i][j]==1){
                    if (Math.abs(this.cars[j].x - this.cars[i].x)<1e-2 && Math.abs(this.cars[j].y - this.cars[i].y)<1e-2){
                        phi_ij = 0;
                    }else{
                        //phi_ij = Math.atan((this.cars[j].y - this.cars[i].y)/(this.cars[j].x - this.cars[i].x));
                        phi_ij = Math.atan2((this.cars[j].y - this.cars[i].y),(this.cars[j].x - this.cars[i].x));
                    }
                    d_i = [(this.cars[i].x - this.cars[j].x), this.cars[i].y - this.cars[j].y]
                    norm_d_2 = d_i[0]*d_i[0] + d_i[1]*d_i[1];
                    k_d = 1 - Math.exp(this.c - norm_d_2);
                    avg_kd += k_d;
                    //console.log(k_d)
                    //w_i -= this.angle_sub(this.cars[i].theta, phi_ij)
                    new_k_d = k_d;
                    if (new_k_d<0) new_k_d=0;
                    w_i -= (this.cars[i].theta - k_d*phi_ij) + (new_k_d-1)*(this.theta_d);
                    u_i -= ((this.cars[i].x - this.cars[j].x)*Math.cos(this.cars[i].theta) + 
                           (this.cars[i].y - this.cars[j].y)*Math.sin(this.cars[i].theta))*k_d
                    u_i += this.u_d;
                }
            }
            //avg_kd = avg_kd/4;
            //u_i += this.u_d
            //w_i -= *(this.theta_d-this.cars[i].theta)
            actions.push([u_i, w_i]);
        }
        return actions;
    }

    angle_sub(alpha, beta){
        return Math.atan2(Math.sin(alpha - beta), Math.cos(alpha - beta))
    }
}