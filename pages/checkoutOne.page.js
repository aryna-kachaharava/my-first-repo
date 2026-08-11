export class CheckoutStepOnePage{
    constructor(page){
        this.page=page
        this.firstNameInput=page.locator('[data-test="firstName"]');
        this.lastNameInput=page.locator('[data-test="lastName"]');
        this.indexInput=page.locator('[data-test="postalCode"]');
        this.continueButton=page.locator('[data-test="continue"]');

    }

    async fillUserInfo(firstName, lastName, postalCode){
       await this.firstNameInput.fill(firstName);
       await this.lastNameInput.fill(lastName);
       await this.indexInput.fill(postalCode);
      
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }
}