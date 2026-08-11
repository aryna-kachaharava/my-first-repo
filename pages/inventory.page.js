export class InventoryPage{
    constructor(page){
        this.page=page
        this.pageTitle = page.locator('.title');
        this.appLogo=page.locator('[class="app_logo"]');
        this.shoppingCart=page.locator('[data-test="shopping-cart-link"]');
        this.itemsList=page.locator('[data-test="inventory-item"]');
        this.addButton=page.getByRole('button',{name:'Add to cart'});
        this.sortDropdown=page.locator('[data-test="product-sort-container"]');
    }

    async addItemToCart(itemName) {
        const item=this.itemsList.filter({hasText:itemName});
        await item.getByRole('button',{name:'Add to cart'}).click();
    }

    async openCart(){
       await this.shoppingCart.click();
    }

    async getPageTitle(){
        return await this.pageTitle.textContent();
    }

    async sortItems(option){
        await this.sortDropdown.selectOption(option);
    }

    async getFirstProductName(){
        return await this.itemsList.first().locator('[data-test="inventory-item-name"]').textContent();
    }
}