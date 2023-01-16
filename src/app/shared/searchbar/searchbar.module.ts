import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchbarComponent } from "./searchbar.component";

@NgModule({
  declarations: [SearchbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SearchbarComponent],
  providers: [],
})
export class SearchbarModule {}
