import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SubscriptionFormModule } from "../shared/subscription-form/subscription-form.module";
import { LandingComponent } from "./landing/landing.component";
import { TermsComponent } from "./terms/terms.component";
import { TermsTextModule } from "./terms/helpers/terms-text/terms-text.module";

const routes: Routes = [
  { path: "landing", component: LandingComponent },
  //   { path: 'aboutus', component: AboutusComponent },
  { path: "terms", component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },
  //   { path: 'maintenance', component: MaintenanceComponent },

  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [LandingComponent, TermsComponent],
  exports: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionFormModule,
    TermsTextModule,
  ],
})
export class StaticModule {}
