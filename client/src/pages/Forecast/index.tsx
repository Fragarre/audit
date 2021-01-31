import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../../components/Layout'
import styles from './forecast.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Filter
} from '@syncfusion/ej2-react-grids';

const FORECAST_DATA = gql`
  query getForecastData{
  getForecastData{
    Month
    AuditRevenues
    Subject
    EventType
    EndClient
    OtherRevenues
    CertRule
  }
}
`;
const App: React.FC = () => {
  const [totalLast, setTotalLast] = useState(0);
  const [auditLast, setAuditLast] = useState(0);
  const [otherLast, setOtherLast] = useState(0);
  // const [isData, setIsData] = useState(false);

  let globalAudit = 0;
  let globalOthers = 0;
  let globalTotal = 0;
  let gridData: {}[] = [];
  const { data, loading } = useQuery(FORECAST_DATA)
  if (loading) {
    console.log("Loading")
  } else {
    console.log(data.getForecastData)
    gridData = [...data.getForecastData]
    gridData.sort((a: any,b: any) => (a.Month > b.Month) ? 1 : ((b.Month > a.Month) ? -1 : 0))
    /*
    for (let g = 0; g < gridData.length; g++) {
      globalAudit = globalAudit + gridData[g].AuditRevenues
      globalOthers = globalOthers + gridData[g].OtherRevenues
      globalTotal = globalAudit + globalOthers
    }
    */
  }
  const handleComplete = (args: any) => {
    globalAudit = 0;
    globalOthers = 0;
    globalTotal = 0;
    let gridData = args.rows
    console.log(' GRID DATA ', gridData)
    for (let i = 0; i < gridData.length; i++) {
      globalOthers = globalOthers + gridData[i].data.OtherRevenues
      globalAudit = globalAudit + gridData[i].data.AuditRevenues
      globalTotal = globalAudit + globalOthers
    }
    setTotalLast(globalTotal);
    setAuditLast(globalAudit);
    setOtherLast(globalOthers);
  }
  // new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(money); // '$100.00'

  return (
    <div>
      <Layout />
      <div className={styles.shortField}>
        <Row>
          <Col>Total Forecasted Revenues</Col>
          <Col>Audit Forecasted Revenues</Col>
          <Col>Other Forecasted Revenues</Col>
        </Row>
        <Row>
          <Col className={styles.showData}>
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalLast)}
          </Col>
          <Col className={styles.showData}>
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(auditLast)}
          </Col>
          <Col className={styles.showData}>
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(otherLast)}
          </Col>
        </Row>
      </div>
      <h5>Filter options</h5>
      <GridComponent dataSource={gridData}
        allowPaging={true}
        allowFiltering={true}
        pageSettings={{ pageSize: 8 }}
        // dataBound={handleDataBound}
        actionComplete={handleComplete}
      >
        <ColumnsDirective>
          <ColumnDirective field='Month' headerText='Month' textAlign='Left' />
          <ColumnDirective field='EventType' headerText='Status' textAlign='Right' width='100' />
          <ColumnDirective field='Subject' headerText='Customer' width='150' />
          <ColumnDirective field='EndClient' headerText='End Client' />
          <ColumnDirective field='CertRule' headerText='Rule' />
          <ColumnDirective field='AuditRevenues' headerText='Audit Revenue' textAlign='Right' width='150' />
          <ColumnDirective field='OtherRevenues' headerText='Other Revenue' textAlign='Right' width='150' />
        </ColumnsDirective>
        <Inject services={[Page, Filter]} />
      </GridComponent>
    </div>
  );
}

export default App;