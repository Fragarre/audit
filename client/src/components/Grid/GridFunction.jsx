import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Sort, Filter, Group } from '@syncfusion/ej2-react-grids';
import { GridItem } from './GridItem';
import Layout from '../Layout'

const GridFunction = () => {

    return (
        <>
            <div className='control-pane'>
                <Layout />
                <div className="row justify-content-center mt-5 p-0">
                </div>
                <div className='control-section'>
                    <GridComponent dataSource={GridItem} allowPaging={true} pageSettings={pageSettings}
                        filterSettings={this.filterSettings}
                        allowSorting={true} sortSettings={this.sortSettings} allowFiltering={true} height={380}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' width='100' textAlign="Right" />
                            <ColumnDirective field='CustomerID' width='100' />
                            <ColumnDirective field='EmployeeID' width='100' textAlign="Right" />
                            <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right" />
                            <ColumnDirective field='ShipCountry' width='100' />
                        </ColumnsDirective>
                        <Inject services={[Page, Sort, Filter, Group]} />
                    </GridComponent>
                </div>
            </div>
        </>
    );
}

export default GridFunction;