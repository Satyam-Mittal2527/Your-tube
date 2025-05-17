export const TimeController = async(req,res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const date = new Date();
        const time= date.getHours()
        // console.log(time)
        res.status(200).json({hour:time});
    } catch (error) {
        res.status(400).json(error)
    }
    
}