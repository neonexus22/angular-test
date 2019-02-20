import { Inject, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-img-model",
  templateUrl: "./img-model.component.html",
  styleUrls: ["./img-model.component.css"]
})
export class ImgModelComponent implements OnInit {
  imageUrl: string;
  @ViewChild("cropImage") cropImage: any;
  croppedImage: string = null;
  config = {
    dragMode: "move",
    aspectRatio: this.data.aspectRation,
    zoomable: true,
    movable: true,
    zoomOnWheel: true,
    autoCropArea: 0.5,
    wheelZoomRatio: 0.1,
    cropBoxMovable: true,
    cropBoxResizable: false
  };
  constructor(
    public dialogRef: MatDialogRef<ImgModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.imageUrl = this.data.image;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onZoomIn = () => {
    this.cropImage.cropper.zoom(0.2);
  };
  onZoomOut = () => {
    this.cropImage.cropper.zoom(-0.2);
  };
  onRotateLeft = () => {
    this.cropImage.cropper.rotate(-90);
  };
  onRotateRight = () => {
    this.cropImage.cropper.rotate(90);
  };
  onReset = () => {
    this.cropImage.cropper.reset();
  };
}
