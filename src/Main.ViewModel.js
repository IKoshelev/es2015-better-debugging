import { observable, computed, action } from "mobx";

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const verifyBeerInverntory = async (beerCountInOrder) => {
    await delay(1000);

    // We have just 5 beers left??? :-(
    if (beerCountInOrder > 5) {
        return false;
    }
    return true;
}

const placeOrder = async (beerCountInOrder) => {
    await delay(1000);
    return true;
}


export class MainVM {

    @observable beersToOrder = 0;
    @observable orderPlaced = undefined;
    @observable orderInProgress = false;
    @observable message = 'How much beer do you want?';

    @action.bound
    moreBeer() {
        this.beersToOrder += 1;
        this.tryPlaceOrder();
    }

    @action.bound
    lessBeer() {
        if (this.beersToOrder >= 1) {
            this.beersToOrder -= 1;
        }
        this.tryPlaceOrder();
    }

    @action // action.bound would be better, but for demo sake, lets use arrow
    tryPlaceOrder = async () => {

        if (this.currentBeerOrder === 0) {
            return;
        }

        this.orderPlaced = undefined;
        this.message = 'Ordering.';
        this.orderInProgress = true;

        const currentBeerOrder = this.beersToOrder;

        try {
            const isEnoughBeerInInventory = await verifyBeerInverntory(currentBeerOrder);

            if (!isEnoughBeerInInventory) {
                this.orderPlaced = false;
                this.message = 'Not enough beer in inventory :-(';
                return;
            }

            this.orderPlaced = await placeOrder(currentBeerOrder);

            if (this.orderPlaced) {
                this.message = 'Success!';
            }
        }
        catch {
            this.orderPlaced = false;
            this.message = 'Server down!';
        }
        finally {
            this.orderInProgress = false;
        }
    }

}

export const mainVMDefaultInstance = new MainVM();

export default mainVMDefaultInstance;