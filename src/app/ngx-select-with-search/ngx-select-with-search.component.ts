import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { FormControl } from "@angular/forms";

import { MatSelect } from "@angular/material";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-ngx-select-with-search",
  templateUrl: "./ngx-select-with-search.component.html",
  styleUrls: ["./ngx-select-with-search.component.css"]
})
export class NgxSelectWithSearchComponent implements OnInit {
  @Input() items: any[];
  @Input() placeholder: string;

  /** control for the selected bank */
  public itemCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public itemFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredItems: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @ViewChild("singleSelect") singleSelect: MatSelect;

  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    // set initial selection
    // this.itemCtrl.setValue(this.items[10]);

    // load the initial bank list
    this.filteredItems.next(this.items.slice());

    // listen for search field value changes
    this.itemFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
      });
  }

  handleChangeEvent = (event: any) => {
    this.selectedItem.emit(event.value);
  };

  /**
   * Sets the initial value after the filteredItems are loaded initially
   */
  protected setInitialValue() {
    this.filteredItems
      .pipe(
        take(1),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredItems are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) =>
          a && b && a.id === b.id;
      });
  }

  protected filterItems() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.itemFilterCtrl.value;
    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredItems.next(
      this.items.filter(item => item.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
