import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShareInfo } from 'src/app/services/shareService/shares.service';

@Component({
  selector: 'app-share-card',
  templateUrl: './share-card.component.html',
  styleUrls: ['./share-card.component.css']
})
export class ShareCardComponent {
  @Input()
  shares: ShareInfo[] = [];

  @Output()
  viewShareDetails: EventEmitter<ShareInfo> = new EventEmitter<ShareInfo>();

  onClick(share: ShareInfo) {
    this.viewShareDetails.emit(share);
  }

}
