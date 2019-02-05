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
  @Input() modelWidth: string;

  @Output() croppedImageEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadImageEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("imageInput") imageInput: any;
  imageChangedEvent: any = "";
  showButton: boolean = true;
  imagePreview: any;
  constructor(private dialog: MatDialog, private elementRef: ElementRef) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageModelComponent, {
      disableClose: true,
      data: {
        imageChangedEvent: this.imageChangedEvent,
        aspectRation: this.aspectRation,
        imageWidth: this.imageWidth,
        modelWidth: this.modelWidth
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imagePreview = result;
      }
      this.croppedImageEvent.emit(this.imagePreview);
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log("here", this.droppable);
    this.droppable.nativeElement.ondrop = event => {
      console.log("new event", event);
    };
    // console.log(
    //   this.elementRef.nativeElement
    //     .querySelector(".image-container")
    //     .addEventListener("drop", (event: any) => {
    //       console.log("file event", event);
    //     })
    // );
  }

  handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      this.imageChangedEvent = event;
      this.showButton = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  cancelImage = () => {
    this.imagePreview = "";
    this.showButton = true;
    this.imageInput.nativeElement.value = "";
  };

  uploadImage = () => {
    this.uploadImageEvent.emit(true);
  };
}
