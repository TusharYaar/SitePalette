    var chart = new CanvasJS.Chart("data1", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        title:{
            text: "Basic Column Chart"
        },
        backgroundColor: "transparent",
        data: [
        {
            type: "column",
            dataPoints: [
                { label: "apple",  y: 10  },
                { label: "orange", y: 15  },
                { label: "banana", y: 25  },
                { label: "mango",  y: 30  },
                { label: "grape",  y: 28  }
            ]
        }
        ]
    });
    var chart2 = new CanvasJS.Chart("data2", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title:{
            text: "Email Categories",
            horizontalAlign: "left"
        },
        data: [{
            type: "doughnut",
            startAngle: 40,

            //innerRadius: 60,
            indexLabelFontSize: 11,
            dataPoints: [
                { y: 67, label: "Inbox" },
                { y: 28, label: "Archives" },
                { y: 10, label: "Labels" },
                { y: 7, label: "Drafts"},
                { y: 15, label: "Trash"},
                { y: 6, label: "Spam"}
            ]
        }]
    });
    var chart3 = new CanvasJS.Chart("data3", {
        animationEnabled: true,
        backgroundColor: "transparent",
        theme: "light2",
        title:{
            text: "Simple Line Chart"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                { y: 450 },
                { y: 414},
                { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
                { y: 460 },
                { y: 450 },
                { y: 500 },
                { y: 480 },
                { y: 480 },
                { y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
                { y: 500 },
                { y: 480 },
                { y: 510 }
            ]
        }]
    });
    var chart4 = new CanvasJS.Chart("data4", {
        animationEnabled: true,  
        backgroundColor: "transparent",
        data: [{
            type: "spline",
            dataPoints: [
                {x: new Date(2002, 0), y: 2506},
                {x: new Date(2003, 0), y: 2798},
                {x: new Date(2004, 0), y: 3386},
                {x: new Date(2005, 0), y: 6944},
                {x: new Date(2006, 0), y: 6026},
                {x: new Date(2007, 0), y: 2394},
                {x: new Date(2008, 0), y: 1872},
                {x: new Date(2009, 0), y: 2140},
                {x: new Date(2010, 0), y: 7289},
                {x: new Date(2011, 0), y: 4830},
                {x: new Date(2012, 0), y: 2009}
            ]
        }]
    });
chart4.render();    
chart3.render();  
chart.render();
chart2.render();
    