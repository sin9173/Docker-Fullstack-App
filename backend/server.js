const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();


//JSON 형태로 오는 요청 해석
app.use(bodyParser.json());


//테이블 생성
db.pool.query(`create table lists(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results);
})


//DB lists 테이블에 있는 모든 데이터를 프론트에 보내주기
app.get('/api/values', (req, res) => {
    db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
        if(err)
        return res.status(500).send(err)
        else 
        return res.json(results)
    })
})


//DB lists 테이블에 데이터를 입력
app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fileds) => {
        if(err)
        return res.status(500).send(err)
        else 
        return res.json({success: true, value: req.body.value})
    })
})


app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
});