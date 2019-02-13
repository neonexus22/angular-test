import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[NumberOnly]"
})
export class NumberOnlyDirective {
  constructor(private hostElement: ElementRef) {}
  @Input() maxAllowedNumber: number;
  allowedNumber: number;

  @HostListener("keyup", ["$event"]) onChange(e) {
    const value = this.hostElement.nativeElement.value;
    if (value <= this.maxAllowedNumber) {
      this.hostElement.nativeElement.value = value;
      this.allowedNumber = value;
    } else {
      this.hostElement.nativeElement.value = this.allowedNumber;
    }
  }
}
