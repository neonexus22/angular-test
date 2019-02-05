import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ngx-test",
  templateUrl: "./ngx-test.component.html",
  styleUrls: ["./ngx-test.component.css"]
})
export class NgxTestComponent implements OnInit {
  selector = "viewValue";
  items = [
    { name: "Bank A (Switzerland)", id: "A" },
    { name: "Bank B (Switzerland)", id: "B" },
    { name: "Bank C (France)", id: "C" },
    { name: "Bank D (France)", id: "D" },
    { name: "Bank E (France)", id: "E" },
    { name: "Bank F (Italy)", id: "F" },
    { name: "Bank G (Italy)", id: "G" },
    { name: "Bank H (Italy)", id: "H" },
    { name: "Bank I (Italy)", id: "I" },
    { name: "Bank J (Italy)", id: "J" },
    { name: "Bank Kolombia (United States of America)", id: "K" },
    { name: "Bank L (Germany)", id: "L" },
    { name: "Bank M (Germany)", id: "M" },
    { name: "Bank N (Germany)", id: "N" },
    { name: "Bank O (Germany)", id: "O" },
    { name: "Bank P (Germany)", id: "P" },
    { name: "Bank Q (Germany)", id: "Q" },
    { name: "Bank R (Germany)", id: "R" }
  ];
  ngOnInit() {}

  selectedItem = (event: any) => {
    console.log("received", event);
  };
}
