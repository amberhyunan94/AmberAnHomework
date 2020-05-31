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

    //Gauge Chart
    d3.json("samples.json").then(function(sampleData){
        console.log(sampleData);
        console.log(sampleData.WFREQ);
        
        if (guage_data.WFREQ === null) { guage_data.WFREQ = 0;} 
        var level = (guage_data.WFREQ/9)*180;
        var degrees = 180 - level,
        radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'WFREQ',
            text: level,
            hoverinfo: 'name'
        },
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50],
        rotation: 90,
        text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(10, 20, 0, .5)','rgba(44, 157, 10, .5)', 'rgba(110, 184, 42, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                                'rgba(242, 226, 202, .5)','rgba(252, 236, 202, .5)',
                                'rgba(255, 255, 255, 0)']},
        labels: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: 'Belly Button Washing Frequency<br>Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);

    });
}
  
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

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown
                .append("option")
                .text(name)
                .property("value", name);
        });

        getPlots(data.names[0]);
        getInfo(data.names[0]);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    getPlots(newSample);
    getInfo(newSample);
}

init();