import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  base64Image: any;
  blob: any;
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient) {}
  ngOnInit() {}

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = decodeURI(dataURI.split(",")[1]);

    // separate out the mime component
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  uploadImageEvent = (event: any) => {
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.image);
    this.blob = this.dataURItoBlob(event.image);
    const formData = new FormData();
    formData.append("imageFile", this.blob, "some_name");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaXRlQGdtYWlsLmNvbSIsInNjb3BlcyI6WyJST0xFX0FHRU5UIiwiUk9MRV9PV05FUiIsIlJPTEVfUFJFTUlVTV9BR0VOVCJdLCJpZGVudGlmaWVyIjoiU3RCalQzVFY1U2ROOWorVURUNVNsQT09IiwicGFyZW50X2lkZW50aWZpZXIiOiJ5OVpHc0RhRjJyV1l3dzlKU3dVb09nPT0iLCJ1c2VyX2lkIjoiSTVqaW5NVjF6TGxDeUdRdlpWNGx2Zz09Iiwib3JnYW5pemF0aW9uX2lkIjoiMGxzdWVWL0o3YjJuM2JOM21aVFNDdz09IiwiZXhwIjoxNTQ5OTk4Mjc5fQ.YqV1VFgLV9U2tHjj9_UP-8MQYtf_r3gmOo1soPKAK4L8l5UEtUFo0tKYJLIyrVcMZcLtFiBzlwt9IBCqFR8ykA"
      })
    };
    this.http
      .post(
        "http://developer.hopto.org:8080/api/v1/agent/auth/jobs/image",
        formData,
        httpOptions
      )
      .subscribe(response => console.log("here is response", response));
  };
}
