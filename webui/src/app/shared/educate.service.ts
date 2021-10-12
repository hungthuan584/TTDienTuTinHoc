import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Educate } from '../models/Educate';

@Injectable({
  providedIn: 'root'
})
export class EducateService {

  constructor(private afs: AngularFirestore) { }

  getEducates(): Observable<Educate[]> {
    // return this.afs.collection<Educate>("educates").valueChanges();

    return this.afs.collection<Educate>("educates")
      .snapshotChanges()
      .pipe(
        map((changes: any) => changes.map((c: any) =>
          ({
            id: c.payload.doc.id,
            ...c.payload.doc.data()
          })
        ))
      );
  }

}
