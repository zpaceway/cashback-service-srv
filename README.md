En grupos de 5, vamos a crear un microservicio llamado cashback-service, el cual se comporta como un servicio de post-procesamiento de pagos altamente transaccional utilizando NestJS y TypeORM.

cashback-service asignará un porcentaje de devolución a cada una de las transacciones que ingresan. El objetivo de este servicio es que el usuario sea capaz de visualizar su monto de devolución acumulado por compras, para así retener al usuario en la plataforma. El usuario será capaz de retirar el mismo a modo de tarjetas precargadas.

Las condiciones para aplicar el porcentaje de devolución son las siguietes: si el usuario tiene menos de 10 transacciones no aplica ningún porcentaje, a más de 10 transacciones empieza a aplicarse un porcentaje de devolución del 1%, a partir de 50 2.5% y a partir de 100 5%.

Analizar cómo se comporta la aplicación con 1000 - 10,000 - 100,000 y 1,000,000 de récord. Los mismos serán proporcionados por el instructor.
