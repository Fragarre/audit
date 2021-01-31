import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import styles from './customers.module.css'
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Edit
} from '@syncfusion/ej2-react-grids';

const RULES_DATA = gql`
 query getCertificationRules {
  getCertificationRules{
    CertRule
  }
}
`;
const App: React.FC = (props) => {
  const {data, loading, error} = useQuery(RULES_DATA);
  if (loading) {
    return <Loading text= 'Loading ' />
  }
  let gridData = data.getCertificationRules;
  return (
      <>
      <Layout />
      
      </>
  );
};

export default App;