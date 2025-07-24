import { Component, OnInit } from '@angular/core';
import { SharesService, Share } from '../../services/shareService/shares.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';
import { User, UserService } from '../../services/userService/user.service';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.css']
})
export class ShareDetailComponent implements OnInit {
  currShare: Share[] = [];
  LineChart: any;
  shareInfo: any;
  showModal: boolean = false;
  quantity: number = 1;
  currPrice: number = 0;
  total1: number = 0;
  loading: boolean = true;
  userData: User | null = null;

  constructor(public service: SharesService, private user: UserService) { }

  ngOnInit(): void {
    this.user.getUserData();
    this.service.getInfo().subscribe(data => {
      this.shareInfo = data;
      this.currPrice = this.shareInfo.currentPrice;
      this.total1 = this.currPrice;
      console.log("Share Info", data);
    })
    this.service.getData().subscribe((data: Share[]) => {
      this.currShare = data;
      console.log("Share Prices", data);
      this.loading = false;

      const labels = this.currShare.map(item => new Date(item.Date).toLocaleDateString());
      const closePrices = this.currShare.map(item => item.Close);

      this.LineChart = new Chart('linechart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Close Price',
              data: closePrices,
              fill: false,
              borderColor: 'green',
              borderWidth: 1,
              pointRadius: 4,
              pointHoverRadius: 6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Share Close Prices Over Time'
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${label}:${value}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    });
  }

  filterData(range: '1m' | '3m' | '6m' | '1y') {
    const today = new Date();
    let fromDate = new Date();

    switch (range) {
      case '1m':
        fromDate.setMonth(today.getMonth() - 1);
        break;
      case '3m':
        fromDate.setMonth(today.getMonth() - 3);
        break;
      case '6m':
        fromDate.setMonth(today.getMonth() - 6);
        break;
      case '1y':
        fromDate.setMonth(today.getMonth() - 12);
    }

    const filtered = this.currShare.filter(item => {
      const itemDate = new Date(item.Date);
      return itemDate >= fromDate;
    });

    const labels = filtered.map(item => new Date(item.Date).toLocaleDateString());
    const closePrices = filtered.map(item => item.Close);

    this.updateChart(labels, closePrices);
  }

  updateChart(labels: string[], data: number[]) {
    if (this.LineChart) {
      this.LineChart.data.labels = labels;
      this.LineChart.data.datasets[0].data = data;
      this.LineChart.update();
    }
  }


  openModal() {
    if (localStorage.length > 0) {
      this.showModal = true;
    } else {
      alert("Login before buying shares");
    }
  }

  closeModal() {
    this.showModal = false;
  }

  total() {
    this.total1 = this.quantity * this.currPrice;
  }


  sellNow(symbol: any, price: number) {
    if (this.quantity < 1) {
      alert("Add some shares to sell")
    } else {
      this.service.sell(symbol, this.quantity, price).subscribe({
        next: (res) => {
          this.user.getUserData();
          alert("Successfully sold shares");
          this.showModal = false;
        },
        error: (err) => console.error(err)
      })
    }
  }


  buyNow(symbol: any, price: number) {
    console.log(symbol);
    console.log(this.quantity);
    if (this.quantity < 1) {
      alert("Add some shares to buy")
    }
    if (this.user.userData.balance < this.total1) {
      alert("Insufficient Balance")
    } else {
      const new_bal = this.user.userData.balance - this.total1;
      this.service.order(symbol, this.quantity, price).subscribe({
        next: (res) => {
          this.user.getUserData();
          alert("Successfully bought shares");
          this.showModal = false;
        },
        error: (err) => console.error(err)
      })
      this.user.updateBalance(new_bal).subscribe({
        next: (res) => console.log("Shares bought and updated balance", res),
        error: (err) => {
          console.error(err);
          alert("Error uploading balance")
        }
      })
    }
  }


}