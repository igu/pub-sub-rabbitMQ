var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        var nomeCanal = 'pub_sub_distribuidos';
        var mensagemDefault = process.argv.slice(2).join(' ') || 'Oi Gracon, última atividade!!!';

        ch.assertExchange(nomeCanal, 'fanout', { durable: false });
        ch.publish(nomeCanal, '', new Buffer(mensagemDefault));
        console.log(" [x] enviada %s", mensagemDefault);
    });

    setTimeout(function () { conn.close(); process.exit(0) }, 500);
})