import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import './App.css';
import translations from './translations';

function App() {

    const [records, setRecords] = useState([]);
    const [recordN, setRecordN] = useState(1);

    useEffect(
        () => {
            const rows = translations.split('\n');
            const newRows = [];
            const headers = rows[0].split('\t');
            for (const row of rows.slice(1)) {
                const rowRecord = {};
                let c = 0;
                for (const cell of row.split('\t')) {
                    rowRecord[headers[c]] = cell.replace(/\\n/g, "\n");
                    c++;
                }
                newRows.push(rowRecord);
            }
            setRecords(newRows);
        },
        []
    );

    const maybeDecN = () => {
        if (recordN > 0) {
            setRecordN(recordN - 1);
        }
    }
    const maybeIncN = () => {
        if (recordN < (records.length - 1)) {
            setRecordN(recordN + 1);
        }
    }

    return (
        <div className="App">
            {
                recordN < records.length &&
                <>
                    <h1>
                        <span onClick={() => maybeDecN()}>{"<"}</span>
                        {` ${records[recordN]["From"]} - ${records[recordN]["To"]}`}
                        {` (${records[recordN]["ID"]}) `}
                        <span onClick={() => maybeIncN()}>{">"}</span>
                    </h1>
                    <table>
                        <tbody>
                        {
                            [
                                "Source",
                                "Amazon Cloud",
                                "Amazon Cloud (Informal)",
                                "DeepL",
                                "DeepL (informal)",
                                "Google Cloud",
                                "No Language Left Behind"
                            ]
                                .map(
                                    (f, n) => <tr key={n}>
                                        <td style={{
                                            textAlign: "right",
                                            paddingRight: "20px",
                                            borderRight: "solid 1px black"
                                        }}>
                                            {f}
                                        </td>
                                        <td style={{paddingLeft: "20px"}}>
                                            <ReactMarkdown key={n} children={records[recordN][f]}/>
                                        </td>
                                    </tr>
                                )
                        }
                        </tbody>
                    </table>
                 </>
            }
        </div>
    );
}

export default App;
