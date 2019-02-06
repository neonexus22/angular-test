import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { MatDialog } from "@angular/material";
import { ImageModelComponent } from "./image-model/image-model.component";

@Component({
  selector: "app-image-crop",
  templateUrl: "./image-crop.component.html",
  styleUrls: ["./image-crop.component.css"]
})
export class ImageCropComponent implements OnInit {
  @ViewChild("droppable") droppable: any;

  @Input() aspectRation: string;
  @Input() imageWidth: string;
  @Input() placeholder: string;

  @Output() uploadImageEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("imageInput") imageInput: any;
  imageChangedEvent: any = "";
  showButton: boolean = true;
  imagePreview: any;
  imagePreviewRaw: any;
  constructor(private dialog: MatDialog, private elementRef: ElementRef) {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ImageModelComponent, {
      disableClose: true,
      data: {
        imageChangedEvent: this.imagePreviewRaw,
        aspectRation: this.aspectRation,
        imageWidth: this.imageWidth
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imagePreview = result;
      }
    });
  }

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
    let dt = event.dataTransfer;
    let files = dt.files;
    this.imageChangedEvent = event;
    this.handleImageChange(files[0]);
  };

  onImageChange = (event: any) => {
    this.imageChangedEvent = event;
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

  cancelImage = () => {
    this.imagePreview = "";
    this.imagePreviewRaw = "";
    this.showButton = true;
    this.imageInput.nativeElement.value = "";
  };

  uploadImage = () => {
    const returnData = {
      image: this.imagePreview,
      upload: true
    };
    this.uploadImageEvent.emit(returnData);
  };
}
