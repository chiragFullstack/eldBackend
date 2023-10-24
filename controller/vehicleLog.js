const conn=require('../connection');
const bcrypt = require('bcrypt');

const PDFDocument = require('pdfkit');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const ChartJS = require('chart.js');


const getvehicleLogbyUserId=async(req,res)=>{
    const {userId} =req.query;
    const conn_ = await conn.getConnection();
    const checkUsers = "select 	* from vehicle_logs where userid=?";
    //const checkUsers = "select * from tblAttendence";
   const usersValues = [parseInt(userId)];
    const [resultsLog] = await conn_.execute(checkUsers,usersValues);
    if(resultsLog.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        res.status(200).json({
            statusCode: 200,
            message: 'Vehicle Log Record',
            data:resultsLog,
            status: true
        });
    }
}

const getVehicleLogRecordbyDate=async(req,res)=>{
    const {userId, fromdate, todate} =req.query;
    const conn_ = await conn.getConnection();
    const checkUsers = "select * from vehicle_logs where userid=? && created_datetime>=? && created_datetime<=? order by created_datetime DESC";
    //const checkUsers = "select * from tblAttendence";
   const usersValues = [parseInt(userId), fromdate,todate];
    const [resultsLog] = await conn_.execute(checkUsers,usersValues);
    if(resultsLog.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        res.status(200).json({
            statusCode: 200,
            message: 'Vechicle Log Record ',
            data:resultsLog,
            status: true
        });
    }
}

const generateGraph=async(req,res)=>{
    const width = 800;
    const height = 400;
    
const chartCallback = () => {
    // Create a new Chart.js instance
    const chart = new ChartJS(width, height);
  
    // Create your line chart data here
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My Line Dataset',
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
    const config = {
        type: 'line',
        data: data,
        options: {
          plugins: {
            beforeDraw: (chart, options) => {
              const ctx = chart.ctx;
              ctx.fillStyle = 'white'; // Background color
              ctx.fillRect(0, 0, chart.width, chart.height);
            },
          },
        },
      };
      chart.render(config);
    };
     
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    (async () => {
    const image = await chartJSNodeCanvas.renderToBuffer();
    require('fs').writeFileSync('lineGraph.jpg', image);
    })();
}

const generateLogReport=async(req,res)=>{
    try{
        console.log(req.query);
        const {userId} =req.query;
        // Create a new PDF document
        const doc = new PDFDocument();
        const randomInt = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

        let fName='reports/report-'+userId+'-'+randomInt+'.pdf';
        const stream = fs.createWriteStream(fName);
        doc.pipe(stream);
    
        doc.font('Helvetica');
        doc.fontSize(12);
        doc.text('Database Records in PDF Table', { align: 'center' });
        doc.moveDown();
       
        const conn_ = await conn.getConnection();
        const checkUsers = "select * from vehicle_logs where userid=?";
        //const checkUsers = "select * from tblAttendence";
       const usersValues = [parseInt(userId)];
        const [resultsLog] = await conn_.execute(checkUsers,usersValues);
        if(resultsLog.length==0){
             res.status(200).json({
                statusCode: 200,
                message: 'Record Not matched',
                data: [],
                status: false
            });
        }else{
              // Define table headers
        const tableHeader = ['Status', 'location', 'created_datetime'];
        // Set the initial position for the table
        let tableX = 50; // X-coordinate
        let tableY = 200; // Y-coordinate

        // Set the padding between table cells
        const cellPadding = 10;
        
    // Draw the table headers
    tableHeader.forEach((header, index) => {
        doc.text(header, tableX + index * 100, tableY, { width: 100, align: 'center' });
    });
  resultsLog.forEach((row, rowIndex) => {
    tableY += 30; // Adjust the Y-coordinate for the next row
    doc.text(row.reason.toString(), tableX, tableY, { width: 100, align: 'center' });
    doc.text(row.location, tableX + 100, tableY, { width: 100, align: 'center' });
    doc.text(row.created_datetime, tableX + 200, tableY, { width: 300, align: 'center' });
  });
          // Finalize the PDF and save it
          doc.end();
        console.log(resultsLog);
            res.status(200).json({
                statusCode: 200,
                message: 'Vechicle Log Record ',
                data:resultsLog,
                status: true
            });
        }
    }catch(error){
        console.log(error.message);
    }
}



const generateLogReportWithPdf=async(req,res)=>{
    try{
        const htmlTemplate = fs.readFileSync('./index.html', 'utf8');
        console.log(req.query);
        const {userId} =req.query;
        // Create a new PDF document
        const doc = new PDFDocument();
        const randomInt = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

        const conn_ = await conn.getConnection();
        const checkUsers = "select vehicle_logs.userid,vehicle_logs.reason,vehicle_logs.created_datetime,vehicle_logs.odometer,vehicle_logs.location,tbluser_details.firstname,tbluser_details.lastname,tbluser_details.license_no,tbluser_details.phone_no  from vehicle_logs inner join tbluser_details on tbluser_details.user_id=vehicle_logs.userid where vehicle_logs.userid=?";
        //const checkUsers = "select * from tblAttendence";
       const usersValues = [parseInt(userId)];
        const [resultsLog] = await conn_.execute(checkUsers,usersValues);
        if(resultsLog.length==0){
             res.status(200).json({
                statusCode: 200,
                message: 'Record Not matched',
                data: [],
                status: false
            });
        }else{
            let tableRow='';
            let tableDriverdata='';
            resultsLog.forEach((row, rowIndex) => {
                tableRow+=`<tr key=${rowIndex}><td>${row.reason}</td><td>${row.created_datetime.toLocaleTimeString('en-US', { hour12: true })}</td><td>${row.odometer}</td><td>${row.location}</td></tr>`;
                tableDriverdata=`<tr key=${rowIndex}><td>${row.firstname+' '+row.lastname}</td><td>${row.userid}</td><td>${row.license_no}</td><td>${row.phone_no}</td></tr>`;
            });
            
            
            const finalHTML =await htmlTemplate.replace('{{tableData}}', tableRow).replace('{{tableDriverData}}', tableDriverdata);
            await fs.writeFileSync('output.html', finalHTML);

            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
              
                await page.setContent(finalHTML);
                await page.pdf({ path: 'output.pdf', format: 'A4' });
              
                await browser.close();
            
                console.log('PDF created successfully');
            })();

            console.log(resultsLog);
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Vechicle Log Record ',
                        data:resultsLog,
                        status: true
                    });
        }
    }catch(error){
        console.log(error.message);
    }
}


module.exports={
    getvehicleLogbyUserId,getVehicleLogRecordbyDate,generateLogReport,generateGraph,generateLogReportWithPdf
}
