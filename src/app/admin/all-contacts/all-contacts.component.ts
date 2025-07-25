import { Component, OnInit } from '@angular/core';
import { AdminService, Contact } from 'src/app/services/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  dataSource = new MatTableDataSource<Contact>();
  displayedColumns: string[] = ['email','phone','company','subject','message'];
  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.service.getContacts().subscribe(data => {
      this.dataSource.data = data;
    })
  }
}
