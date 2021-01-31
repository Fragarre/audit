import * as React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import styles from './customers.module.css'
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

const GET_CUSTOMERS = gql`
query getCustomers {
  getCustomers {
    id
    Name
    Nif
    Address
    Place
    Province
    Short
    PostalCode
    Country
    Vat
    Ret
    Color
  }
}
`;
const UPDATE_CUSTOMER = gql`
mutation editCustomer($id: ID, $input: CustomerInput){
  editCustomer(id: $id, input: $input)
}
`;
const DELETE_CUSTOMER = gql`
mutation deleteCustomer($id: ID){
  deleteCustomer(id: $id)
}
`;
const NEW_CUSTOMER = gql `
mutation newCustomer ($input: CustomerInput) {
  newCustomer(input: $input)
}
`;

const App: React.FC = (props) => {
  const [editCustomer] = useMutation(UPDATE_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const [addCustomer] = useMutation(NEW_CUSTOMER);

  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal',
    showDeleteConfirmDialog: true
  };
  const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const { data, loading } = useQuery(GET_CUSTOMERS);
  if (loading) {
    return <Loading text='Loading ' />
  }
  let gridData = [...data.getCustomers]
  const handleActionComplete = async (args: any) => {
    if (args.requestType === 'save') {
      const id = args.data.id;
      const thisData = { ...args.data };
      editCustomer({
        variables: {
          id: id,
          input: {
            Name: thisData.Name,
            Short: thisData.Short,
            Nif: thisData.Nif,
            Address: thisData.Address,
            Place: thisData.Place,
            Province: thisData.Province,
            Country: thisData.Country,
            Vat: thisData.Vat,
            Ret: thisData.Ret,
            PostalCode: thisData.PostalCode,
            Color: thisData.Color,
          }
        }
      })
      .then((r: any) => {
        window.alert('Removed!. Will be updated when refresh')
      })
      .catch(error => {
        window.alert(error.message)
      })
    }
    if (args.requestType === 'delete') {
      const id = args.data[0].id;
      try {
        // eslint-disable-next-line
        const received = await deleteCustomer({
          variables: {
            id: id
          }
        })
      } catch (error) {
        window.alert(error.message)
      }
    }
    if(args.requestType === 'save' && args.action === 'add') {
      try{
        // eslint-disable-next-line
        const received = await addCustomer({
          variables:{
            input: args.data
          }
        })
        window.alert('Created!. Will be updated when refresh')
      }catch(error){
        window.alert(error.message)
      }
    }
  }
  return (
    <>
      <Layout />
      <h4 className={styles.centerme}>Customers</h4>
      <GridComponent dataSource={gridData}
        allowPaging={true}
        pageSettings={{ pageSize: 10 }}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective field='Name' headerText='Name' textAlign='Left' width='200' />
          <ColumnDirective field='Nif' headerText='NIF/CIF' textAlign='Right' width='100' />
          <ColumnDirective field='Address' headerText='Address' width='200' />
          <ColumnDirective field='Place' headerText='Town' width='100' />
          <ColumnDirective field='Province' headerText='Province' width='100' />
          <ColumnDirective field='Short' headerText='Short Name' textAlign='Right' width='100' />
          <ColumnDirective field='PostalCode' headerText='Postal Codde' textAlign='Right' width='100' />
          <ColumnDirective field='Color' headerText='Color' textAlign='Right' width='100' />
          <ColumnDirective field='Vat' headerText='VAT (0.xx)' textAlign='Right' width='100' />
          <ColumnDirective field='Ret' headerText='Retention (0.xx)' textAlign='Right' width='100' />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default App;
