function gaugeChart(values){
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all metadata
        let metaData = data.metadata;

        //Filter based on the id used in the drop down menu
        let value = metaData.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let info = value[0];

        //Assign washfrequency to variable
        let washFrq = info.wfreq

        //Check Value
        console.log(`CHECK WASH FREQUENCY = ${washFrq}`)

        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1]},
                value: washFrq,
                title: {text: "Wash Frequency"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [null, 9], tickwidth: 1, tickcolor: "black"},
                    steps: [
                        {range: [0, 1],color: "lightgrey"},
                        {range: [1, 2],color: "lightgrey"},
                        {range: [2, 3],color: "lightgrey"},
                        {range: [3, 4],color: "lightgrey"},
                        {range: [4, 5],color: "lightgrey"},
                        {range: [5, 6],color: "lightgrey"},
                        {range: [6, 7],color: "lightgrey"},
                        {range: [7, 8],color: "lightgrey"},
                        {range: [8, 9],color: "lightgrey"},
                    ],
                    bar: {color: "rgb(31,119,180)"},
                    bordercolor: "white",             
                },
                
            }
        ]

        let layout = { 
            width: 600, 
            height: 400, 
            margin: { t: 0, b: 0 },
            font: {color: "rgb(51,51,51)", family:"monospace"},
         };
         
        //Use Plotly to plot chart
        Plotly.newPlot("gauge", gaugeData, layout);
    });
};