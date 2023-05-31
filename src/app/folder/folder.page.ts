import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandlerService } from '../services/handler.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMapsPage } from '../google-maps/google-maps.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  catForm!: FormGroup;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  isHome: boolean = true;
  isCustomer: boolean = false;
  isPartner: boolean = false;
  isVehicleAdd: boolean = false;

  capacity!: string;
  modeltype!: string;
  rates!: string;

  file!: File;
  partners: any[] = [];
  customers: any[] = [];
  getAllPartnerSub!: Subscription;
  getAllCustomerSub!: Subscription;
  constructor(private router: Router,
    private handler: HandlerService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.menuCtrl.enable(true);
    
  }




  ionViewDidLeave() {
    this.getAllPartnerSub.unsubscribe();
    this.getAllCustomerSub.unsubscribe();
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.folder == "home") {
      console.log("home");
      this.isHome = true;
      this.isCustomer = false;
      this.isPartner = false;

    }

    else if (this.folder == "partners") {
      console.log("partner");
      this.isCustomer = false;
      this.isHome = false;
      this.isPartner = true;
      this.getAllPartnersVehicles();

    }

    else if (this.folder == "customers") {
      console.log("customer");
      this.isCustomer = true;
      this.isHome = false;
      this.isPartner = false;
      this.getAllCustomers();
    }

    else if (this.folder == "add-vehicles") {
      console.log("vehicle add");
      this.catForm = this.fb.group({
        category: [, [Validators.required]],
        model: [, [Validators.required]],
        rate: [, [Validators.required]],
        capacity: [, [Validators.required]],
        monthlySubscription: [, [Validators.required]]
      })
      this.isCustomer = false;
      this.isHome = false;
      this.isPartner = false;
      this.isVehicleAdd = true;
    }
  }

  getAllCustomers(){
    this.getAllCustomerSub = this.http.get(environment.URL + '/App/api/v1/all/user').subscribe({
      next: (value: any) => {
        console.log(value);
        this.customers = value['savedUser'];
      },
      error: (error: any) => {
        console.log(error);

      },
      complete: () => {
        console.log("Complete");

      }
    })
  }

  getAllPartnersVehicles() {
    this.getAllPartnerSub = this.http.get(environment.URL + '/App/api/v1/get/vehicle').subscribe({
      next: (value: any) => {
        console.log(value);
        this.partners = value['vehicle']

      },
      error: (error: any) => {
        console.log(error);

      },
      complete: () => {
        console.log("Complete");

      }
    })
  }

  async presentModal(driverId:string) {
    const modal = await this.modalController.create({
    component: GoogleMapsPage,
    backdropDismiss: false,
    componentProps: { value: driverId }
    });
  
    await modal.present();
  
  }

  openGoogleMapsModel(id:any){
    console.log(id);
    this.presentModal(id);
    
  }

  openVehiclePage(){
    this.router.navigate(['folder','add-vehicles', 'add-vehicles']);
  }
  save(id: string, cap: any, model: any, rate: any) {


    console.log(cap);
    console.log(model);
    console.log(rate);

    this.http.put(environment.URL + `/App/api/v1/updateVehicle/admin/${id}`, {
      Capacity: cap,
      modelType: model,
      Rate: rate
    }).subscribe({
      next: (value: any) => {
        console.log(value);

      },
      error: (error: any) => {
        console.log(error);

      },
      complete: () => {
        console.log("Update complete");

      }
    })
  }


  view(path: string) {
    console.log(path);

  }

  block(id:any){

  }

  fileEvent(ev: any) {
    console.log(ev.target.files[0]);
    this.file = ev.target.files[0];

  }

  onSubmit() {
    this.handler.presentLoading("Adding Category...");
    let formdata = new FormData();

    formdata.append("category", this.catForm.value.category);
    formdata.append("model", this.catForm.value.model);
    formdata.append("rate", this.catForm.value.rate);
    formdata.append("capcity", this.catForm.value.capacity);
    formdata.append("monthlySubscription", this.catForm.value.monthlySubscription);
    formdata.append("file", this.file, this.file.name);

    console.log(this.catForm.value);
    this.http.post(environment.URL + '/category', formdata)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.handler.dismissLoading();
          this.handler.presentToast("Category Added Successfully")
        },
        error: (error) => {
          this.handler.dismissLoading();
          this.handler.presentAlert("Something went wrong!", "ERROR")
        },
        complete: () => {
          console.log("Complete");

        }
      })


  }

}
