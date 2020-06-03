//Gauge Chart
d3.json("samples.json").then(function(sampleData){
    console.log(sampleData);
    console.log(sampleData.wfreq);
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

    var data = [{ 
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
        mode: "gauge+number+delta",

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
