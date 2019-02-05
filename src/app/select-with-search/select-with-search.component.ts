import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSelectChange } from "@angular/material";

@Component({
  selector: "app-select-with-search",
  templateUrl: "./select-with-search.component.html",
  styleUrls: ["./select-with-search.component.css"]
})
export class SelectWithSearchComponent implements OnInit {
  @Input() placeholder: String;
  @Input() items: any[];
  @Input() selector: string;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

  selectForm: FormGroup = null;
  filteredItem: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.selectForm = this.formBuilder.group({
      item: [null],
      filterItemInput: [null]
    });
    this.filteredItem = this.items;
  }

  filterSelect = (event: any) => {
    this.filteredItem = this.items;
    const value = event.target.value.toLowerCase();
    const newItems = this.items.filter(
      item => item[this.selector].toLowerCase().indexOf(value) > -1
    );
    this.filteredItem = newItems;
  };

  itemChanged = (event: MatSelectChange) => {
    this.filteredItem = this.items;
    this.selectForm.patchValue({
      filterItemInput: ""
    });
    this.selectedItem.emit(event.value);
  };
}
