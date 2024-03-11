// Assign url to variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data, then console log it
d3.json(url).then((data)=> {
    console.log(data);
});

// Initialize Charts
function init() {
    //Create variable for dropdown menu
    let dropMenu = d3.select("#selDataset");

    //Fetch JSON data
    d3.json(url).then((data)=>{

        // Assign names to variable that will be used for dropdown
        let names = data.names;

        //Add sample to dropdown menu
        names.map((name)=>{
            dropMenu.append("option").text(name).property("value", name)
        });

        //Get first value from names variable to use for init charts
        init_value = names[0]

        //Initialize Plots
        barChart(init_value);
        bubbleChart(init_value);
        metaData(init_value);
        gaugeChart(init_value);

    })
};

// Create BarChart
function barChart(values) {
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all sample data
        let sampleInfo = data.samples;

        //Filter based on the id used in the drop down menu
        let value = sampleInfo.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let allData = value[0];

        //Get values needed for bar chart from allData
        let otu_ids = allData.otu_ids;
        let otu_labels = allData.otu_labels;
        let sample_values = allData.sample_values;

        //Check values
        console.log(otu_ids, otu_labels, sample_values);

        // Display items in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //Trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let barData = [trace]

        //Setup layout
        let layout = {
            title: "Top 10 OTUs"
        };

        //Use Plotly to plot chart
        Plotly.newPlot("bar", barData, layout);
    });
};


//Create Bubble Chart
function bubbleChart(values) {
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all sample data
        let sampleInfo = data.samples;

        //Filter based on the id used in the drop down menu
        let value = sampleInfo.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let allData = value[0];

        //Get values needed for bar chart from allData
        let otu_ids = allData.otu_ids;
        let otu_labels = allData.otu_labels;
        let sample_values = allData.sample_values;

        //Trace for the bar chart
        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let bubbleData = [trace]

        //Setup layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        //Use Plotly to plot chart
        Plotly.newPlot("bubble", bubbleData, layout);
    });
};

//Display Demographic Info
function metaData(values){
    //Assign info panel to variable
    let infoPanel = d3.select(".panel-body");

    d3.json(url).then((data)=> {
        //Get all metadata
        let metaData = data.metadata;

        //Filter based on the id used in the drop down menu
        let value = metaData.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let info = value[0];

        //Check data
        console.log(info);

        //Clear info panel to avoid appending new data on old data
        infoPanel.html("")

        //Append metainfo to info panel
        let metaInfo = Object.keys(info).forEach((key)=>{
            console.log(`${key}: ${info[key]}`);
            infoPanel.append("h5").text(`${key}: ${info[key]}`)
        });
    });
};

//Display Gauge Code
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


function optionChanged(value){
    barChart(value);
    bubbleChart(value);
    metaData(value);
    gaugeChart(value);
};

init();
