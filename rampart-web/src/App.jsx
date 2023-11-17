import {useState} from 'react';
import Editor from './Editor.jsx'
import {Handler as TooltipHandler} from 'vega-tooltip';
import {VegaLite} from 'react-vega';
import './App.css'
import {parse, queryPointList, queryPoint} from './parser.js';

function App() {
    const spec = {
        width: 600,
        height: 300,
        mark: {type: 'line', tooltip: true},
        encoding: {
            x: {field: 'time', type: 'temporal', timeUnit: 'minutes'},
            y: {field: 'power', type: 'quantitative'},
        },
        data: {name: "A"}
    };

    const [data, setData] = useState({});

    function handleChange(content) {
        let parsed = parseContent(content);
        setData(parsed);
    }


    function parseContent(content) {
        const tree = parse(content + "\n\n");
        const pointLists = queryPointList.captures(tree.rootNode);

        if (pointLists.length === 0) {
            console.log("no point lists");
            return;
        }

        let pointListNode = pointLists[0].node;
        let pointCaptures = queryPoint.captures(pointListNode)

        let points = [];
        for (let pointCapture of pointCaptures) {
            let pointNode = pointCapture.node;

            let timeText = pointNode.childForFieldName("time").text;
            // TODO: parse properly
            // let timeMinutes = Number.parseInt(timeText);
            let timeInput = `0000-00-00 00:${timeText.padStart(2, '0')}:00`

            let powerText = pointNode.childForFieldName("power").text;
            // TODO: parse properly
            let powerMW = Number.parseFloat(powerText);

            points.push({time: timeInput, power: powerMW});
        }

        return {"A": points}
    }

    return (<>
        <Editor onContentChange={handleChange}/>
        <VegaLite
            spec={spec}
            data={data}
            renderer='svg'
        />
    </>);
}

export default App
