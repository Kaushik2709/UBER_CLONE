import http from 'http'
import app from './app.js'

const server = http.createServer(app)
const PORT  = process.env.PORT || 3000
server.listen(3000,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
})