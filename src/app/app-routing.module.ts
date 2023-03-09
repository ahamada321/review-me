import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { ContactFormModule } from "./contact-form/contact-form.module";
import { PostsModule } from "./posts/posts.module";
import { StaticModule } from "./statics/statics.module";
import { UsersModule } from "./users/users.module";

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
    UsersModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
