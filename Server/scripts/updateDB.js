const workerDetails = require('../API/luxor.js');
const User = require('../database/dbSchema.js'); // Assuming this is now the User model

const getCurrentTimeInCT = () => {
    const UTC = new Date();
    const options = { timeZone: 'America/Chicago', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(UTC);
};

const updateHashrate = async (type) => {
    try {
        const data = await workerDetails();
        const workers = data.data.getWorkerDetails.edges;
        const currentTime = getCurrentTimeInCT();

        const userId = "Aceshigh9000"; // This needs to be defined or fetched based on your application's logic.

        for (const worker of workers) {
            const node = worker.node;

            let user = await User.findOne({ username: userId });

            if (user) {
                // If user exists, update or add the miner
                const updateResult = await User.updateOne(
                    { username: userId, "miners.minerId": node.minerId },
                    {
                        $set: {
                            "miners.$.workerName": node.workerName,
                            "miners.$.status": node.status,
                            "miners.$.lastUpdated": currentTime,
                            "miners.$.revenue":node.revenue,
                        },
                        $push: {
                            [`miners.$.${type}Hashrate`]: {
                                hashrate: node.hashrate,
                                date: currentTime
                            }
                        }
                    }
                );

                // If no document was updated (meaning the miner doesn't exist), add the new miner
                if (updateResult.matchedCount === 0) {
                    await User.updateOne(
                        { username: userId },
                        {
                            $push: {
                                miners: {
                                    minerId: node.minerId,
                                    workerName: node.workerName,
                                    status: node.status,
                                    revenue: node.revenue,
                                    lastUpdated: currentTime,
                                    [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: currentTime }] // Pushing a new hashrate object
                                }
                            }
                        }
                    );
                }
            } else {
                // If the user does not exist, create a new document
                user = new User({
                    username: userId,
                    miners: [{
                        minerId: node.minerId,
                        workerName: node.workerName,
                        status: node.status,
                        revenue: node.revenue,
                        lastUpdated: currentTime,
                        [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: currentTime }] // Initialize with the new hashrate object
                    }]
                });
                await user.save(); // Save the new user document
            }
        }
        console.log(`Updated ${type} hashrate for all miners.`);
    } catch (error) {
        console.error(`Error updating ${type} hashrate:`, error);
    }
};



module.exports = updateHashrate;

