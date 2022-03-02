import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
  }

  apiUrl = environment.apiURL;

  redirect(userType:string){
    this.entryService.entry(userType);
  }

}
