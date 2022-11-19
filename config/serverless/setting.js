import env from 'env-var';

const settings = {
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    commitMessageUrl: env.get('APICommitMessagesURL').required().asString(),
    DbTableName: env.get('DbTableName').required().asString()
}
export { settings };
