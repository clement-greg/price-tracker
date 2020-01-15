import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newTestName: string;
  testItems: any[];
  saving = false;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshTestItems();
  }

  private async refreshTestItems() {
    this.testItems = await this.apiService.getTestItems();
  }

  async save() {
    this.saving = true;
    await this.apiService.saveTestItem({name: this.newTestName});

    this.saving = false;
    this.newTestName = '';
    this.refreshTestItems();
  }

  async deleteItem(item) {
    await this.apiService.deleteTestItem(item.id);
    this.refreshTestItems();

    const snackBarRef = this.snackBar.open('Test Item Deleted','Undo', {duration: 15000});
    snackBarRef.onAction().subscribe(()=> {
      this.apiService.saveTestItem(item).then(()=> {
        this.refreshTestItems();
      });
    });
  }
}
