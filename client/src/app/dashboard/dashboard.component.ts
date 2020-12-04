import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../auth/login/_services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  comboChartData =  {
    chartType: 'ComboChart',
    dataTable: [
      ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      ['2004/05', 165, 938, 522, 998, 450, 614.6],
      ['2005/06', 135, 1120, 599, 1268, 288, 782],
      ['2006/07', 157, 1167, 587, 807, 397, 323],
      ['2007/08', 139, 1110, 615, 968, 215, 509.4],
      ['2008/09', 136, 691, 629, 1026, 366, 269.6]
    ],
    options: {
      height: 320,
      title: 'Monthly Coffee Production by Country',
      vAxis: { title: 'Cups' },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      bar: {groupWidth: '90%'},
      series: { 5: { type: 'line' } },
      colors: ['#e74c3c', '#2ecc71', '#5faee3', '#0073aa', '#f1c40f', '#e74c3c']
    },
  };
  /*Polar chart*/
  type3 = 'polarArea';
  data3 = {
    datasets: [{
      data: [
        11,
        16,
        7,
        14
      ],
      backgroundColor: [
        '#7E81CB',
        '#1ABC9C',
        '#B8EDF0',
        '#01C0C8'
      ],
      hoverBackgroundColor: [
        '#a1a4ec',
        '#2adab7',
        '#a7e7ea',
        '#10e6ef'
      ],
      label: 'My dataset' // for legend
    }],
    legend: {
      display: false,
    },
    labels: [
      'Blue',
      'Green',
      'Light Blue',
      'Sea Green'
    ]
  };
  options3 = {
    elements: {
      arc: {
        borderColor: ''
      },
      labels: {
        display: false,
      }
    }
  };
  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit() {
    if(!this.authService.getIsAuth()){
        this.router.navigate(['/login'])

    }


    setTimeout( () => {
      /* visitors pie chart*/
      $('.visitor-chart').sparkline([1, 2], {
        type: 'pie',
        width: '100px',
        height: '65px',
        sliceColors: ['#ccc', '#0073aa'],
        tooltipClassname: 'chart-sparkline'
      });
      /* visitor total sale line chart */
      $('.sale-chart').sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 14, 2, 9, 12, 0], {
        type: 'line',
        width: '100%',
        height: '65px',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '50',
        lineColor: '#ccc',
        fillColor: '#ccc'
      });
      /* visitor total revenue chart */
      $('.resource-barchart').sparkline([5, 6, 2, 4, 9, 8, 3, 6, 4, 2], {
        type: 'bar',
        barWidth: '8px',
        height: '50px',
        barColor: '#239a55',
        tooltipClassname: 'abc'
      });

      /*custom line chart*/
      $('.customchart').sparkline([15, 30, 27, 35, 50, 71, 60], {
        type: 'line',
        width: 300,
        height: 300,
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '50',
        lineColor: '#0073aa',
        fillColor: 'rgba(0, 115, 170, 0.5)'
      });

      $('.customchart').sparkline([0, 25, 10, 7, 25, 35, 30], {
        type: 'line',
        width: 300,
        height: 300,
        composite: '!0',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '40',
        lineColor: '#239a55',
        fillColor: 'rgba(35, 154, 85, .5)'
      });
    }, 1);
  }

}
