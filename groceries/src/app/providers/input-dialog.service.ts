import { Injectable } from '@angular/core';
import { GroceriesServiceService } from '../providers/groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class InputDialogService {
  constructor(
    public alertController: AlertController,
    public dataService: GroceriesServiceService
  ) {}

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please Edit Item...' : 'Please Enter Item',

      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null,
        },
        {
          name: 'quantity',
          id: 'quantity-id',
          placeholder: 'Quantity',
          value: item ? item.quantity : null,
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: item ? 'Save Changes' : 'Add Item',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(data);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
