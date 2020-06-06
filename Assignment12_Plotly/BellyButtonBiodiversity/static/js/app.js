// d3.json('samples.json').then(function(sampleData){
//     console.log('hello');
//   });

// function testing(id) {
//     d3.json('samples.json').then(function(sampleData) {
//         console.log(sampleData);
//         console.log(sampleData.metadata);
//         console.log(sampleData.metadata.map(s => s.id));
//         console.log(typeof(sampleData.metadata.map(s => s.id)[0]));
//         console.log(id);
//         console.log(typeof(id));
//     });
// };
// testing();

function getPlots(id) {
    //BAR CHART
    d3.json("samples.json").then(function(sampleData){
    var selectedSample = sampleData.samples[sampleData.samples.map(s => s.id).indexOf(id)];
    console.log(selectedSample);
    var ids = selectedSample.otu_ids;
    var sampleValues = selectedSample.sample_values.slice(0,10);
    var labels = selectedSample.otu_labels.slice(0,10);
    var OTU_top_id = ids.slice(0, 10);
    var Top_id_string = OTU_top_id.map(d => "OTU " + d);
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
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        mode: "markers",
        marker: {
            size: selectedSample.sample_values,
            color:selectedSample.otu_ids
        },
        text: selectedSample.otu_labels
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
// function getGauge(id) {
//     //GAUGE CHART       
//     d3.json("samples.json").then(function(sampleData){
//         console.log(sampleData)
//         let metadata_ids = sampleData.metadata.map(s => s.id);
//         let index_of_id = metadata_ids.indexOf(parseInt(id));  
//         var selectedMetadata = sampleData.metadata[index_of_id];
//         console.log(selectedMetadata)
//     var wfreq = selectedMetadata.wfreq;
//         console.log(wfreq)
//     var data = [{
//             values: [
//                 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50
//             ],
//             rotation: 90,
//             text: [
//                 '8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'
//             ],
//             textinfo: "text",
//             textposition: "inside",
//             marker: {
//                 colors:['rgba(10, 20, 0, .5)','rgba(44, 157, 10, .5)', 'rgba(110, 184, 42, .5)',
//                 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                 'rgba(242, 226, 202, .5)','rgba(252, 236, 202, .5)',
//                 'rgba(255, 255, 255, 0)']
//             },
//             labels: [
//                 '8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'
//             ],
//             hoverinfo: "label",
//             hole: .5,
//             type: "indicator", 
//             mode: "gauge",
//             showlegend: false
//           }];
//         var layout = {
//             title: 'Belly Button Washing Frequency<br>Scrubs per Week',
//             width: 600, 
//             height: 450, 
//             margin: { t: 0, b: 0 } };
//         Plotly.newPlot('gauge', data, layout);
// });
// }
// getGauge();

function getInfo(id) {
    d3.json("samples.json").then(function(sampleData){
        console.log('sampleData Loaded!', sampleData);
        var sample_metadata = d3.select("#sample-metadata");
        let metadata_ids = sampleData.metadata.map(s => s.id);
        let index_of_id = metadata_ids.indexOf(parseInt(id));  
        var selectedMetadata = sampleData.metadata[index_of_id];
        console.log('info loaded?', selectedMetadata)
        console.log(metadata_ids);
        console.log(index_of_id);
        sample_metadata.html("");
        Object.entries(selectedMetadata).forEach(([key, value]) => {
            sample_metadata.append('p').text(`${key}: ${value}`);
        });
    })
};
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    var pickedSample = d3.select("#selDataset").node().value;
    console.log(pickedSample)
    getPlots(pickedSample);
    getInfo(pickedSample);
    // testing(pickedSample);
}
function init() {
    var dropdown = d3.select("#selDataset");
    dropdown.on('change', optionChanged);
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