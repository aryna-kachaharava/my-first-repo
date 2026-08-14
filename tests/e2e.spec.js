import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {InventoryPage} from '../pages/inventory.page';
import {CartPage} from '../pages/cart.page';
import {CheckoutStepOnePage} from '../pages/checkoutOne.page';
import {CheckoutStepTwoPage} from '../pages/checkoutTwo.page';
import {CompletePage} from '../pages/complete.page';

test('successful login and purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const completePage = new CompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user','secret_sauce');
 
    
    const pageTitle = await inventoryPage.getPageTitle();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.sortItems('hilo');
    const firstProdName = await inventoryPage.getFirstProductName();
    await inventoryPage.addItemToCart(firstProdName);
    await inventoryPage.openCart();
    
    const itemInCart = await cartPage.itemFromCart(firstProdName);
    await expect(itemInCart).toBeVisible();
    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test','User','12345');
    await checkoutStepOnePage.clickContinueButton();
    
    await checkoutStepTwoPage.finishCheckout();

    await expect(completePage.getCompletionMessage()).toHaveText("Thank you for your order!");
});




