import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-filepond",
  templateUrl: "./filepond.component.html",
  styleUrls: ["./filepond.component.css"]
})
export class FilepondComponent implements OnInit {
  @ViewChild("myPond") myPond: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  fileEvent: any = null;
  editor = {
    open: (file, instructions) => {
      // open editor here
      console.log("editor", file, instructions);
      this.imageChangedEvent = this.fileEvent;
      console.log("fileevent check", this.fileEvent);
    },

    // Callback set by FilePond
    // - should be called by the editor when user confirms editing
    // - should receive output object, resulting edit information
    onconfirm: output => {},

    // Callback set by FilePond
    // - should be called by the editor when user cancels editing
    oncancel: () => {},

    // Callback set by FilePond
    // - should be called by the editor when user closes the editor
    onclose: () => {}
  };

  doSth = (event: any) => {
    console.log("herere", event);
    this.fileEvent = event;
  };

  pondOptions = {
    class: "my-filepond",
    multiple: true,
    labelIdle: "Drop files here",
    acceptedFileTypes: "image/jpeg, image/png",
    allowImagePreview: true,
    allowImageCrop: true,
    imageCropAspectRatio: "1:1",
    allowImageEdit: true,
    imageEditEditor: this.editor
  };

  constructor() {}

  ngOnInit() {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("event", event);
  }
  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  pondHandleInit() {
    console.log("FilePond has initialised", this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log("A file was added", event);
  }
}
