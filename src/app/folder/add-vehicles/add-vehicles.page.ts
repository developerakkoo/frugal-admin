import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandlerService } from 'src/app/services/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.page.html',
  styleUrls: ['./add-vehicles.page.scss'],
})
export class AddVehiclesPage implements OnInit {
  categories: any[] = [];

  getCatSub!: Subscription;
  deleteCatSub!: Subscription;
  constructor(private http: HttpClient,
    private handler: HandlerService,
    private router: Router) {

  }
  
  
  
  ngOnInit() {
    
  }

  ionViewDidEnter() {
    console.log("Page Enter");
    
    this.getAllCategories();
  }

  ionViewDidLeave() {
    console.log("Page Leave");
    
    this.getCatSub.unsubscribe();
    this.deleteCatSub.unsubscribe();
  }
  getAllCategories() {
    this.handler.presentLoading("Loading...");
    this.getCatSub = this.http.get(environment.URL + '/category')
      .subscribe({
        next: (cat: any) => {
          console.log(cat);
          this.categories = cat['cat'];
          this.handler.dismissLoading();

        },
        error: (error: any) => {
          console.log(error);
          this.handler.dismissLoading();

          this.handler.presentToast(error.message)

        },


        complete: () => {
          console.log("Cat Complete");
          this.handler.dismissLoading();


        }
      })
  }

  delete(id:string){
    console.log(id);
    this.handler.presentLoading("Deleting...")
    this.deleteCatSub = this.http.delete(environment.URL +'/category/'+ id)
    .subscribe({
      next:(value) => {
        console.log(value);
        this.handler.dismissLoading();
        this.getAllCategories();
        
      },
      error:(error) =>{
        this.handler.dismissLoading();
        this.handler.presentAlert("Error Deleting Category", "ERROr");
      }
    })
  }

}
