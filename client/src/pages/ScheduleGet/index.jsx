import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Scheduler from '../../components/Scheduler';
import Loading from '../../components/Loading';

const SCHEDULED_ITEMS = gql`
query getScheduleItems {
  getScheduleItems {
    Id
    Subject
    Description
    StartTime
    EndTime
    InitialTime
    EventType
    IsAllDay
    EndClient
    CertRule
    Province
    Valid
    OtherRevenues
    AuditRevenues
    Parte
  }
}
`;
const CUSTOMER_SHORT = gql`
query getCustomers {
  getCustomers{
    Short
    Color
  }
}
`;
const ENDCLIENTS = gql`
query getEndClients {
  getEndClients {
    Client
  }
}
`;
const PROVINCES = gql`
query getProvinces {
  getProvinces {
    Province
  }
}
`;
const CERTRULES = gql`
query getCertificationRules {
  getCertificationRules{
    CertRule
  }
}
`;
const EVENT_TYPES = gql`
query getEventTypes{
  getEventTypes{
    EventType
    Code
  }
}
`;

const ScheduleGet = () => {
  let finish = false
  const scheduleItems = useQuery(SCHEDULED_ITEMS)
  const customerOptions = useQuery(CUSTOMER_SHORT)
  const clientOptions = useQuery(ENDCLIENTS)
  const provinceOptions = useQuery(PROVINCES)
  const rulesOptions = useQuery(CERTRULES)
  const eventTypeOptions = useQuery(EVENT_TYPES)
  let toSend = {};
  let scheduleItemsToSend = []

  if (customerOptions.loading || clientOptions.loading || scheduleItems.loading || provinceOptions.loading || rulesOptions.loading || eventTypeOptions.loading) {
    return <Loading />
  } else {
    finish = false
    if (scheduleItems.data === undefined || scheduleItems.data.length === 0) {
      scheduleItemsToSend = []
    } else {
      scheduleItems.data.getScheduleItems.forEach(i => {
        scheduleItemsToSend.push(
          {
            Id: i.Id,
            Subject: i.Subject,
            Description: i.Description,
            StartTime: new Date(+i.StartTime),
            EndTime: new Date(+i.EndTime),
            InitialTime: i.InitialTime,
            IsAllDay: i.IsAllDay,
            EndClient: i.EndClient,
            EventType: i.EventType,
            CertRule: i.CertRule,
            Province: i.Province,
            Valid: new Date(+i.Valid),
            OtherRevenues: i.OtherRevenues,
            AuditRevenues: i.AuditRevenues,
            Parte: i.Parte
          }
        )
      })
    }
    
    toSend = {
      schedule: scheduleItemsToSend,
      customers: customerOptions.data.getCustomers,
      clients: clientOptions.data.getEndClients,
      provinces: provinceOptions.data.getProvinces,
      rules: rulesOptions.data.getCertificationRules,
      eventTypes: eventTypeOptions.data.getEventTypes
    }
    finish = true
  }

  return (
    <>
      {finish ? <Scheduler
        clients={toSend.clients}
        customers={toSend.customers}
        schedule={toSend.schedule}
        provinces={toSend.provinces}
        rules={toSend.rules}
        eventTypes={toSend.eventTypes}
      /> : null}
    </>
  );
}

export default ScheduleGet;
