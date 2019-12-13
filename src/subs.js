var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        var nomeCanal = 'pub_sub_distribuidos';

        ch.assertExchange(nomeCanal, 'fanout', { durable: false });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(" [*] Estamos esperando novidas vinda dessa fila [%s]. CTRL + C para cancelar", q.queue);
            ch.bindQueue(q.queue, nomeCanal, '');

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s", msg.content.toString());
            }, { noAck: true });
        });
    });

})