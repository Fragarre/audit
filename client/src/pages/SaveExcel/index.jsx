import React from 'react';
import history from '../../components/History';
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useQuery, gql } from '@apollo/client';
import { uri_api } from '../../localConfig/config';
import { downloadExcel } from '../../localConfig/apiFunctions';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';


const ITEMS_EXCEL = gql`
  query getExcelData {
    getExcelData{
      Subject
      StartTime
      CertRule
      Parte
      EventType
      Province
      Description
      EndClient
      InitialTime
    }
}
`;
const App = (props) => {
  let toSend = [];
  let toSave = {};
  let flag = false;
  let flagFin = false;
  let flagSelect = false;
  let optionsCustomer = [];
  const { data, loading } = useQuery(ITEMS_EXCEL);
  if (loading) {
    return <Loading text='Loading data' />
  } else {
    toSend = data.getExcelData
    data.getExcelData.forEach(d => {
      optionsCustomer.push(d.Subject)
    })
    optionsCustomer = optionsCustomer.filter((v, i, a) => a.indexOf(v) === i);
  }
  const handleChange = (e) => {
    toSave = {
      customer: e.itemData.value,
      data: toSend
    }
  }
  const handleConfirmed = (e) => {
    e.preventDefault();
    flag = true;
    if (!toSave || Object.keys(toSave).length === 0) {
      console.log('NO HAY DATOS')
      flagSelect = true;
    }
    console.log('FLAG ', flagSelect)
    downloadExcel(uri_api, toSave)
      .then(data => {
        console.log('STATUS ', data.request.status)
        axios({
          // url: 'http://localhost:4000/api/getfile', //your url
          url: uri_api + '/getfile',
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'ScheduleDownloaded.xlsx'); //or any other extension
          document.body.appendChild(link);
          link.click();
          flag = false
          history.push('/schedule');
        });
      })
      .catch(error => {
        console.log(error)
      });

  }
  return (
    <>
      <Layout />
      <div style={{ margin: '20px', width: '40%' }}>
        <h4 >Download Excel Planning </h4>
        <h6 style={{ marginTop: '20px' }}>Choose Customer </h6>
        <DropDownListComponent
          id="ddlelement"
          dataSource={optionsCustomer}
          change={handleChange}
        />
        <ButtonComponent
          style={{ marginTop: '20px' }}
          onClick={handleConfirmed} >Confirm selection</ButtonComponent>
      </div>
      { flag ? (
        <div style={{ marginTop: '40px' }}>
          <Loading text='Downmloading file ...' />
        </div>
      ) : null}
      { flagFin ? <Link to="/downexcel"></Link> : null}

    </>);
}

export default App;
/*
{ready ? <Loading text = 'Wait, building excel file' />: null}
*/