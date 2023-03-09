import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { ContactFormModule } from "./contact-form/contact-form.module";
import { PostsModule } from "./posts/posts.module";
import { StaticModule } from "./statics/statics.module";

const routes: Routes = [];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
    StaticModule,
    AuthModule,
    ContactFormModule,
    PostsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
