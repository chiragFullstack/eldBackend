const conn=require('../connection');
const bcrypt = require('bcrypt');
const moment = require('moment');
const calcualteDrivingHour = async (req, res) => {
    const { userId } = req.query;
    console.log(req.query);
    
    try {
      const conn_ = await conn.getConnection();
       // Get the current time
    const currentTime = new Date();

    // Calculate the time 24 hours ago
    const twentyFourHoursAgo = new Date(currentTime - 24 * 60 * 60 * 1000);

    // Format the times to match the database format (HH:mm:ss)
    const currentTimeFormatted = currentTime.toTimeString().slice(0, 8);
    const twentyFourHoursAgoFormatted = twentyFourHoursAgo.toTimeString().slice(0, 8);

    // SQL query to calculate driving hours in the last 24 hours
    const query = `
      SELECT 
        SEC_TO_TIME(SUM(TIME_TO_SEC(
          LEAST('${currentTimeFormatted}', timeRecord) - GREATEST('${twentyFourHoursAgoFormatted}', timeRecord)
        ))) AS totalDrivingHours
      FROM tblAttendence
      WHERE userid = ${userId}
        AND status = 'drive'
        AND timeRecord BETWEEN '${twentyFourHoursAgoFormatted}' AND '${currentTimeFormatted}';
    `;

    const [results] = await conn_.query(query);

    // Send the total driving hours as a response
    const totalDrivingHours = results[0].totalDrivingHours || '00:00:00';
    console.log(totalDrivingHours);
    res.status(200).json({
      statusCode: 200,
      message: 'success',
      status: true,
      driverId: userId,
      totalDrivingHours,
    });
      } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
};
  
module.exports={
    calcualteDrivingHour
}