import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FilepondComponent } from "./filepond/filepond.component";

// import filepond module
import { FilePondModule, registerPlugin } from "ngx-filepond";

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import { ImageCropperModule } from "ngx-image-cropper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SelectWithSearchComponent } from "./select-with-search/select-with-search.component";
import { MaterialModule } from "./material.module";
import { TestComponent } from "./test/test.component";
import { NgxSelectWithSearchComponent } from "./ngx-select-with-search/ngx-select-with-search.component";
import { NgxTestComponent } from "./ngx-test/ngx-test.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ImageCropComponent } from "./image-crop/image-crop.component";
import { ImageModelComponent } from "./image-crop/image-model/image-model.component";
import { FileDropModule } from "ngx-file-drop";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit
);

@NgModule({
  declarations: [
    AppComponent,
    FilepondComponent,
    SelectWithSearchComponent,
    TestComponent,
    NgxSelectWithSearchComponent,
    NgxTestComponent,
    ImageModelComponent,
    ImageCropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilePondModule,
    ImageCropperModule,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FileDropModule
  ],
  providers: [],
  entryComponents: [ImageModelComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
