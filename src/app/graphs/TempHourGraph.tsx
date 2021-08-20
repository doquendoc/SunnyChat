/**
 * Sample for Range Area Series
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  ChartComponent,
  SeriesCollectionDirective,
  DateTime,
  SeriesDirective,
  Inject,
  Category,
  SplineRangeAreaSeries,
  ILoadedEventArgs,
  ChartTheme,
  Tooltip,
  Legend,
} from '@syncfusion/ej2-react-charts'
import { Browser } from '@syncfusion/ej2-base'

export let data: any[] = [
  { x: 'Jan', high: 14, low: 4 },
  { x: 'Feb', high: 17, low: 7 },
  { x: 'Mar', high: 20, low: 10 },
  { x: 'Apr', high: 22, low: 12 },
  { x: 'May', high: 20, low: 10 },
  { x: 'Jun', high: 17, low: 7 },
  { x: 'Jul', high: 15, low: 5 },
  { x: 'Aug', high: 17, low: 7 },
  { x: 'Sep', high: 20, low: 10 },
  { x: 'Oct', high: 22, low: 12 },
  { x: 'Nov', high: 20, low: 10 },
  { x: 'Dec', high: 17, low: 7 },
]
export let data1: any[] = [
  { x: 'Jan', high: 29, low: 19 },
  { x: 'Feb', high: 32, low: 22 },
  { x: 'Mar', high: 35, low: 25 },
  { x: 'Apr', high: 37, low: 27 },
  { x: 'May', high: 35, low: 25 },
  { x: 'Jun', high: 32, low: 22 },
  { x: 'Jul', high: 30, low: 20 },
  { x: 'Aug', high: 32, low: 22 },
  { x: 'Sep', high: 35, low: 25 },
  { x: 'Oct', high: 37, low: 27 },
  { x: 'Nov', high: 35, low: 25 },
  { x: 'Dec', high: 32, low: 22 },
]
const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`

interface IProps {}

export class SplineRangeArea extends React.Component<{}, {}> {
  private chartInstanceRange: ChartComponent

  render() {
    return (
      <ChartComponent
        id="chart"
        ref={chart => (this.chartInstanceRange = chart)}
        style={{ textAlign: 'center' }}
        load={this.load.bind(this)}
        primaryXAxis={{
          valueType: 'Category',
          edgeLabelPlacement: 'Shift',
          majorGridLines: { width: 0 },
        }}
        primaryYAxis={{
          labelFormat: '{value}˚C',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minimum: 0,
          maximum: 40,
        }}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
        title="Monthly Temperature Range"
        loaded={this.onChartLoad.bind(this)}
      >
        <Inject services={[SplineRangeAreaSeries, Category, DateTime, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            border={{ width: 2 }}
            xName="x"
            high="high"
            opacity={0.4}
            marker={{ visible: false }}
            low="low"
            animation={{ enable: true }}
            name="England"
            type="SplineRangeArea"
          ></SeriesDirective>
          <SeriesDirective
            dataSource={data1}
            border={{ width: 2 }}
            xName="x"
            high="high"
            opacity={0.4}
            marker={{ visible: false }}
            low="low"
            animation={{ enable: true }}
            name="India"
            type="SplineRangeArea"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    )
  }
  public onChartLoad(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('charts')
    chart.setAttribute('title', '')
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1]
    selectedTheme = selectedTheme ? selectedTheme : 'Material'
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
      /-dark/i,
      'Dark',
    ) as ChartTheme
  }
}
