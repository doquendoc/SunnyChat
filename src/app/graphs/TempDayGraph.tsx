/**
 * Sample for Spline series
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  AnnotationsDirective,
  AnnotationDirective,
  ChartAnnotation,
  Legend,
  Category,
  SplineSeries,
  Tooltip,
  ILoadedEventArgs,
  ChartTheme,
  IAnimationCompleteEventArgs,
} from '@syncfusion/ej2-react-charts'
import { Browser, EmitType } from '@syncfusion/ej2-base'

export let data1: any[] = [
  { x: 'Sun', y: 15 },
  { x: 'Mon', y: 22 },
  { x: 'Tue', y: 32 },
  { x: 'Wed', y: 31 },
  { x: 'Thu', y: 29 },
  { x: 'Fri', y: 24 },
  { x: 'Sat', y: 18 },
]
export let data2: any[] = [
  { x: 'Sun', y: 10 },
  { x: 'Mon', y: 18 },
  { x: 'Tue', y: 28 },
  { x: 'Wed', y: 28 },
  { x: 'Thu', y: 26 },
  { x: 'Fri', y: 20 },
  { x: 'Sat', y: 15 },
]
export let data3: any[] = [
  { x: 'Sun', y: 2 },
  { x: 'Mon', y: 12 },
  { x: 'Tue', y: 22 },
  { x: 'Wed', y: 23 },
  { x: 'Thu', y: 19 },
  { x: 'Fri', y: 13 },
  { x: 'Sat', y: 8 },
]
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #charts_Series_0_Point_2_Symbol {
         -webkit-animation: opac 1s ease-out infinite;
         animation: opac 1s ease-out infinite;
     }
 
     #charts_Series_2_Point_0_Symbol {
         -webkit-animation: opac 1s ease-out infinite;
         animation: opac 1s ease-in-out infinite;
     }
 
     @keyframes opac {
         0% {
             stroke-opacity: 1;
             stroke-width: 0px;
         }
         100% {
             stroke-opacity: 0;
             stroke-width: 10px;
         }
     }`

export class Spline extends React.Component<{}, {}> {
  private chartInstance: ChartComponent
  render() {
    return (
      <ChartComponent
        id="charts"
        style={{ textAlign: 'center' }}
        ref={charts => (this.chartInstance = charts)}
        primaryXAxis={{
          valueType: 'Category',
          interval: 1,
          majorGridLines: { width: 0 },
          labelIntersectAction: 'Rotate90',
        }}
        chartArea={{ border: { width: 0 } }}
        load={this.load.bind(this)}
        primaryYAxis={{
          labelFormat: '{value}°C',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
        }}
        tooltip={{ enable: true }}
        title="NC Weather Report - 2016"
        loaded={this.onChartLoad.bind(this)}
        animationComplete={this.animationComplete.bind(this)}
      >
        <Inject services={[SplineSeries, Legend, Category, Tooltip, ChartAnnotation]} />
        <AnnotationsDirective>
          <AnnotationDirective
            content='<div id="chart_cloud"><img src="weather_icon_set/cloud.png" style={{width: 41; height: 41}} /></div>'
            x="Sun"
            y={2}
            coordinateUnits="Point"
            verticalAlignment="Top"
          ></AnnotationDirective>
          <AnnotationDirective
            content='<div id="chart_cloud"><img src="weather_icon_set/sunny.png"   style={{width: 41; height: 41}}/></div>'
            x="Tue"
            y={33}
            coordinateUnits="Point"
            verticalAlignment="Top"
          ></AnnotationDirective>
        </AnnotationsDirective>
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data1}
            xName="x"
            yName="y"
            width={2}
            name="Max Temp"
            type="Spline"
            marker={{ visible: true, width: 10, height: 10 }}
          ></SeriesDirective>
          <SeriesDirective
            dataSource={data2}
            xName="x"
            yName="y"
            width={2}
            name="Avg Temp"
            type="Spline"
            marker={{ visible: true, width: 10, height: 10 }}
          ></SeriesDirective>
          <SeriesDirective
            dataSource={data3}
            xName="x"
            yName="y"
            width={2}
            name="Min Temp"
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
  public animationComplete(args: IAnimationCompleteEventArgs): void {
    this.chartInstance.removeSvg()
    this.chartInstance.animateSeries = false
    this.chartInstance['renderElements']()
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
