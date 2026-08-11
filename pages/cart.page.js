export class CartPage{
    constructor(page){
        this.page=page
        this.addedItemsList=page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton=page.getByRole('button',{name:'Checkout'})
        this.continueButton=page.getByRole('button',{name:'Continue Shopping'})

    }

    async goToCheckout(){
       await this.checkoutButton.click();
    }
    async continueShopping(){
       await this.continueButton.click();
    }
    async itemFromCart(itemName){
       const item=this.addedItemsList.filter({hasText:itemName});
        return item;
    }
}