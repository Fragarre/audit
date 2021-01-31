import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import * as React from 'react';
import Layout from '../Layout'

export default class App extends React.Component {
  constructor() {
    super(...arguments);
    this.data = [
      { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
      { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
    ];
    this.tooltip = { enable: true, shared: false };
    this.primaryyAxis = { labelFormat: '${value}K' };
    this.primarxyAxis = { valueType: 'Category' };
    this.legendSettings = { visible: true };
    this.marker = { dataLabel: { visible: true } };
  }
  render() {
    return (<div className='control-pane'>
      <Layout />
      <div className="row justify-content-center mt-5 p-0">

      </div>
      <div className='control-section'>
        <ChartComponent id="charts" primaryXAxis={this.primarxyAxis} legendSettings={this.legendSettings} primaryYAxis={this.primaryyAxis} tooltip={this.tooltip}>
          <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={this.data} xName='month' yName='sales' name='Sales' marker={this.marker} />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>)
      ;
  }
};