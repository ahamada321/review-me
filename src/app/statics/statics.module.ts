import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LpBiritacoComponent } from "./lp-biritaco/lp-biritaco.component";
import { LpHamadalabComponent } from "./lp-hamadalab/lp-hamadalab.component";
import { SubscriptionFormModule } from "../shared/subscription-form/subscription-form.module";
import { MembershipComponent } from "./membership/membership.component";
import { LandingComponent } from "./landing/landing.component";
import { MyBestTeacherComponent } from "./my-best-teacher/my-best-teacher.component";
import { TermsComponent } from "./terms/terms.component";

const routes: Routes = [
  { path: "landing", component: LandingComponent },
  { path: "hamadalab", component: LpHamadalabComponent },
  { path: "membership", component: MembershipComponent },
  { path: "my-best-teacher", component: MyBestTeacherComponent },
  //   { path: 'aboutus', component: AboutusComponent },
  { path: "terms", component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },
  //   { path: 'maintenance', component: MaintenanceComponent },

  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    LandingComponent,
    LpBiritacoComponent,
    LpHamadalabComponent,
    MembershipComponent,
    MyBestTeacherComponent,
    TermsComponent,
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
