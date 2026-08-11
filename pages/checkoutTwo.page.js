export class CheckoutStepTwoPage{
    constructor(page){
        this.page=page
        this.orderInfo=page.locator('[data-test="inventory-item-name"]');
        this.totalSum=page.locator('[data-test="total-label"]');
        this.finishButton=page.getByRole('button',{name:'Finish'}) ;


    }

    async finishCheckout(){
       await this.finishButton.click();
    }
}