import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AppService {

  islog;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(log => {      
      if (log) { this.islog = true } else { this.islog =  false }
    });
  }

}

