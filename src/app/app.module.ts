import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getApp, initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { getFirestore, initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { FamilleService } from './services/famille/famille.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FamilleListPage } from './famille-list/famille-list.page';
import { HomePage } from './home/home.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MembreDetailPageModule } from './membre-detail/membre-detail.module';
import { MembreDetailPage } from './membre-detail/membre-detail.page';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
  providers: [
/*     FamilleService, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => initializeFirestore(getApp(), {ignoreUndefinedProperties : true})), */
  {provide : RouteReuseStrategy, useClass : IonicRouteStrategy},],
  bootstrap: [AppComponent],
})
export class AppModule {}
