const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const conn = require('./db/connect');
const cors = require('cors');
const uploadFile = require('./util/fileUpload');

app.use(bodyParser.json());
app.use(express.static('public/uploads'));
app.use(cors({
    origin:'*'
}))
//them sua xoa danh muc
app.get('/api/categories',(req,res)=>{
    conn.query("SELECT *FROM categories",(err,data)=>{
        if(err){
            res.statusCode(500)
        }else
        res.json(data);
    })
});

app.post('/api/categories',(req,res)=>{
    conn.query(`INSERT INTO categories(name) VALUES ('${req.body.name}')`,(err,data)=>{
        if(err){
            console.log(err);
            res.statusCode(500)
        }else
        res.json(data);
    })
});
app.delete('/api/categories/:id',(req,res)=>{
    conn.query(`DELETE from categories where id =${req.params.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.statusCode(500)
        }else
        res.json(data);
    })
});

app.get('/api/categories/:id',(req,res)=>{
    conn.query(`SELECT *FROM categories where id=${req.params.id}`,(err,data)=>{
        if(err){
            res.statusCode(500)
        }else
        res.json(data[0]);
    })
});
app.put('/api/categories/:id',(req,res)=>{
    conn.query(`Update categories set name='${req.body.name}' where id=${req.params.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.sendStatus(500)
        }else
        res.json(data);
    })
});


//them  sua xoa san pham 
app.post('/api/products',uploadFile.single('image'),(req,res)=>{
     let filename = req.protocol+'://'+req.get('host')+'/'+`${req.file.filename}`
  
    let sql=`INSERT INTO products(name,price,image,category_id) values ('${req.body.name}',${req.body.price},'${filename}',${req.body.category_id})`
    conn.query(sql,(err,data)=>{
        if(err){
            console.log(err);
        }else
        res.json(data);
    })
})

app.get('/api/products',(req,res)=>{
    conn.query("SELECT categories.name as'catename',products.* from categories join products on categories.id=products.category_id order by products.price desc ",(err,data)=>{
        if(err){
            res.statusCode(500)
        }else
        res.json(data);
    })
});
//lay danh sach show theo category_id
app.get('/api/products/cate/:id',(req,res)=>{
    let id = req.params.id;
    conn.query(`SELECT categories.name as'catename',products.* from products join categories  on categories.id=products.category_id  where products.category_id=${id}`,(err,data)=>{
        if(err){
            res.statusCode(500)
        }else
        res.json(data);
    })
});

app.delete('/api/products/:id',(req,res)=>{
    conn.query(`DELETE from products where id =${req.params.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.statusCode(500)
        }else
        res.json(data);
    })
});

app.get('/api/products/:id',(req,res)=>{
    conn.query(`SELECT *FROM products where id=${req.params.id}`,(err,data)=>{
        if(err){
            res.statusCode(500)
        }else
        res.json(data[0]);
    })
});
app.put('/api/products/:id',uploadFile.single('image'),(req,res)=>{
   let filename= req.body.image;
    if(req.file){
       filename = req.protocol+'://'+req.get('host')+'/'+`${req.file.filename}`
    }
    conn.query(`Update products set name='${req.body.name}',price=${req.body.price},image='${filename}',category_id=${req.body.category_id} where id=${req.params.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.sendStatus(500)
        }else
        res.json(data);
    })
});

app.post('/api/login',(req,res)=>{
   let sql=`SELECT * FROM adminacc where email='${req.body.email}' and password='${req.body.password}'`
   conn.query(sql,(err,data)=>{
      if(err){
        console.log(err);
        res.sendStatus(500)
      }else{
        if(data.length>0){
            res.json(data[0])
        }else{
         res.sendStatus(403)
        }
      }
   })
})


app.post('/api/register-customer',(req,res)=>{
    let sql=`INSERT INTO customeracc(name,email,password) values ('${req.body.name}','${req.body.email}','${req.body.password}') `
    conn.query(sql,(err,data)=>{
       if(err){
         console.log(err);
         res.sendStatus(500)
       }else{
         console.log(data);
         res.json(data)
       }
    })
 })

 app.post('/api/login-customer',(req,res)=>{
    let sql=`SELECT * FROM customeracc where email='${req.body.email}' and password='${req.body.password}'`
    conn.query(sql,(err,data)=>{
       if(err){
         console.log(err);
         res.sendStatus(500)
       }else{
         if(data.length>0){
             res.json(data[0])
         }else{
          res.sendStatus(403)
         }
       }
    })
 })

app.listen(3000,()=>{
    console.log('ok');
})