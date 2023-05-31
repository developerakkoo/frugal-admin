import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandlerService } from 'src/app/services/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.page.html',
  styleUrls: ['./vehicle-details.page.scss'],
})
export class VehicleDetailsPage implements OnInit {

  _id:any;
  driver:any[] = [];
  getDriversSub!: Subscription;
  constructor(private handler: HandlerService,
      private route:ActivatedRoute,
              private http: HttpClient,) { 
                this._id = this.route.snapshot.paramMap.get("id");
                this.getAllDrivers(this._id);
              }

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.getDriversSub.unsubscribe();
  }

  getAllDrivers(id:any){
    this.handler.presentLoading("Loading...");
    this.getDriversSub = this.http.get(environment.URL +`/App/api/v1/getVehicleByOwnerId/${id}`)
    .subscribe({
      next:(drivers:any) =>{
        console.log(drivers);
        this.driver = drivers['vehicle'];
        this.handler.dismissLoading();
      },
      error:(error) =>{
        this.handler.presentToast("Error...");
        this.handler.dismissLoading();
      }
    })
  }
}
