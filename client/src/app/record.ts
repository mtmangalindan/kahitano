export class Records {
    billingCycle:string;
    startDate:string;
    endDate:string;

    constructor(billingCycle:string,startDate:string,endDate:string){
        this.billingCycle = billingCycle;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
