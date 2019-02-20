import { ImageCropComponent } from "./image-crop/image-crop.component";
import { TestComponent } from "./test/test.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SelectWithSearchComponent } from "./select-with-search/select-with-search.component";
import { NgxTestComponent } from "./ngx-test/ngx-test.component";
import { NgxSelectWithSearchComponent } from "./ngx-select-with-search/ngx-select-with-search.component";
import { ImgCropComponent } from "./img-crop/img-crop.component";

const routes: Routes = [
  { path: "select", component: SelectWithSearchComponent },
  { path: "test", component: TestComponent },
  { path: "ngx-select", component: NgxSelectWithSearchComponent },
  { path: "ngx-test", component: NgxTestComponent },
  { path: "image-crop", component: ImageCropComponent },
  { path: "crop-test", component: ImgCropComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
