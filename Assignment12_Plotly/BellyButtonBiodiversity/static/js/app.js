function getPlots(id) {
    //BAR CHART
    d3.json("samples.json").then(function(sampleData){
    console.log(sampleData);
    var ids = sampleData.samples[0].otu_ids;
    console.log(ids)
    var sampleValues = sampleData.samples[0].sample_values.slice(0,10);
    console.log(sampleValues)
    var labels = sampleData.samples[0].otu_labels.slice(0,10);
    console.log(labels)
    var OTU_top_id = ids.slice(0, 10);
    console.log(OTU_top_id)
    var Top_id_string = OTU_top_id.map(d => "OTU " + d);
    console.log(Top_id_string)

    var trace1 = {
        x: sampleValues.reverse(),
        y: Top_id_string,
        text: labels,
        name: "Top 10 OTU ID's",
        type: "bar",
        orientation:"h"
    };
    
    var data = [trace1];

    var layout = {
        title: "Top 10 OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 30
        }
      };      
    Plotly.newPlot("bar", data, layout);

    //BUBBLE CHART
    var trace2 = {
        x: sampleData.samples[0].otu_ids,
        y: sampleData.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: sampleData.samples[0].sample_values,
            color:sampleData.samples[0].otu_ids
        },
        text: sampleData.samples[0].otu_labels
    };

    var layout2 = {
        xaxis: {
            title: "OTU ID"
        },
        height: 600,
        width: 1000
    };
    var data2 = [trace2];

Plotly.newPlot("bubble", data2,layout2);
    });
}

function getGauge(id) {
    //GAUGE CHART       
    d3.json("samples.json").then(function(sampleData){
        console.log(sampleData)
    var wfreq = sampleData.metadata[0].wfreq;
        console.log(wfreq)

    var data = [{
            values: [
                50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50
            ],
            rotation: 90,
            text: [
                '8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'
            ],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors:['rgba(10, 20, 0, .5)','rgba(44, 157, 10, .5)', 'rgba(110, 184, 42, .5)',
                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                'rgba(242, 226, 202, .5)','rgba(252, 236, 202, .5)',
                'rgba(255, 255, 255, 0)']
            },
            labels: [
                '8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'
            ],
            hoverinfo: "label",
            hole: .5,
            type: "pie",
            showlegend: false
          }];
        
        var layout = {
            title: 'Belly Button Washing Frequency<br>Scrubs per Week',
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
});
}

getGauge();

function getInfo(id) {

    d3.json("samples.json").then(function(sampleData){
        console.log(sampleData);
        var demoInfo = sampleData.metadata[0];
        console.log(demoInfo)
        var sample_metadata = d3.select("#sample-metadata");
        console.log(sample_metadata)
        sample_metadata.html("");

        Object.entries(demoInfo).forEach(([key, value]) => {
            sample_metadata.append('p').text(`${key}: ${value}`);
        });
    })
};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    getPlots(newSample);
    getInfo(newSample);

}


function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown
                .append("option")
                .text(name)
                .property("value");
        });

        getPlots(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();