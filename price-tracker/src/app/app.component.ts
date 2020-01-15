import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'price-tracker';
  shouldRun = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getWeatherForecast().then(forecast => {
      console.log('forecast');
      console.log(forecast);
    });
  }

  clickMe() {
    console.log('you clicked me');
    this.shouldRun = !this.shouldRun;
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
    this.shouldRun = false;
  }
}
