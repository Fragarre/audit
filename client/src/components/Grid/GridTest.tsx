import React from 'react';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Edit,
  EditSettingsModel,
  Toolbar,
  ToolbarItems,
  IEditCell
} from '@syncfusion/ej2-react-grids';
import { IOrderModel } from './orderModel';
import { DialogFormTemplate } from './DialogFormTemplate';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import data from './dataSource.json';


const App: React.FC = () => {
  const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog',
  template: dialogTemplate }; //mode: Normal, Dialog
  const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete'];
  const numericParams: IEditCell = { params: { decimals: 3, format: 'C' } };
  const ddParams: IEditCell = { params: { value: 'Germany' } };

  function editTemplate(args: any) {
    return (<MaskedTextBoxComponent value= {args.PhoneNumber} mask='000-000-0000' id='PhoneNumber' />);
  }

  function dialogTemplate(props: IOrderModel): any {
    return (<DialogFormTemplate {...props} />);
  }

  return (
    <div style={{ margin: '10%', marginTop: '5%' }}>
      <h1>Editing</h1>
      <GridComponent dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 6 }}
        editSettings={editOptions}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Invoice ID' textAlign='Right' width='100' isPrimaryKey={true} />
          <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
          <ColumnDirective field='ShipCountry' headerText='Ship Country' editType='dropdownedit' edit={ddParams} />
          <ColumnDirective field='ShipName' headerText='Ship Name' />
          <ColumnDirective field='Freight' textAlign='Right' format='C2' width='150' editType='numericedit' edit={numericParams} />
          <ColumnDirective field='OrderDate' headerText='OrderDate' type='date' format='yMd' width='150' editTemplate={editTemplate} />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default App;