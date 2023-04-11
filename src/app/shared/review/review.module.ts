import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReviewComponent } from "./review.component";
import { ReviewService } from "./service/review.service";

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ReviewComponent],
  providers: [ReviewService],
})
export class ReviewModule {}
