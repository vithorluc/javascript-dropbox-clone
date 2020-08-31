var express = require('express');
var formidable = require('formidable');
// file system
var fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req, res) => {

  let path = './' + req.query.path

  if(fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {

      if (err) {

        console.error(err)
        res.status(404).json({

          error: 'File not Found.'
    
        })
      } else {

        res.status(200).end(data)

      }


    })

  } else {

    res.status(404).json({

      error: 'File not Found.'

    })

  }

})


router.delete('/file', (req, res) => {

  
  let form = new formidable.IncomingForm({
    
    uploadDir: './upload',
    keepExtensions: true 
    
  })
  
  form.parse(req, (err, fields, files) => {

    let path = './' + fields.path
    
    if (fs.existsSync(path)) {

      fs.unlink(path, err => {

        if(err) {

          res.status(400).json({

            err

          })

        } else {

          res.json({
            fields 
          }) 
        }
      })

    }
  })

})


router.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true 

  })

  form.parse(req, (err, fields, files) => {


    res.json({
      files 
      
    }) 
  })
})




module.exports = router;
