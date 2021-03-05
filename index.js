const moment = require('moment')
const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const emitter = new EventEmitter()
const readline = require('readline');
const { Money } = require('money-money-money');
emitter.on('gasto', (message) => {
    fs.appendFile(path.join(__dirname, 'gastos.txt'), message, err => {
        if (err) throw err
    })
})

let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
moment.locale('pt-br');
reader.question("Quanto você gastou hoje?\n", (answer) => {});
reader.on('line', function(line) {
    if (line == 'xx') {
        reader.close();
    }
    if(line != null && line != '') {
    const money = new Money(line, 'BRL');
        emitter.emit('gasto', `${money.toLocaleString()} - dia ${moment().format('LL') } \n`)
    }
   if (line == 'xx') {
    reader.close();
   }
});