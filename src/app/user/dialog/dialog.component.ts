import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareInformation } from 'src/app/services/shareService/shares.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  quantity = 1;
  total1 = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public shareInfo: ShareInformation) { }

  ngOnInit(): void {
    this.total1 = this.shareInfo.currentPrice
  }

  total(){
    this.total1 = this.quantity * this.shareInfo.currentPrice;
  }
}
