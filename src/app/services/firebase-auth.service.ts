import { Injectable } from '@angular/core';
//hago el import de las dependencias de firebase.
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public ngFireAuth: AngularFireAuth) { }
//Creacion del metodo para registrar un usuario con el correo y la contraseña en firebase.
  async registerUser (email:string,password:string ){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

//Creacion de metodo para logearse con correo y contraseña
  async loginUser (email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
  }
//creacion de metodo para recuperar la contraseña de la cuenta
  async resetPassword (email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }
//metodo para cerrar sesion
  async signOut(){
    return await this.ngFireAuth.signOut
  }
}