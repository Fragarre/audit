import React from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];



const App = () => {
    return (
        <ExcelFile filename="schedule" hideElement = {true} wrapText={true} >
            <ExcelSheet data={dataSet} name="Employees"  >
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Wallet Money" value="amount" wrapText={true}/>
                <ExcelColumn label="Gender" value="sex" wrapText={true}/>
                <ExcelColumn label="Marital Status"
                    value={(col) => col.is_married ? "Married" : "Single"} wrapText={true}/>
            </ExcelSheet>
        </ExcelFile>
    );
}

export default App;