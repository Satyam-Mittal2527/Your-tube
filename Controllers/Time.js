import axios from "axios"

export const TimeController = async(req,res) => {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip= req.ip;
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`)
        // console.log(response)
        const resCity = response.data.regionName;
        // console.log(resCity)
        const date = new Date();
        const time= date.getHours()
        // console.log(time)
        res.status(200).json({hour:time , city : resCity});
    } catch (error) {
        res.status(400).json(error)
    }
    
}