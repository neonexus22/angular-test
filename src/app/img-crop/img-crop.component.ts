import { ImgModelComponent } from "./img-model/img-model.component";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-img-crop",
  templateUrl: "./img-crop.component.html",
  styleUrls: ["./img-crop.component.css"]
})
export class ImgCropComponent implements OnInit {
  @Input() aspectRation: string;
  @Input() imageWidth: string;
  @Input() placeholder: string;
  @Output() uploadImageEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("imageInput") imageInput: any;

  showButton = true;
  imagePreview: any;
  imagePreviewRaw: any;
  constructor(private dialog: MatDialog, private elementRef: ElementRef) {}

  ngOnInit() {}

  dragEnterFn = event => {
    event.preventDefault();
    event.target.classList.add("add-border");
  };
  dragLeaveFn = event => {
    event.preventDefault();
    event.target.classList.remove("add-border");
  };
  dragOverFn = event => {
    event.preventDefault();
  };
  dropFn = event => {
    event.preventDefault();
    event.target.classList.remove("add-border");
    const dt = event.dataTransfer;
    const files = dt.files;
    this.handleImageChange(files[0]);
  };

  onImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      this.handleImageChange(file);
    }
  };

  handleImageChange = (file: any) => {
    this.showButton = false;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imagePreviewRaw = reader.result;
    };
    reader.readAsDataURL(file);
  };

  cancelImage = (event: any) => {
    this.imagePreview = "";
    this.imagePreviewRaw = "";
    this.showButton = true;
    this.imageInput.nativeElement.value = "";
  };

  openEditDialog = () => {
    const dialogRef = this.dialog.open(ImgModelComponent, {
      disableClose: true,
      data: {
        image: this.imagePreviewRaw,
        aspectRation: this.aspectRation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imagePreview = result.cropper
          .getCroppedCanvas({
            maxWidth: this.imageWidth
          })
          .toDataURL("image/jpeg");
      }
    });
  };
  uploadImage = () => {
    const returnData = {
      image: this.imagePreview,
      upload: true
    };
    this.uploadImageEvent.emit(returnData);
  };
}
