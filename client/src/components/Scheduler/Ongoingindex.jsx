import React, { useState} from 'react'
import history from '../History';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ScheduleComponent, ViewsDirective, ViewDirective, Year, Day, Week, WorkWeek, Month, Agenda, Inject, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DateTimePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useMutation, gql } from '@apollo/client';
import Layout from '../Layout'
import Message from '../Message'
import styles from './scheduler.module.css'

const UPDATE_ITEM = gql`
mutation updateScheduleItem($Id: Int, $input: ScheduleItemInput){
  updateScheduleItem (Id: $Id, input: $input) {
    Subject
    Description
    StartTime
    InitialTime
    EndTime
    EventType
    IsAllDay
    EndClient
    CertRule
    Province
    OtherRevenues
    AuditRevenues
    Parte
  }
}
`;
const ADD_IEM = gql`
mutation newScheduleItem($input: ScheduleItemInput){
  newScheduleItem(input: $input) 
}
`;
const DELETE_ITEM = gql`
mutation deleteScheduleItem ($Id: Int) {
  deleteScheduleItem (Id:$Id)
}`;

const Scheduler = (props) => {
    const customers = [];
    const allCustomer = [];
    const clients = [];
    const provinces = [];
    const rules = [];
    const eventTypes = [];
    let [scheduleItems, setScheduleItems] = useState(props.schedule)
    const arrivedSchedule = props.schedule;
    props.customers.forEach(i => {
        customers.push(i.Short);
        allCustomer.push({ Short: i.Short, Color: i.Color });
    })
    props.clients.forEach(i => {
        clients.push(i.Client)
    })
    props.provinces.forEach(i => {
        provinces.push(i.Province)
    })
    props.eventTypes.forEach(i => {
        eventTypes.push(i.EventType)
    })
    props.rules.forEach(i => {
        rules.push(i.CertRule)
    })
    const [messageFlag, setMessageFlag] = useState(false)
    const [messageContent, setMessageContent] = useState(
        {
            className: '',
            header: '',
            body: ''
        }
    )
    const [updateScheduleItem] = useMutation(UPDATE_ITEM);
    const [newScheduleItem] = useMutation(ADD_IEM);
    const [deleteScheduleItem] = useMutation(DELETE_ITEM)
    let scheduleObj = {}
    const customerTemplate = (args) => {
        let thisColor = '';
        allCustomer.forEach(i => {
            if (args.Subject === i.Short) {
                thisColor = i.Color
            }
        })
        return (
            <div style={{ background: thisColor }}>
                {args.EndClient} - {args.EventType}
            </div>)

    }
    const agendaTemplate = (args) => {
        return (
            <>
                <div className={styles.agendaTemplate}>{args.Subject}</div>
                <div className={styles.agendaTemplate}>{args.EndClient}</div>
            </>)
    }
    const tooltiptemplate = (args) => {
        return (
            <div className={styles.tooltipWrap}>
                <div>
                    {args.Subject} - {args.CertRule}
                </div>
            </div>);
    }
    const handleAddEvent = async (args) => {
        setScheduleItems([...scheduleItems, args]);
        if (!args.AuditRevenues || isNaN(args.AuditRevenues)) {
            args.AuditRevenues = 0;
        } else {
            args.AuditRevenues = parseFloat(args.AuditRevenues)
        }
        if (!args.OtherRevenues || isNaN(args.OtherRevenues)) {
            args.OtherRevenues = 0;
        } else {
            args.OtherRevenues = parseFloat(args.OtherRevenues)
        }
        const {
            Subject,
            Description,
            EventType,
            StartTime,
            EndTime,
            InitialTime,
            IsAllDay,
            EndClient,
            CertRule,
            Province,
            AuditRevenues,
            OtherRevenues,
            Parte
        } = args
        // const StartTime = args.StartTime.toISOString()
        // const EndTime = args.EndTime.toISOString()
        try {
            const { data, loading, error } = await newScheduleItem({
                variables: {
                    input: {
                        Subject,
                        Description,
                        StartTime,
                        EndTime,
                        InitialTime,
                        EventType,
                        IsAllDay,
                        EndClient,
                        CertRule,
                        Province,
                        OtherRevenues,
                        AuditRevenues,
                        Parte
                    }
                }
            })
        } catch (error) {
            setMessageFlag(true)
            setMessageContent({
                className: 'error',
                header: 'Error!',
                body: error.message
            })
            setMessageFlag(false)
        }
    }
    const handleSaveEvent = async (args) => {
        if (!args.AuditRevenues || isNaN(args.AuditRevenues)) {
            args.AuditRevenues = 0;
        } else {
            args.AuditRevenues = parseFloat(args.AuditRevenues)
        }
        if (!args.OtherRevenues || isNaN(args.OtherRevenues)) {
            args.OtherRevenues = 0;
        } else {
            args.OtherRevenues = parseFloat(args.OtherRevenues)
        }
        const {
            Id,
            Subject,
            Description,
            EventType,
            IsAllDay,
            InitialTime,
            EndClient,
            CertRule,
            OtherRevenues,
            AuditRevenues,
            Parte
        } = args
        const StartTime = args.StartTime.toISOString()
        const EndTime = args.EndTime.toISOString()
        let updatedItems = [...scheduleItems]

        let objIndex = updatedItems.findIndex((obj => obj.Id == args.Id));
        updatedItems[objIndex] = args;
        setScheduleItems(updatedItems)

        try {
            const { data } = await updateScheduleItem({
                variables: {
                    Id,
                    input: {
                        Subject,
                        Description,
                        StartTime,
                        EndTime,
                        InitialTime,
                        EventType,
                        IsAllDay,
                        EndClient,
                        CertRule,
                        OtherRevenues,
                        AuditRevenues,
                        Parte
                    }
                }
            })
        } catch (error) {
            setMessageFlag(true)
            setMessageContent({
                className: 'error',
                header: 'Error!',
                body: error.message
            })
            setMessageFlag(false)
        }
    }
    const handleComplete = async (args) => {
        if (args.requestType === "eventRemoved") {
            try {
                const { data, loading, error } = await deleteScheduleItem({
                    variables: {
                        Id: args.deletedRecords[0].Id
                    }
                });
                if (error) {
                    setMessageFlag(true)
                    setMessageContent({
                        className: 'info',
                        header: 'Error!',
                        body: error.message
                    })
                    setMessageFlag(false)
                }
                setScheduleItems([...scheduleItems, args])
                setMessageFlag(true)
                setMessageContent({
                    className: 'info',
                    header: 'Updated!',
                    body: "Activity Deleted"
                })
                setMessageFlag(false)
            } catch (error) {
                const thisErrorMessage = {
                    className: 'error',
                    header: 'Error!',
                    body: error.message
                }
                return (<Message params={thisErrorMessage} />)
            }
        } else {
            return
        }

    }
    const handleEditorTemplate = (args) => {
        return (
            <table className="custom-event-editor" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td className="e-textlabel">Client</td>
                        <td>
                            <DropDownListComponent id="Client"
                                className="e-field"
                                dataSource={customers}
                                placeholder='Choose Client'
                                data-name="Subject"
                                value={args.Subject}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Status</td>
                        <td>
                            <DropDownListComponent id="Event Type"
                                className="e-field"
                                dataSource={eventTypes}
                                placeholder='Choose Status'
                                data-name="EventType"
                                value={args.EventType}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">End Client</td>
                        <td>
                            <DropDownListComponent id="End Client"
                                className="e-field"
                                dataSource={clients}
                                placeHolder='Choose End Client'
                                data-name="EndClient"
                                value={args.EndClien}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Province</td>
                        <td>
                            <DropDownListComponent id="Province"
                                className="e-field"
                                dataSource={provinces}
                                placeHolder='Choose Province'
                                data-name="Province"
                                value={args.EndClien}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Rule</td>
                        <td>
                            <DropDownListComponent id="Rule"
                                className="e-field"
                                dataSource={rules}
                                placeholder='Choose Rule to Certify'
                                data-name="CertRule"
                                value={args.CertRule}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Audit Revenue</td>
                        <td>
                            <input id="AuditRevenues"
                                className="e-field e-input"
                                type="number"
                                placeholder='Audit Revenue'
                                name="AuditRevenues"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Other Revenues</td>
                        <td>
                            <input id="OtherRevenues"
                                className="e-field e-input"
                                type="number"
                                placeholder='Other Revenues'
                                name="OtherRevenues"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">From</td>
                        <td>
                            <DateTimePickerComponent id="from"
                                className="e-field"
                                name="StartTime"
                                value={args.StartTime} format="dd/MM/yyyy">
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">To</td>
                        <td>
                            <DateTimePickerComponent id="to"
                                className="e-field"
                                name="EndTime"
                                value={args.EndTime} format="dd/MM/yyyy">
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Initial Time (If All day)</td>
                        <td>
                            <TimePickerComponent id="time"
                                className="e-field"
                                name="InitialTime"
                                value={args.InitialTime} format="HH:mm">
                            </TimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Full Day</td>
                        <td>
                            <input style={{ width: '5%' }} id="AllDay"
                                className="e-field e-input"
                                type="checkbox"
                                name="IsAllDay"
                                value={args.IsAllDay} />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Report Received</td>
                        <td>
                            <input style={{ width: '5%' }} id="Parte"
                                className="e-field e-input"
                                type="checkbox"
                                name="Parte"
                                value={args.Parte} />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Comments</td>
                        <td>
                            <textarea id="comments"
                                className="e-field e-input"
                                name="Description"
                                rows={2}
                                cols={40}
                                style={{ width: '100%', height: '60px !important', resize: 'vertical' }}
                            >
                            </textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
    const handleFilter = (args) => {

        let filteredItems = [];
        scheduleItems.forEach(i => {
            if (i.Subject === args.itemData.value) {
                filteredItems.push(i)
            }
        })
        setScheduleItems(filteredItems)
    }
    const handleReload = () => {
        setScheduleItems(arrivedSchedule)
    }
    const handleExcel = (e) => {
        e.preventDefault();
        history.push('/downexcel');
    }
    return (
        <>
            <Layout />
            {messageFlag ? <Message params={messageContent} /> : null}
            <ButtonComponent onClick = {handleExcel}>
                <span>Download Excel</span>
            </ButtonComponent>
            <Container fluid="md">
                <Row>
                    {allCustomer.map((value, i) =>
                        <Col
                            key={i}
                            style={{ background: value.Color }}>
                            {value.Short}
                        </Col>)}
                </Row>
            </Container>
            <ScheduleComponent
                ref={t => scheduleObj = t}
                className={styles.frameSched}
                height='480px'
                currentView='Month'
                eventSettings={{
                    dataSource: scheduleItems,
                    template: customerTemplate, enableTooltip: true, tooltipTemplate: tooltiptemplate
                }}
                editorTemplate={handleEditorTemplate}
                addEvent={handleAddEvent}
                saveEvent={handleSaveEvent}
                actionComplete={handleComplete}
                showQuickInfo={true}
                allowDragAndDrop={true}
            >
                <ViewsDirective>
                    <ViewDirective option='Day' startHour='06:00' endHour='21:00' />
                    <ViewDirective option='Week' />
                    <ViewDirective option='Month' />
                    <ViewDirective option='Year' />
                    <ViewDirective option='Agenda' />
                </ViewsDirective>
                <Inject services={[Year, Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
            </ScheduleComponent>
        </>
    )
}
export default Scheduler;

