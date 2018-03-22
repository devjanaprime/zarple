let express = require( 'express' );
let app = express();
let bodyParser = require( 'body-parser' );

app.use( express.static( 'server/public' ) );
app.use( bodyParser.json() );

let port = process.env.PORT || 5555;

app.listen( port, (req, res )=>{
    console.log( 'server up on', port );
}); //end server up