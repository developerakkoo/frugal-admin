import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HandlerService } from 'src/app/services/handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  constructor(private menuCtrl: MenuController,
              private handler: HandlerService,
              private router: Router,
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
    this.router.navigate(['folder', 'home']);
  }


}
