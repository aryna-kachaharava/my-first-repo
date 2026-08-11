export class CompletePage{
    constructor(page){
        this.page=page
        this.finishHeader=page.getByText("Thank you for your order!");
        this.backButton=page.getByRole('button',{name:'Back Home'}) ;
    }

   getCompletionMessage(){
         return this.finishHeader;
   }
}