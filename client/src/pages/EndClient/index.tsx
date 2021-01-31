import * as React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './endclient.module.css'
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Edit,
  EditSettingsModel,
  Toolbar,
  ToolbarItems
} from '@syncfusion/ej2-react-grids';
import { createCheckBox } from '@syncfusion/ej2-react-buttons';

const GET_ENDCLIENTS = gql`
query getEndClients {
  getEndClients{
    id
    Client
    Kilometers
  }
}`;
const NEW_ENDCLIENT = gql`
mutation newEndClient($input: EndClientInput){
  newEndClient(input: $input)
}`;
const UPDATE_ENCLIENT = gql`
mutation editEndClient($id: ID, $input: EndClientInput){
  editEndClient(id:$id, input:$input)
}`;
const DELETE_ENDCLIENT = gql`
mutation deleteEndClient ($id: ID){
  deleteEndClient (id: $id)
}`;
const GET_RULES = gql`
query getCertificationRules{
  getCertificationRules{
    id
    CertRule
  }
}`;
const EDIT_RULE = gql`
mutation editCertificationRule ($id: ID, $input: CertificationRuleInput){
  editCertificationRule(id: $id, input: $input)
}`;
const DELETE_RULE = gql`
mutation deleteCertificationRule ($id: ID){
  deleteCertificationRule(id:$id)
}`;
const GET_EVENTS = gql`
query getEventTypes {
  getEventTypes{
    EventType
    id
  }
}`;
/*
const EDIT_EVENT = gql`
`;
const DELETE_EVENT = gql`
`;
*/
const App: React.FC = (props) => {
  const endClients = useQuery(GET_ENDCLIENTS);
  const [addEndClient] = useMutation(NEW_ENDCLIENT);
  const [removeEndClient] = useMutation(DELETE_ENDCLIENT);
  const [editEndClient] = useMutation(UPDATE_ENCLIENT)
  let receivedClients = []
  let receivedrules = []
  let receivedevents = []
  if (endClients.loading) {
    return <Loading text='Loading' />
  } else {
    receivedClients = [...endClients.data.getEndClients]
  }
  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal',
    showDeleteConfirmDialog: true
  };
  const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const handleEndClientActionComplete = async (args: any) => {
    if (args.requestType === 'save' && args.action === 'add') {
      addEndClient({
        variables:{
          input:{
            Client: args.data.Client,
            Kilometers: args.data.Kilometers
          }
        }
      })
      .then(receivedData => {
        window.alert ('Record Added!. Update table at refresh')
      }).catch(error => {
        window.alert ('Error! ' + error.message)
      })
    }
    if (args.requestType === 'delete') {
      removeEndClient({
        variables:{
          id: args.data[0].id
        }
      })
      .then(receivedData => {
        window.alert ('Record Deleted!. Update table at refresh')
      }).catch(error => {
        window.alert ('Error! ' + error.message)
      })
    }
    if (args.requestType === 'save' && args.action === 'edit') {
      editEndClient({
        variables:{
          id: args.data.id
          }
      })
      .then(receivedData => {
        window.alert ('Record Updated!. Update table at refresh')
      }).catch(error => {
        window.alert ('Error! ' + error.message)
      })
    }
  }
  return (
    <>
      <Layout />
      <div className={styles.endClientTitleContainer}></div>
      <div className={styles.endClientComponent}>
        <h5>End Clients</h5>
        <GridComponent dataSource={receivedClients}
          allowPaging={true}
          pageSettings={{ pageSize: 8 }}
          editSettings={editOptions}
          toolbar={toolbarOptions}
          actionComplete={handleEndClientActionComplete}
        >
          <ColumnsDirective>
            <ColumnDirective field='Client' headerText='Client' textAlign='Left' />
            <ColumnDirective field='Kilometers' headerText='Kilometers' textAlign='Left' width='100' />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar]} />
        </GridComponent>
      </div>
    </>
  );
};

export default App;

