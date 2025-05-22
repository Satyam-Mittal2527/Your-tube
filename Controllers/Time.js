import axios from "axios"

export const TimeController = async(req,res) => {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip= req.ip;
    console.log(ip)
    try {
        const response = await axios.get(`http://ip-api.com/json/27.34.65.121 `)
        // console.log(response)
        const resCity = response.data.regionName;
        console.log(resCity)
        const date = new Date();
        console.log(date)
        const time= date.getHours()
        console.log(time)
        res.status(200).json({ip: ip,hour:time , city : resCity});
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
    
}