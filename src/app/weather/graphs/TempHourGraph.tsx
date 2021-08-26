/**
 * Sample for Inversed Spline series
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  SplineSeries,
  Tooltip,
  ILoadedEventArgs,
  ChartTheme,
} from '@syncfusion/ej2-react-charts'
import { Browser, EmitType } from '@syncfusion/ej2-base'

export let data1: any[] = [
  { x: 'Jan', y: -1 },
  { x: 'Mar', y: 12 },
  { x: 'Apr', y: 25 },
  { x: 'Jun', y: 31 },
  { x: 'Aug', y: 26 },
  { x: 'Oct', y: 14 },
  { x: 'Dec', y: 8 },
]
export let data2: any[] = [
  { x: 'Jan', y: 7 },
  { x: 'Mar', y: 2 },
  { x: 'Apr', y: 13 },
  { x: 'Jun', y: 21 },
  { x: 'Aug', y: 26 },
  { x: 'Oct', y: 10 },
  { x: 'Dec', y: 0 },
]
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`

interface IProps {
  avrgList?: string[]
}

export class SplineInversed extends React.Component<IProps, {}> {
  render() {
    return (
      <ChartComponent
        id="charts"
        style={{ textAlign: 'center' }}
        isTransposed={true}
        primaryXAxis={{
          valueType: 'Category',
          interval: 1,
          labelIntersectAction: 'Rotate90',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
        }}
        load={this.load.bind(this)}
        chartArea={{ border: { width: 0 } }}
        primaryYAxis={{ labelFormat: '{value}°C', majorGridLines: { width: 0 } }}
        tooltip={{ enable: true }}
        title="Temperature per Hour"
        loaded={this.onChartLoad.bind(this)}
      >
        <Inject services={[SplineSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={this.props.avrgList}
            xName="x"
            yName="y"
            width={3}
            name="Hours"
            type="Spline"
            marker={{ visible: true, width: 10, height: 10 }}
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
