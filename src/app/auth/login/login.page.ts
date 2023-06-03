import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { HandlerService } from 'src/app/services/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  postSub!: Subscription;

  constructor(private menuCtrl: MenuController,
              private handler: HandlerService,
              private router: Router,
              private data: DataService,
              private http: HttpClient,
              private fb: FormBuilder) {
                this.menuCtrl.enable(false);
                this.loginForm = this.fb.group({
                  email: [, [Validators.required, Validators.email]],
                  password: [, [Validators.required]]
                })
               }

  ngOnInit() {
  }



  onSubmit(){
    
      this.handler.presentLoading("Logging In...");
      this.postSub = this.http.post(environment.URL + '/App/api/v1/Admin/Login', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe({
        next:(value:any) =>{
          console.log(value);
          this.handler.presentToast("Login Successfull");
          this.handler.dismissLoading();
          this.data.set("userId", value['postResponse']['userId']).then(() =>{
            this.router.navigate(['folder', 'home']);

          }).catch((error) =>{
            console.log(error);
            
          })
        },
        error:(error) =>{
          console.log(error);
          this.handler.presentToast(error.message);
          this.handler.dismissLoading();
          
        }
      })
    
  }


}
