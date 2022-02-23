const { PubSub } = require('@google-cloud/pubsub');
const { config } = require('dotenv'); config();

const Config = {
	project_id: process.env.PROJECT_ID,
	topic_id: process.env.TOPIC_ID,
	subscription_name: process.env.SUBSCRIPTION_NAME,
	keyFilePath: './key/key.json',
}
const pubsubClient = new PubSub(); // Instantiate

const publishMessage = () => {
	const data = {
		data: Math.random().toString(36).substring(7),
	};
	const attributes = {
		create_at: new Date().toISOString(),
	};
	pubsubClient.topic(Config.topic_id).publishMessage({
    data: Buffer.from(JSON.stringify(data)),
	attributes: attributes,
  });
};
/*
const listenMessages = () => {
	const subscription = pubsubClient.subscription(Config.subscription_name);
	subscription.on('message', (message) => {
		console.log(`Received message ${message.id}:`);
		console.log(`\tData: ${message.data}`);
		console.log(`\tAttributes: ${message.attributes}`);
		message.ack();
	});

	subscription.on('error', (error) => {
		console.error(error);
	});

	subscription.on('close', () => {
		console.log('Subscription closed');
	});

	subscription.on('open', () => {
		console.log('Subscription opened');
	});
}
*/
//listenMessages();
setInterval(publishMessage, 3000); // Publish message every 3 seconds