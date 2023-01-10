import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpBiritacoComponent } from './lp-biritaco/lp-biritaco.component';
import { LpHamadalabComponent } from './lp-hamadalab/lp-hamadalab.component';
import { SubscriptionFormModule } from '../shared/subscription-form/subscription-form.module';
import { MembershipComponent } from './membership/membership.component';

const routes: Routes = [
  { path: '', component: LpBiritacoComponent },
  { path: 'hamadalab', component: LpHamadalabComponent },
  { path: 'membership', component: MembershipComponent },
  //   { path: 'aboutus', component: AboutusComponent },
  //   { path: 'terms', component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },

  //   { path: 'maintenance', component: MaintenanceComponent },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    LpBiritacoComponent,
    LpHamadalabComponent,
    MembershipComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionFormModule,
  ],
  exports: [],
  providers: [],
})
export class StaticModule {}
