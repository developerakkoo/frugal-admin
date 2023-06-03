import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  adminId:any;

  users:any[] = [];

  getOwnersSub!:Subscription;
  putRequestSub!:Subscription;

  constructor(private http: HttpClient,
    private route:ActivatedRoute,
    private data: DataService,
              private loadingController: LoadingController) { 
                this.getOwners();
              }

  async ngOnInit() {
    this.adminId = await this.data.get('userId');
    console.log(`Admin id is ${this.adminId}`);
    
  }


  ionViewDidLeave(){
    console.log("Requeest Left");
    this.getOwnersSub.unsubscribe();
    this.putRequestSub.unsubscribe();

    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }
  getOwners(){
    this.presentLoading();
    this.http.get(environment.URL + '/App/api/v1/get/owners')
    .subscribe({
      next:(users:any) =>{
        console.log(users);
        this.users = users['Vowner'];
        this.loadingController.dismiss()
        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }

  acceptRequest(id:any){
    this.presentLoading();
    this.http.put(environment.URL +'/accept/owner/ReqForEditEnable',{
      ownerId: id,
      adminId:this.adminId
    }).subscribe({
      next:(value:any) =>{
        console.log(value);
        this.loadingController.dismiss();
        this.getOwners();
        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();        
      }
    });
  }
}
